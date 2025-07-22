const csv = require('csv-parser');
const fs = require('fs');
const { ApiError } = require('./apiError');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Transforma o objeto linha em uma string "coluna1: valor1 | coluna2: valor2"
        const rowText = Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join(' | ');

        results.push({
          data: row,     
          text: rowText, 
        });
      })
      .on('end', () => resolve(results))
      .on('error', (error) => {
        reject(new ApiError(400, `CSV parsing failed: ${error.message}`));
      });
  });
};

module.exports = { parseCSV };
