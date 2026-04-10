                import fs from 'node:fs/promises';

                const escapeCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

                export function rowsToCsv(rows = []) {
                  return rows.map((row) => row.map(escapeCell).join(',')).join('
');
                }

                export function objectsToCsv(items = []) {
                  const headers = [...items.reduce((set, item) => {
                    Object.keys(item || {}).forEach((key) => set.add(key));
                    return set;
                  }, new Set())];
                  const rows = [headers, ...items.map((item) => headers.map((header) => item?.[header] ?? ''))];
                  return rowsToCsv(rows);
                }

                export async function writeCsv(filePath, items) {
                  const csv = Array.isArray(items) && items.length && !Array.isArray(items[0])
                    ? objectsToCsv(items)
                    : rowsToCsv(items);
                  await fs.writeFile(filePath, csv, 'utf8');
                  return filePath;
                }

                if (import.meta.url === `file://${process.argv[1]}`) {
                  console.log(objectsToCsv([{ name: 'Imran', city: 'Nairobi' }, { name: 'Haico', city: 'Cloud' }]));
                }
