# No Fancy

A Vencord plugin that normalizes fancy Unicode characters in channel names and search queries.

## Overview

Discord allows the use of stylized Unicode characters (𝑳𝒊𝒌𝒆 𝑻𝒉𝒊𝒔) in channel names.
While visually appealing, these characters can cause issues with:

* Channel search
* Autocomplete (`#channel`)
* Disambiguation lists
* Thread listings
* General usability

**No Fancy** automatically converts these characters into standard ASCII equivalents, ensuring consistent behavior across all Discord search systems.

Example:
`𝑳𝒊𝒌𝒆-𝑻𝒉𝒊𝒔` → `Like-this`

## Features

* Normalizes channel names to plain ASCII
* Fixes query-based lookup (`queryChannels`)
* Normalizes autocomplete input and displayed suggestions
* Cleans names within:
  * `ChannelStore.getChannel`
  * `getMutableGuildChannelsForGuild`
  * `getTextChannelNameDisambiguations`
  * `computeAllActiveJoinedThreads`
* Includes UI-level patches to ensure consistent display
* Mutates objects safely **without cloning** to avoid breaking internal Discord prototypes
* Fully compatible with current Vencord architecture

## Why This Matters

Many Discord users and servers use stylized Unicode for aesthetic purposes.
However, these characters can break:

* Search relevance
* Channel filtering
* Fuzzy matching
* Autocomplete navigation

This plugin restores predictable behavior without forcing users to rename their channels.

## How It Works

* All Unicode “fancy” characters are passed through a normalization function (`fancyToAscii`).
* The plugin mutates the `name` or `text` fields **in place**, preserving internal prototypes and methods.
* Search queries are normalized before being passed into Discord’s internal search engine.
* Displayed autocomplete text is patched via regex.

## Installation

1. Install Vencord (if not already installed).
2. Place the plugin folder (containing the `.ts` file and `utils/unidecode`) into your Vencord `plugins` directory.
3. Enable **No Fancy** in the Vencord settings.
4. Reload Discord.

## Limitations

* The plugin does not modify the actual channel names on Discord’s servers.
* Normalization happens locally on the client side only.
* Usernames and role names are not yet normalized (may be added later).

## Credits

* Plugin author: **Mara-Li**
* Vencord contributors & community

## License

This plugin is released under the **GPL-3.0-or-later** license, consistent with Vencord’s licensing terms.
