/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { findByProps } from "@webpack";

import fancyToAscii from "./utils/unidecode";

type AnyFn = (...a: any[]) => any;
type AnyObj = Record<string, any>;

export default definePlugin({
    name: "No Fancy",
    description: "Normalize channel name to remove fancy Unicode characters, allowing to search for them in autocomplete and search.",
    authors: [{ name: "Mara-Li", id: 0n }],

    // --- utils ---
    deFancy(text: unknown) {
        try {
            if (typeof text === "string") return fancyToAscii(text);
        } catch { /* noop */ }
        return text as any;
    },

    _mutateName(obj: any) {
        if (!obj || typeof obj.name !== "string") return;
        try {
            const n = this.deFancy(obj.name);
            if (typeof n === "string" && n !== obj.name) obj.name = n;
        } catch { /* noop */ }
    },

    _mutateRow(row: any) {
        try {
            if (row?.channel) this._mutateName(row.channel);
        } catch { /* noop */ }
    },

    _mutateList(list: any) {
        try {
            if (Array.isArray(list)) {
                for (const r of list) this._mutateRow(r);
            } else if (list && typeof list === "object") {
                for (const k of Object.keys(list)) {
                    const v = list[k];
                    if (Array.isArray(v)) for (const r of v) this._mutateRow(r);
                }
            }
        } catch { /* noop */ }
    },

    // --- hooks results ---
    defancyGuildChannels(result: any) {
        try { this._mutateList(result); } catch { /* noop */ }
        return result; // return original
    },

    patches: [
        // Render name in channel list
        {
            find: "UNREAD_IMPORTANT:",
            replacement: [
                {
                    // ... name: a ? b : c
                    match: /name:\s*(null\s*!=\s*\i\s*\?\s*\i\s*:\s*\i)/g,
                    replace: "name:$self.deFancy($1)"
                }
            ]
        },
        // Autocomplete # : normalize text being matched
        {
            find: "channel-autocomplete",
            replacement: [
                { match: /(currentWord:\s*)([^,]+)(,)/g, replace: "$1$self.deFancy($2)$3" },
                { match: /(currentFullWord:\s*)([^,]+)(,)/g, replace: "$1$self.deFancy($2)$3" }
            ]
        },
        // Search channels: normalize query text
        {
            find: "queryTextChannels(",
            replacement: [
                {
                    match: /\bquery\s*:\s*([A-Za-z0-9_$]+)/g,
                    replace: "query: $self.deFancy($1)"
                }
            ]
        }
    ],

    // --- hooks stores ---
    _orig: {} as Record<string, AnyFn>,

    start() {
        // ChannelStore : channel names in guild channel lists
        try {
            const ChannelStore = findByProps("getMutableGuildChannelsForGuild") as AnyObj | undefined;
            if (ChannelStore) {
                // getChannel(id)
                if (typeof ChannelStore.getChannel === "function") {
                    this._orig.getChannel = ChannelStore.getChannel;
                    ChannelStore.getChannel = (id: any) => {
                        const ch = this._orig.getChannel!(id);
                        this._mutateName(ch);
                        return ch;
                    };
                }

                // getMutableGuildChannelsForGuild(guildId)
                if (typeof ChannelStore.getMutableGuildChannelsForGuild === "function") {
                    this._orig.getMutableGuildChannelsForGuild =
                        ChannelStore.getMutableGuildChannelsForGuild.bind(ChannelStore);
                    ChannelStore.getMutableGuildChannelsForGuild = (guildId: any) => {
                        const res = this._orig.getMutableGuildChannelsForGuild!(guildId);
                        this._mutateList(res);
                        return res;
                    };
                }
            }

            // Disambiguations (for autocomplete #)
            const Disamb = findByProps("getTextChannelNameDisambiguations") as AnyObj | undefined;
            if (Disamb && typeof Disamb.getTextChannelNameDisambiguations === "function") {
                this._orig.getTextChannelNameDisambiguations =
                    Disamb.getTextChannelNameDisambiguations.bind(Disamb);

                Disamb.getTextChannelNameDisambiguations = (...args: any[]) => {
                    const res = this._orig.getTextChannelNameDisambiguations!(...args);
                    if (Array.isArray(res)) {
                        for (const it of res) {
                            // try with name & text
                            if (typeof it?.name === "string") {
                                try { it.name = this.deFancy(it.name); } catch { }
                            } else if (typeof it?.text === "string") {
                                try { it.text = this.deFancy(it.text); } catch { }
                            }
                        }
                    }
                    return res;
                };
            }

            // Threads Store : channel names in thread list

            const Threads = findByProps("computeAllActiveJoinedThreads") as AnyObj | undefined;
            if (Threads && typeof Threads.computeAllActiveJoinedThreads === "function") {
                this._orig.computeAllActiveJoinedThreads =
                    Threads.computeAllActiveJoinedThreads.bind(Threads);

                Threads.computeAllActiveJoinedThreads = (...args: any[]) => {
                    const res = this._orig.computeAllActiveJoinedThreads!(...args);
                    if (Array.isArray(res)) for (const th of res) this._mutateName(th);
                    return res;
                };
            }


            // search
            const Search = findByProps("queryChannels") as AnyObj | undefined;
            if (Search && typeof Search.queryChannels === "function") {
                this._orig.queryChannels = Search.queryChannels.bind(Search);

                Search.queryChannels = (opts: any) => {
                    try {
                        const safe = { ...(opts ?? {}) }; // cloner seulement l’input
                        if (typeof safe.query === "string") safe.query = this.deFancy(safe.query);
                        const res = this._orig.queryChannels!(safe);
                        return res;
                    } catch {
                        return this._orig.queryChannels!(opts);
                    }
                };
            }
        } catch (e) {
            console.error("[VC-No-Fancy] Search patch failed", e);
        }
    },

    stop() {
        try {
            const ChannelStore = findByProps("getMutableGuildChannelsForGuild") as AnyObj | undefined;
            if (ChannelStore) {
                if (this._orig.getChannel) ChannelStore.getChannel = this._orig.getChannel;
                if (this._orig.getMutableGuildChannelsForGuild)
                    ChannelStore.getMutableGuildChannelsForGuild = this._orig.getMutableGuildChannelsForGuild;
            }

            const Disamb = findByProps("getTextChannelNameDisambiguations") as AnyObj | undefined;
            if (Disamb && this._orig.getTextChannelNameDisambiguations)
                Disamb.getTextChannelNameDisambiguations = this._orig.getTextChannelNameDisambiguations;

            const Threads = findByProps("computeAllActiveJoinedThreads") as AnyObj | undefined;
            if (Threads && this._orig.computeAllActiveJoinedThreads)
                Threads.computeAllActiveJoinedThreads = this._orig.computeAllActiveJoinedThreads;

            const Search = findByProps("queryChannels") as AnyObj | undefined;
            if (Search && this._orig.queryChannels) Search.queryChannels = this._orig.queryChannels;
        } catch (e) {
            console.error("[VC-No-Fancy] restore failed", e);
        } finally {
            this._orig = {};
        }
    }
});
