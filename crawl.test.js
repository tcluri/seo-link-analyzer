const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})


test('getURLsFromHTML relativeURLs', () => {
  const base_url = "https://blog.boot.dev"
  let html_string = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/hello"><span>Hello Page</span>/></a>
    </body>
</html>`
  const urlarray = getURLsFromHTML(html_string, base_url)
  const actual = urlarray[1]
  const expected = "https://blog.boot.dev/hello"
  expect(actual).toEqual(expected)
})


test('getURLsFromHTML aTagsNum', () => {
  const base_url = "https://blog.boot.dev"
  const html_string = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/hello"><span>Hello Page</span>/></a>
    </body>
</html>`
  const urlarray = getURLsFromHTML(html_string, base_url)
  const actual = urlarray.length
  const expected = 2
  expect(actual).toEqual(expected)
})
