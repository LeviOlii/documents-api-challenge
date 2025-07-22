const fs = require('fs');
const pdf = require('pdf-parse');
const { ApiError } = require('./apiError');

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return { text: data.text }; 
};

module.exports = { extractTextFromPDF };