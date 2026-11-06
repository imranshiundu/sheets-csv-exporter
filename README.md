# sheets-csv-exporter

Write object lists or pre-built rows to a **Google-Sheets-safe CSV** — as a CLI or Node library.

## The safety feature

Cell values that begin with `=`, `+`, `-`, or `@` are prefixed with `'` **by default**, so
pasting exported CSV into Sheets can never trigger a formula-injection path.
Disable only on trusted output: `--no-formula-protection` or `{ protectFormulas: false }`.

## CLI

```bash
node cli.js data.json --out out.csv
node cli.js data.json --out out.csv --columns id,name,email
node cli.js data.json --out out.csv --no-formula-protection
node cli.js --help
```

## Library

```js
import { writeCsv, objectsToCsv, rowsToCsv, escapeCell } from './index.js';

await writeCsv('out.csv', [{ id: 1, name: 'Ada' }]);        // object list → header row included
await writeCsv('out.csv', [['a', 'b'], ['1', '2']]);        // raw rows as-is
```

| Export | Purpose |
|---|---|
| `escapeCell(value, opts)` | quoting + formula guard for a single cell |
| `rowsToCsv(rows, opts)` | rows already `[values...]` |
| `objectsToCsv(items, opts)` | auto header from union of keys, or `opts.columns` order |
| `writeCsv(path, data, opts)` | picks rows vs objects, writes file, returns path |

## Tests

```bash
npm test
```
