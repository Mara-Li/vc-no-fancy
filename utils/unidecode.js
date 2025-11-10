/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// unidecode_fancy.js
// Normalize decorative Unicode letters (fancy alphabets) to ASCII.
// Covers: math bold, italic, bold italic, script, bold script,
// fraktur, bold fraktur, double-struck, sans-serif, sans-serif bold,
// sans-serif italic, sans-serif bold italic, monospace, fullwidth,
// small caps, and various additional stylistic blocks.

const map = {};

// Helper to register a full range: startUnicode → ASCII start
function registerRange(start, end, asciiStart) {
    for (let i = 0; i <= end - start; i++) {
        map[String.fromCodePoint(start + i)] = String.fromCodePoint(asciiStart + i);
    }
}

// Helper for arbitrary mapping
function reg(o) {
    for (const k in o) map[k] = o[k];
}

/* ------------------------
   MATH BOLD (𝐀–𝐙, 𝐚–𝐳)
------------------------- */
registerRange(0x1D400, 0x1D419, 0x41); // A-Z
registerRange(0x1D41A, 0x1D433, 0x61); // a-z

/* ------------------------
   MATH ITALIC (𝐴–𝑍, 𝑎–𝑧)
------------------------- */
registerRange(0x1D434, 0x1D44D, 0x41);
registerRange(0x1D44E, 0x1D467, 0x61);

/* ------------------------
   MATH BOLD ITALIC
------------------------- */
registerRange(0x1D468, 0x1D481, 0x41);
registerRange(0x1D482, 0x1D49B, 0x61);

/* ------------------------
   MATH SCRIPT
------------------------- */
reg({
    "𝒜": "A", "𝒞": "C", "𝒟": "D", "𝒢": "G", "𝒥": "J",
    "𝒦": "K", "𝒩": "N", "𝒪": "O", "𝒫": "P", "𝒬": "Q",
    "𝒮": "S", "𝒯": "T", "𝒰": "U", "𝒱": "V", "𝒲": "W",
    "𝒳": "X", "𝒴": "Y",
    "𝒶": "a", "𝒷": "b", "𝒸": "c", "𝒹": "d", "𝒻": "f",
    "𝒽": "h", "𝒾": "i", "𝒿": "j", "𝓀": "k", "𝓁": "l",
    "𝓂": "m", "𝓃": "n", "𝓅": "p", "𝓆": "q", "𝓇": "r",
    "𝓈": "s", "𝓉": "t", "𝓊": "u", "𝓋": "v", "𝓌": "w",
    "𝓍": "x", "𝓎": "y", "𝓏": "z"
});

/* ------------------------
   MATH BOLD SCRIPT
------------------------- */
registerRange(0x1D4D0, 0x1D4E9, 0x41);
registerRange(0x1D4EA, 0x1D503, 0x61);

/* ------------------------
   MATH FRAKTUR
------------------------- */
registerRange(0x1D504, 0x1D51D, 0x41);
registerRange(0x1D51E, 0x1D537, 0x61);

/* ------------------------
   MATH BOLD FRAKTUR
------------------------- */
registerRange(0x1D56C, 0x1D585, 0x41);
registerRange(0x1D586, 0x1D59F, 0x61);

/* ------------------------
   MATH DOUBLE-STRUCK (𝔸–𝕫)
------------------------- */
registerRange(0x1D538, 0x1D551, 0x41); // A-Z
reg({
    "𝕒": "a", "𝕓": "b", "𝕔": "c", "𝕕": "d", "𝕖": "e", "𝕗": "f",
    "𝕘": "g", "𝕙": "h", "𝕚": "i", "𝕛": "j", "𝕜": "k", "𝕝": "l",
    "𝕞": "m", "𝕟": "n", "𝕠": "o", "𝕡": "p", "𝕢": "q", "𝕣": "r",
    "𝕤": "s", "𝕥": "t", "𝕦": "u", "𝕧": "v", "𝕨": "w", "𝕩": "x",
    "𝕪": "y", "𝕫": "z"
});

/* ------------------------
   MATH SANS-SERIF (regular, bold, italic, bold italic)
------------------------- */
registerRange(0x1D5A0, 0x1D5B9, 0x41);
registerRange(0x1D5BA, 0x1D5D3, 0x61);

registerRange(0x1D5D4, 0x1D5ED, 0x41);
registerRange(0x1D5EE, 0x1D607, 0x61);

registerRange(0x1D608, 0x1D621, 0x41);
registerRange(0x1D622, 0x1D63B, 0x61);

registerRange(0x1D63C, 0x1D655, 0x41);
registerRange(0x1D656, 0x1D66F, 0x61);

/* ------------------------
   MATH MONOSPACE
------------------------- */
registerRange(0x1D670, 0x1D689, 0x41);
registerRange(0x1D68A, 0x1D6A3, 0x61);

/* ------------------------
   FULLWIDTH Ａ-Ｚ, ａ-ｚ
------------------------- */
registerRange(0xFF21, 0xFF3A, 0x41);
registerRange(0xFF41, 0xFF5A, 0x61);

/* ------------------------
   SMALL CAPITALS
------------------------- */
reg({
    "ᴀ": "a", "ʙ": "b", "ᴄ": "c", "ᴅ": "d", "ᴇ": "e", "ғ": "f",
    "ʜ": "h", "ɪ": "i", "ᴊ": "j", "ᴋ": "k", "ʟ": "l", "ᴍ": "m",
    "ɴ": "n", "ᴏ": "o", "ᴘ": "p", "ʀ": "r", "s": "s", "ᴛ": "t",
    "ᴜ": "u", "ᴠ": "v", "ᴡ": "w", "x": "x", "ʏ": "y", "ᴢ": "z"
});

/* ------------------------
   Fancy Latin additions
------------------------- */
reg({
    "ⓐ": "a", "ⓑ": "b", "ⓒ": "c", "ⓓ": "d", "ⓔ": "e", "ⓕ": "f",
    "ⓖ": "g", "ⓗ": "h", "ⓘ": "i", "ⓙ": "j", "ⓚ": "k", "ⓛ": "l",
    "ⓜ": "m", "ⓝ": "n", "ⓞ": "o", "ⓟ": "p", "ⓠ": "q", "ⓡ": "r",
    "ⓢ": "s", "ⓣ": "t", "ⓤ": "u", "ⓥ": "v", "ⓦ": "w", "ⓧ": "x",
    "ⓨ": "y", "ⓩ": "z",
    "Ⓐ": "A", "Ⓑ": "B", "Ⓒ": "C", "Ⓓ": "D", "Ⓔ": "E", "Ⓕ": "F",
    "Ⓖ": "G", "Ⓗ": "H", "Ⓘ": "I", "Ⓙ": "J", "Ⓚ": "K", "Ⓛ": "L",
    "Ⓜ": "M", "Ⓝ": "N", "Ⓞ": "O", "Ⓟ": "P", "Ⓠ": "Q", "Ⓡ": "R",
    "Ⓢ": "S", "Ⓣ": "T", "Ⓤ": "U", "Ⓥ": "V", "Ⓦ": "W", "Ⓧ": "X",
    "Ⓨ": "Y", "Ⓩ": "Z"
});

/* ------------------------
   Normalize function
------------------------- */
export default function fancyToAscii(str) {
    let out = "";
    for (const ch of str) {
        out += map[ch] || ch;
    }
    return out;
}
