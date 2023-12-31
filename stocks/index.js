const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const XLSX = require('xlsx');

// Function to scrape data from the website
async function scrapeWebsite() {
  try {
    const response = await axios.get('https://www.kiplinger.com/investing/stocks/dividend-stocks/best-dividend-stocks-you-can-count-on');
    const $ = cheerio.load(response.data);

    // Your scraping logic to extract data from the table
    const tableData = [];
    $('table tr').each((index, row) => {
      const rowData = [];
      $(row).find('td').each((i, cell) => {
        rowData.push($(cell).text().trim());
      });
      tableData.push(rowData);
    });

    return tableData; 
    // console.log(tableData); // Display new data in the console
  } catch (error) {
    console.error('Error while scraping website:', error);
    throw error;
  }
}

// scrapeWebsite()

// Function to export data to Excel
function exportToExcel(data) {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

  // Save the workbook to a file
  XLSX.writeFile(wb, 'output.xlsx');
  console.log('Data exported to Excel successfully.');
}

// Main function
async function main() {
  try {
    const scrapedData = await scrapeWebsite();
    exportToExcel(scrapedData);
  } catch (error) {
    console.error('Error in the main process:', error);
  }
}

// // Run the main function
main();







