const fs = require('fs');
const path = require('path');

/**
 * Read the version from AGENTS.md.
 *
 * Looks for the pattern: **Version**: X.Y (YYYY-MM-DD)
 * Falls back to package.json version if not found.
 */
function readVersion(pkgRoot) {
  try {
    const agentsMd = fs.readFileSync(
      path.join(pkgRoot, 'agent', 'AGENTS.md'),
      'utf8'
    );

    const match = agentsMd.match(/\*\*Version\*\*:\s*([\d.]+)/);
    if (match) return match[1];
  } catch {
    // Fall through to package.json
  }

  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(pkgRoot, 'package.json'), 'utf8')
    );
    return pkg.version || 'unknown';
  } catch {
    return 'unknown';
  }
}

module.exports = { readVersion };
