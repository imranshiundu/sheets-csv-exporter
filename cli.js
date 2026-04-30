#!/usr/bin/env node
import fs from 'node:fs/promises';
import { writeCsv } from './index.js';

function parseArgs(argv) {
  const args = {};
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out') args.out = argv[++i];
    else if (arg === '--columns') args.columns = argv[++i].split(',').map((item) => item.trim()).filter(Boolean);
    else if (arg === '--no-formula-protection') args.protectFormulas = false;
    else if (arg === '--help' || arg === '-h') args.help = true;
    else positional.push(arg);
  }
  args.input = positional[0];
  return args;
}

function help() {
  console.log(`sheets-csv-exporter

Usage:
  node cli.js data.json --out export.csv [--columns name,email]
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.input) return help();
  const data = JSON.parse(await fs.readFile(args.input, 'utf8'));
  const out = args.out || 'export.csv';
  await writeCsv(out, data, args);
  console.log(`Wrote ${out}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
