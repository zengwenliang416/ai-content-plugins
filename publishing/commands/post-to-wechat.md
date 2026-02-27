---
description: Publish content to WeChat Official Account
argument-hint: "[article file path]"
---

Before generating any output, use AskUserQuestion to ask the user:

"请选择输出语言 / Select output language:

1. 中文 (Chinese)
2. English"

All output artifacts must be produced in the user's chosen language.

Load the `wechat-publisher` skill and publish the content to WeChat Official Account.

If an article file path is provided, use it. Otherwise ask the user for the article content or file path.
