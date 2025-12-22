#!/usr/bin/env node
/**
 * Pre-Commit Validator Hook
 *
 * Runs typecheck and build before allowing git commits.
 * Following Anthropic's "block-at-submit" pattern for validation.
 *
 * Usage: Called automatically by Claude Code hook system
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = path.resolve(__dirname, '../../capture-client-site');
const MARKER_FILE = path.resolve(__dirname, '../.validation-passed');

function log(message, type = 'info') {
  const prefix = {
    info: '\x1b[36m[INFO]\x1b[0m',
    success: '\x1b[32m[PASS]\x1b[0m',
    error: '\x1b[31m[FAIL]\x1b[0m',
    warn: '\x1b[33m[WARN]\x1b[0m'
  }[type] || '[INFO]';

  console.log(`${prefix} ${message}`);
}

function runCommand(command, description) {
  log(`Running: ${description}...`);
  try {
    execSync(command, {
      cwd: PROJECT_ROOT,
      stdio: 'pipe',
      encoding: 'utf-8'
    });
    log(`${description} passed`, 'success');
    return true;
  } catch (error) {
    log(`${description} failed`, 'error');
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
}

function main() {
  log('Pre-commit validation starting...');

  // Check if project directory exists
  if (!fs.existsSync(PROJECT_ROOT)) {
    log(`Project directory not found: ${PROJECT_ROOT}`, 'error');
    process.exit(1);
  }

  // Remove previous marker if exists
  if (fs.existsSync(MARKER_FILE)) {
    fs.unlinkSync(MARKER_FILE);
  }

  const checks = [
    { command: 'npm run typecheck', description: 'TypeScript check' },
    { command: 'npm run build', description: 'Production build' }
  ];

  let allPassed = true;

  for (const check of checks) {
    if (!runCommand(check.command, check.description)) {
      allPassed = false;
      break; // Stop on first failure
    }
  }

  if (allPassed) {
    // Create marker file on success
    fs.writeFileSync(MARKER_FILE, new Date().toISOString());
    log('All validation checks passed! Commit allowed.', 'success');
    process.exit(0);
  } else {
    log('Validation failed. Please fix errors before committing.', 'error');
    process.exit(1);
  }
}

main();
