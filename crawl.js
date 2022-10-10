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



module.exports = {
  normalizeURL,
  getURLsFromHTML
}
