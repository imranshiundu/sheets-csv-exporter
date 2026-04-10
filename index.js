        export function rowsToCsv(rows = []) {
          return rows.map((row) => row.map((cell) => JSON.stringify(String(cell ?? ''))).join(',')).join('
');
        }

        if (import.meta.url === `file://${process.argv[1]}`) {
          console.log(rowsToCsv([['name', 'email'], ['Imran', 'imranshiundu@gmail.com']]));
        }
