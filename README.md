# No Fancy

A Vencord/Equicord userplugin that normalizes fancy Unicode characters in channel names and search queries.

Follow [install userplugins](https://docs.equicord.org/plugins) to use.

Also you can use [two python script i wrote to quickly update userplugins & build Equicord](https://gist.github.com/Mara-Li/e1d902e9141943a712bb0428f00d9374)

tldr:
- Clone Equicord/Vencord
- `cd` into it
- `git clone https://github.com/Mara-Li/vc-no-fancy src/userplugins/vc-no-fancy`
- `pnpm build`
- `pnpm inject`

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

### Example
#### Channel list
![Before](https://i.imgur.com/ypGcBhw.png)
![After](https://i.imgur.com/aBYIj1s.png)

#### Mention
![Before](https://i.imgur.com/6UsiMGA.png)
![After](https://i.imgur.com/jaL0PqV.png)

#### Quick-Switcher

![Before (trolling version)](https://i.imgur.com/OYv9Ye2.png)
![Before (copy pasted name)](https://i.imgur.com/zp9GcKO.png)
![After](https://i.imgur.com/BY9Ezo4.png)

## Options
It also add useful options like:
- Removing hyphen: Replace all `-` to a space in channel name
- To title : Capitalize the first letter of the channel
- Capitalize : Capitalize the first letter of **each word** in the channel.

To title and capitalize can't be used together.

## Why This Matters

Many Discord users and servers use stylized Unicode for aesthetic purposes.
However, these characters can break:
* Search relevance
* Channel filtering
* Fuzzy matching
* Autocomplete navigation

This plugin restores predictable behavior without forcing users to rename their channels.

## Credits

* Plugin author: **Mara-Li**, **AutumnVN**
* Vencord contributors & community

## License

This plugin is released under the **GPL-3.0-or-later** license, consistent with Vencord’s licensing terms.
