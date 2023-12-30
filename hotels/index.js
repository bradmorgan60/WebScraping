const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const { title } = require('process')


request("https://www.grandcanyonlodges.com/lodging/", (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html)
        const hotels = fs.createWriteStream('gc-hotels.csv')
        
        scrapedData = []
        hotels.write('Name\n')

       $('body > div.site-wrap > section > div > div > div > h3').each((i, el) => {
           const title = $(el).text()
           
        //    console.log(title)

        hotels.write(`${title}\n`)

        tableRow = (title)
       
       scrapedData.push(tableRow)

        
       })
       console.log("Scraping done...")


       


            
        
    }
})