import fs from 'node:fs/promises';

function protectFormula(value) {
  const text = String(value ?? '');
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

export function escapeCell(value, options = {}) {
  const safe = options.protectFormulas === false ? String(value ?? '') : protectFormula(value);
  return `"${safe.replaceAll('"', '""')}"`;
}

export function rowsToCsv(rows = [], options = {}) {
  return rows.map((row) => row.map((cell) => escapeCell(cell, options)).join(',')).join('\n');
}

export function objectsToCsv(items = [], options = {}) {
  const headers = options.columns || [...items.reduce((set, item) => {
    Object.keys(item || {}).forEach((key) => set.add(key));
    return set;
  }, new Set())];
  const rows = [headers, ...items.map((item) => headers.map((header) => item?.[header] ?? ''))];
  return rowsToCsv(rows, options);
}

export async function writeCsv(filePath, items, options = {}) {
  const csv = Array.isArray(items) && items.length && !Array.isArray(items[0])
    ? objectsToCsv(items, options)
    : rowsToCsv(items, options);
  await fs.writeFile(filePath, csv + '\n', 'utf8');
  return filePath;
}
