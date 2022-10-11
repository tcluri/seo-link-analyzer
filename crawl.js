function normalizeURL(url){
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
  const {JSDOM} = require('jsdom')
  const dom = new JSDOM(htmlBody)
  const aTagArray = dom.window.document.querySelectorAll('a')
  const urlArray = []
  for (const eachATag of aTagArray){
    if (eachATag === null || eachATag === undefined){
      continue
    }
    if (eachATag.href.slice(0,1) === '/') {
      urlArray.push(`${baseURL}`+`${eachATag.href}`)
      continue
    }
    urlArray.push(`${eachATag.href}`)
  }
  return urlArray
}


async function crawlPage(baseURL, currentURL, pages={}) {
   console.log(`Crawling ${baseURL}`)
  // Check if the baseURL and currentURL are on the same domain
  const baseDomain = new URL(baseURL)
  const currentURLDomain = new URL(currentURL)
  // console.log(`Base domain: ${baseDomain.hostname} \nCurrent domain: ${currentURLDomain.hostname}`)
  if (baseDomain.hostname !== currentURLDomain.hostname){
    return pages
  }
  // Normalized version of the currentURL
  const normCurrentURL = normalizeURL(currentURL)
  if (pages[normCurrentURL] > 0){
    pages[normCurrentURL]++
    return pages
  }
  // If no normCurrentURL is present, initialize with a 1
  pages[normCurrentURL] = 1

  try {
    const fetchWebpage = await fetch(currentURL)
    if (!fetchWebpage.ok){
      console.log(`Error occcured: ${fetchWebpage.status}`)
      return pages
    }
    const contentType = await fetchWebpage.headers.get('content-type')
    if(!contentType.includes("text/html")){
      console.log("Content type is not of type text/html")
      return pages
    }
    const urlArray = getURLsFromHTML(await fetchWebpage.text(), baseURL)
    // For each url in the webpage -- call the function recursively
    for (eachURL of urlArray){
      pages = await crawlPage(baseURL, eachURL, pages)
    }
  }
  catch (err){
    console.log(err.message)
  }
  return pages
}



module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}
