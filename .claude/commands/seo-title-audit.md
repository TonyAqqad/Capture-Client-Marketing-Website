---
description: Find pages with title tags likely too long for SERP display
model: haiku
disable-model-invocation: true
---

Audit metadata titles for length across `capture-client-site/src/app/**/page.tsx`.

Output:
- A table of `file:line` → title string → character count
- A prioritized short list of the worst offenders

Guidelines:
- Aim for < 60 chars including the `" | Capture Client"` suffix
- Canonical domain is `https://captureclient.com`
