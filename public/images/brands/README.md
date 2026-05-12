# Brand logos

The brand carousel cycles through 12 logos. Drop one file per brand in this directory:

| Brand     | Filename         |
| --------- | ---------------- |
| Amazon    | `amazon.svg`     |
| Nike      | `nike.svg`       |
| DoorDash  | `doordash.svg`   |
| AT&T      | `att.svg`        |
| Shell     | `shell.svg`      |
| Twitch    | `twitch.svg`     |
| Alienware | `alienware.svg`  |
| MSI       | `msi.svg`        |
| ASUS      | `asus.svg`       |
| OMEN      | `omen.svg`       |
| Razer     | `razer.svg`      |
| Anthros   | `anthros.svg`    |

## Notes

- **SVG strongly preferred** (PNG works too — just change the extension in `src/lib/data.ts`).
- Each logo is rendered at max 100×40px and runs through `filter: brightness(0) invert(1)` (forces white). Use logos that look good as pure silhouettes — wordmarks usually work better than detailed icons.
- This directory ships with simple labeled placeholders so the layout renders during development. Overwrite them with the real assets.

To change the brand list or order, edit the `brands` array in `src/lib/data.ts`.
