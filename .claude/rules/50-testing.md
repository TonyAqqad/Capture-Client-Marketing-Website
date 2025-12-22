---
paths: capture-client-site/{package.json,tsconfig.json}
---

# Testing & validation

## Node Version
Use Node 20.18.1 (LTS). The `.nvmrc` file is in `capture-client-site/`:
```bash
cd capture-client-site && nvm use  # Uses .nvmrc
```

## Fast checks
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Pre-commit Validation
Hooks are configured in `.claude/settings.local.json`:
- **PreToolUse**: Runs typecheck + build before `git commit` commands
- **PostToolUse**: Logs all Edit tool usage for memory-sync tracking

Hook format example:
```json
{
  "matcher": { "tools": ["Bash"], "command_pattern": "git commit" },
  "hooks": [{ "type": "command", "command": "node .claude/hooks/pre-commit-validator.js" }]
}
```

## Visual testing (Claude Code `/chrome`)

This project uses Claude Code’s **Chrome integration** (beta) for visual QA (not MCP).

Prereqs:
- Google Chrome
- Claude in Chrome extension `>= 1.0.36`
- Claude Code CLI `>= 2.0.73`
- A paid Claude plan (Pro/Team/Enterprise)
- Note: WSL is not supported for Chrome integration; run Claude Code on the host OS.

Workflow:
1. Start the dev server: `cd capture-client-site && npm run dev`
2. Start Claude Code with Chrome enabled: `claude --chrome`
3. Run `/chrome` to verify connection (reconnect if needed)
4. Ask Claude to visually inspect routes and breakpoints:
   - “Open `http://localhost:3000/pricing` and check text truncation, CTA contrast, and layout alignment.”
   - “Resize to **375×812** and re-check; then **1440×900**.”

## Web Research (Bright Data MCP)

Use Bright Data MCP for competitor analysis or external research (external URLs). Keep this separate from local UI QA.
- `mcp__brightdata__search_engine` - Search the web
- `mcp__brightdata__scrape_as_markdown` - Scrape external page content
Setup note: Bright Data MCP requires an API token via environment variable (do not commit tokens). Export `API_TOKEN` before starting Claude Code.

## Bright Data + Chrome together (practical setup)
- Use `/chrome` for **local UI QA** (`http://localhost:3000`).
- Use Bright Data MCP for **external browsing/scraping** (SERPs, competitor pages, docs).
- If you proxy Chrome through Bright Data for external browsing, configure a bypass list for `localhost,127.0.0.1` and use a dedicated Chrome profile to avoid breaking local dev.
