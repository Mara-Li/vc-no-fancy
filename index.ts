/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { Channel } from "@vencord/discord-types";
import { ChannelStore } from "@webpack/common";
const FANCY_MAP: Record<string, string> = {};

function registerRange(start: number, end: number, asciiStart: number) {
    for (let i = 0; i <= end - start; i++)
        FANCY_MAP[String.fromCodePoint(start + i)] = String.fromCodePoint(asciiStart + i);
}
function reg(o: Record<string, string>) {
    for (const k in o) FANCY_MAP[k] = o[k];
}

const settings = definePluginSettings({
    replaceHyphen: {
        type: OptionType.BOOLEAN,
        description: "Replace hyphen by space in channel name",
        default: false,
    },
    toTitle: {
        type: OptionType.BOOLEAN,
        description: "Capitalize the first letter of the channel",
        default: false,
    },
    capitalize: {
        type: OptionType.BOOLEAN,
        description: "Capitalize the first letter of each word in the channels (can't be used in conjunction with toTitle).",
        default: false,
    }
});

// Math bold
registerRange(0x1D400, 0x1D419, 0x41); registerRange(0x1D41A, 0x1D433, 0x61);
// Math italic
registerRange(0x1D434, 0x1D44D, 0x41); registerRange(0x1D44E, 0x1D467, 0x61);
// Math bold italic
registerRange(0x1D468, 0x1D481, 0x41); registerRange(0x1D482, 0x1D49B, 0x61);
// Math script (sparse — some slots are taken by ℬ ℰ ℱ ℋ ℐ ℒ ℳ ℛ)
reg({
    "𝒜": "A", "𝒞": "C", "𝒟": "D", "𝒢": "G", "𝒥": "J", "𝒦": "K", "𝒩": "N", "𝒪": "O",
    "𝒫": "P", "𝒬": "Q", "𝒮": "S", "𝒯": "T", "𝒰": "U", "𝒱": "V", "𝒲": "W", "𝒳": "X", "𝒴": "Y",
    "𝒶": "a", "𝒷": "b", "𝒸": "c", "𝒹": "d", "𝒻": "f", "𝒽": "h", "𝒾": "i", "𝒿": "j",
    "𝓀": "k", "𝓁": "l", "𝓂": "m", "𝓃": "n", "𝓅": "p", "𝓆": "q", "𝓇": "r", "𝓈": "s",
    "𝓉": "t", "𝓊": "u", "𝓋": "v", "𝓌": "w", "𝓍": "x", "𝓎": "y", "𝓏": "z",
});
// Math bold script
registerRange(0x1D4D0, 0x1D4E9, 0x41); registerRange(0x1D4EA, 0x1D503, 0x61);
// Math fraktur
registerRange(0x1D504, 0x1D51D, 0x41); registerRange(0x1D51E, 0x1D537, 0x61);
// Math bold fraktur
registerRange(0x1D56C, 0x1D585, 0x41); registerRange(0x1D586, 0x1D59F, 0x61);
// Math double-struck
registerRange(0x1D538, 0x1D551, 0x41);
reg({
    "𝕒": "a", "𝕓": "b", "𝕔": "c", "𝕕": "d", "𝕖": "e", "𝕗": "f", "𝕘": "g", "𝕙": "h",
    "𝕚": "i", "𝕛": "j", "𝕜": "k", "𝕝": "l", "𝕞": "m", "𝕟": "n", "𝕠": "o", "𝕡": "p",
    "𝕢": "q", "𝕣": "r", "𝕤": "s", "𝕥": "t", "𝕦": "u", "𝕧": "v", "𝕨": "w", "𝕩": "x",
    "𝕪": "y", "𝕫": "z",
});
// Math sans-serif (regular, bold, italic, bold italic)
registerRange(0x1D5A0, 0x1D5B9, 0x41); registerRange(0x1D5BA, 0x1D5D3, 0x61);
registerRange(0x1D5D4, 0x1D5ED, 0x41); registerRange(0x1D5EE, 0x1D607, 0x61);
registerRange(0x1D608, 0x1D621, 0x41); registerRange(0x1D622, 0x1D63B, 0x61);
registerRange(0x1D63C, 0x1D655, 0x41); registerRange(0x1D656, 0x1D66F, 0x61);
// Math monospace
registerRange(0x1D670, 0x1D689, 0x41); registerRange(0x1D68A, 0x1D6A3, 0x61);
// Fullwidth
registerRange(0xFF21, 0xFF3A, 0x41); registerRange(0xFF41, 0xFF5A, 0x61);
// Small caps
reg({
    "ᴀ": "a", "ʙ": "b", "ᴄ": "c", "ᴅ": "d", "ᴇ": "e", "ғ": "f", "ɢ": "g", "ʜ": "h",
    "ɪ": "i", "ᴊ": "j", "ᴋ": "k", "ʟ": "l", "ᴍ": "m", "ɴ": "n", "ᴏ": "o", "ᴘ": "p",
    "ǫ": "q", "ʀ": "r", "ꜱ": "s", "ᴛ": "t", "ᴜ": "u", "ᴠ": "v", "ᴡ": "w", "ʏ": "y", "ᴢ": "z",
    "ꜰ": "f"
});
// Circled letters
reg({
    "ⓐ": "a", "ⓑ": "b", "ⓒ": "c", "ⓓ": "d", "ⓔ": "e", "ⓕ": "f", "ⓖ": "g", "ⓗ": "h",
    "ⓘ": "i", "ⓙ": "j", "ⓚ": "k", "ⓛ": "l", "ⓜ": "m", "ⓝ": "n", "ⓞ": "o", "ⓟ": "p",
    "ⓠ": "q", "ⓡ": "r", "ⓢ": "s", "ⓣ": "t", "ⓤ": "u", "ⓥ": "v", "ⓦ": "w", "ⓧ": "x",
    "ⓨ": "y", "ⓩ": "z",
    "Ⓐ": "A", "Ⓑ": "B", "Ⓒ": "C", "Ⓓ": "D", "Ⓔ": "E", "Ⓕ": "F", "Ⓖ": "G", "Ⓗ": "H",
    "Ⓘ": "I", "Ⓙ": "J", "Ⓚ": "K", "Ⓛ": "L", "Ⓜ": "M", "Ⓝ": "N", "Ⓞ": "O", "Ⓟ": "P",
    "Ⓠ": "Q", "Ⓡ": "R", "Ⓢ": "S", "Ⓣ": "T", "Ⓤ": "U", "Ⓥ": "V", "Ⓦ": "W", "Ⓧ": "X",
    "Ⓨ": "Y", "Ⓩ": "Z",
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Remplace les fancy letters par leur équivalent ASCII via la map. */
function decodeFancy(str: string): string {
    let out = "";
    for (const ch of str) out += FANCY_MAP[ch] ?? ch;
    return out;
}

/**
 * Renvoie true si le caractère est un émoji ou fait partie d'une séquence
 * émoji (modificateurs de teinte, joiners ZWJ, sélecteurs de variation…).
 */
function isEmojiRelated(cp: number): boolean {
    // Variation selectors & tags
    if (cp >= 0xFE00 && cp <= 0xFE0F) return true;// VS1 VS16
    if (cp >= 0xE0000 && cp <= 0xE01FF) return true;// Tags
    if (cp === 0x200D) return true;// ZWJ
    if (cp >= 0x1F3FB && cp <= 0x1F3FF) return true; // Fitzpatrick modifiers
    // Enclosed alphanumerics supplement (émojis chiffrés ①…)
    // On les laisse passer via Extended_Pictographic ci-dessous

    // Blocs émoji principaux
    if (cp >= 0x1F000 && cp <= 0x1FFFF) return true;
    if (cp >= 0x2600 && cp <= 0x27BF) return true;// Misc symbols & Dingbats
    if (cp >= 0x2300 && cp <= 0x23FF) return true;// Misc technical
    if (cp >= 0x25A0 && cp <= 0x25FF) return true;// Geometric shapes
    if (cp >= 0x2B00 && cp <= 0x2BFF) return true;// Misc symbols & arrows
    if (cp >= 0x3000 && cp <= 0x303F) return true;// CJK symbols (⟨…⟩ etc.)
    if (cp === 0x00A9 || cp === 0x00AE) return true;// © ®
    if (cp === 0x2122) return true;// ™
    return false;
}

const ORIGINAL_NAME = Symbol("cleanChannelName.original");
let editingChannelId: string | null = null;

function toTitleCase(text: string) {
    return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1);
}

function toCapitalizeCase(text: string) {
    return text.toLowerCase().replace(
        /(^\p{L}{1})|(\s+\p{L}{1})|(-\p{L}{1})/gu,
        (char: string) => char.toUpperCase(),
    );
}

function computeClean(name: string, type: number): string {
    const { replaceHyphen, toTitle, capitalize } = settings.store;
    const s = decodeFancy(name.normalize("NFKC"));
    let filtered = "";
    for (const ch of s) {
        const cp = ch.codePointAt(0)!;
        if (cp <= 0x024F || isEmojiRelated(cp))
            filtered += ch;
    }
    const isText = [2, 3, 4, 10, 11, 12].includes(type);
    const sep = isText ? " " : "-";
    let cleaned = filtered
        .replace(/\s+/g, sep)
        .replace(new RegExp(`[${sep}]{2,}`, "g"), sep)
        .replace(new RegExp(`^[${sep}]|[${sep}]$`, "g"), "");
    if (replaceHyphen) {
        cleaned = cleaned.replaceAll("-", " ");
        name = name.replaceAll("-", " ");
    }
    if (toTitle) {
        cleaned = toTitleCase(cleaned);
        name = toTitleCase(name);
    } else if (capitalize) {
        cleaned = toCapitalizeCase(cleaned);
        name = toTitleCase(name);
    }

    return cleaned || name;
}

export default definePlugin({
    name: "No Fancy Channel",
    authors: [Devs.AutumnVN, { name: "Mara-Li", id: 189390243676422144n }],
    settings,
    description: "Normalize channel name to remove fancy Unicode characters, allowing to search for them in autocomplete and search. Based on CleanChannelName.",
    tags: ["Appearance", "Customisation", "Chat", "Emotes", "Servers"],
    patches: [
        {
            find: "loadAllGuildAndPrivateChannelsFromDisk(){",
            replacement: {
                match: /(?<=getChannel\(\i\)\{if\(null!=\i\)return )\i\(\i\)/,
                replace: "$self.cleanChannelName($&)",
            },
        },
    ],

    flux: {
        CHANNEL_SETTINGS_INIT({ channelId }: { channelId: string; }) {
            editingChannelId = channelId;
            (ChannelStore as any).emitChange?.();
        },
        CHANNEL_SETTINGS_CLOSE() {
            editingChannelId = null;
            (ChannelStore as any).emitChange?.();
        },
    },

    cleanChannelName(channel?: Channel) {
        if (channel == null) return channel;
        const c = channel as any;

        if (c[ORIGINAL_NAME] !== undefined) return channel;
        c[ORIGINAL_NAME] = channel.name;

        Object.defineProperty(channel, "name", {
            configurable: true,
            enumerable: true,
            get() {
                if (editingChannelId === channel.id) return c[ORIGINAL_NAME];
                return computeClean(c[ORIGINAL_NAME], channel.type);
            },
            set(value: string) {
                c[ORIGINAL_NAME] = value;
            },
        });

        return channel;
    },
});
