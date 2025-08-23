// (1045) commonjs require module for node, 
// es6 import modules for browser 
const http = require('http')

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// (1046) server displays same content regardless of latter url
const app = http.createServer((request, response) => {
  // response.writeHead(200, { 'Content-Type': 'text/plain' }) // header
  // response.end('Hello World')                               // content
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)