function printReport(pages) {
  console.log("The report is printing...")
  const sortedArr = sortingDict(pages)
  for (const eachPage of sortedArr){
    console.log(`Found ${eachPage[1]} internal links to ${eachPage[0]}`)
  }
}


function sortingDict(inpDict) {
  const inpArray = Object.entries(inpDict)
  inpArray.sort((x, y) => {return y[1] - x[1]})
  return inpArray
}

module.exports = {
  printReport,
  sortingDict
}
