---
paths: capture-client-site/{package.json,tsconfig.json}
---

# Testing & validation

## Fast checks
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Visual Testing (Chrome MCP)

For local page inspection, use Claude-in-Chrome MCP tools:
- `mcp__claude-in-chrome__navigate` - Go to page at `http://localhost:3000`
- `mcp__claude-in-chrome__read_page` - Inspect DOM/accessibility tree
- `mcp__claude-in-chrome__resize_window` - Test responsive breakpoints (375px mobile, 1440px desktop)
- `mcp__claude-in-chrome__gif_creator` - Record interaction sequences

## Web Research (Bright Data MCP)

For competitor analysis or external research:
- `mcp__brightdata__search_engine` - Search the web
- `mcp__brightdata__scrape_as_markdown` - Scrape external page content
