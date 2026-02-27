---
description: Compress images to WebP or PNG format
argument-hint: "[image file or directory]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `image-compressor` skill and compress the specified image(s).

If an image file or directory is provided, use it. Otherwise ask the user for the image file path or directory to compress.
