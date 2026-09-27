const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const ignoreDirs = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.firebase',
]);

const ignoreFiles = new Set([
  '.env.example',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
]);

const allowedExtensions = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.txt',
  '.yml',
  '.yaml',
  '.env',
  '.html',
  '.css',
]);

const patterns = [
  {
    name: 'Private key block',
    regex: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/g,
  },
  {
    name: 'Firebase private_key field',
    regex: /"private_key"\s*:\s*"/g,
  },
  {
    name: 'Google API key',
    regex: /AIza[0-9A-Za-z\-_]{35}/g,
  },
  {
    name: 'GitHub token pattern',
    regex: /ghp_[0-9A-Za-z]{36}|github_pat_[0-9A-Za-z_]{80,}/g,
  },
  {
    name: 'AWS access key pattern',
    regex: /AKIA[0-9A-Z]{16}/g,
  },
];

function shouldScanFile(filePath) {
  const baseName = path.basename(filePath);
  if (ignoreFiles.has(baseName)) return false;

  const ext = path.extname(filePath);
  if (!ext) return false;

  return allowedExtensions.has(ext);
}

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, fullPath);

    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      walk(fullPath, files);
      continue;
    }

    if (shouldScanFile(fullPath)) {
      files.push({ fullPath, relPath });
    }
  }

  return files;
}

function scanFile(fileInfo) {
  const content = fs.readFileSync(fileInfo.fullPath, 'utf8');
  const findings = [];

  for (const pattern of patterns) {
    pattern.regex.lastIndex = 0;
    const match = pattern.regex.exec(content);

    if (match) {
      const line = content.substring(0, match.index).split('\n').length;
      findings.push({
        pattern: pattern.name,
        line,
      });
    }
  }

  return findings;
}

function main() {
  const files = walk(rootDir);
  let totalFindings = 0;

  for (const fileInfo of files) {
    const findings = scanFile(fileInfo);

    if (findings.length > 0) {
      for (const finding of findings) {
        totalFindings += 1;
        console.error(
          `[secret-scan] ${fileInfo.relPath}:${finding.line} -> ${finding.pattern}`
        );
      }
    }
  }

  if (totalFindings > 0) {
    console.error(`\n[secret-scan] FAIL: ${totalFindings} possible secret(s) found.`);
    process.exit(1);
  }

  console.log('[secret-scan] PASS: no obvious secrets found.');
}

main();
