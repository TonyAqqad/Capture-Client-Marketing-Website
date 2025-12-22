#!/usr/bin/env node
/**
 * Edit Logger Hook
 *
 * Logs all file edits with timestamps to help memory-sync track changes.
 * Following Anthropic's best practice of logging tool invocations.
 *
 * Usage: Called automatically by Claude Code hook system after Edit tool
 */

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.resolve(__dirname, '../.edit-log.jsonl');
const MAX_LOG_ENTRIES = 1000; // Prevent unbounded growth

function appendLog(entry) {
  const logLine = JSON.stringify(entry) + '\n';

  // Create log file if it doesn't exist
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, logLine);
    return;
  }

  // Append to existing log
  fs.appendFileSync(LOG_FILE, logLine);

  // Prune if too large (keep last MAX_LOG_ENTRIES)
  try {
    const content = fs.readFileSync(LOG_FILE, 'utf-8');
    const lines = content.trim().split('\n');

    if (lines.length > MAX_LOG_ENTRIES) {
      const pruned = lines.slice(-MAX_LOG_ENTRIES).join('\n') + '\n';
      fs.writeFileSync(LOG_FILE, pruned);
    }
  } catch {
    // Ignore pruning errors
  }
}

function main() {
  // Get edit details from environment or stdin
  const filePath = process.env.CLAUDE_EDIT_FILE || process.argv[2] || 'unknown';

  const entry = {
    timestamp: new Date().toISOString(),
    action: 'edit',
    file: filePath,
    session: process.env.CLAUDE_SESSION_ID || 'unknown'
  };

  appendLog(entry);

  // Silent success - don't block the edit
  process.exit(0);
}

main();
