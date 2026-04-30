# sheets-csv-exporter

**sheets-csv-exporter** converts arrays, object lists, and JSON files into spreadsheet-safe CSV output.

## Features

- Converts object arrays to CSV
- Converts row arrays to CSV
- Stable header ordering
- Optional custom columns
- Spreadsheet formula-injection protection
- File writing helper
- CLI for JSON-to-CSV export
- Zero runtime dependencies

## Usage

```bash
node cli.js data.json --out export.csv
```

Choose columns:

```bash
node cli.js data.json --columns name,email,total --out customers.csv
```

## Library

```js
import { objectsToCsv } from './index.js';

const csv = objectsToCsv([{ name: 'Imran', city: 'Nairobi' }]);
```

## Security note

CSV files opened in spreadsheet apps can execute formulas if cells begin with `=`, `+`, `-`, or `@`. This tool escapes dangerous leading characters by default.
