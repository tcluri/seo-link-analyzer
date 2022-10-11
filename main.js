const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
  const argvlength = process.argv.length
  if (argvlength < 3){
    console.log("No website given")
  }
  else if (argvlength > 3){
    console.log("Cannot give more arguments than just the website")
  }
  else {
    const baseURL = process.argv[2]
    console.log(`Starting crawl of ${baseURL}`)
    // Call crawlPage on baseURL to print the
    // HTML output as a string
    const pages = await crawlPage(baseURL, baseURL, {})
    // console.log(pages)
    printReport(pages)
  }
}

main()
