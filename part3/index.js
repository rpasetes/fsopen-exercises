// (1106) functionality mainly unchanged, good to
// notice structural contrast of http vs express

// const http = require('http')
const express = require('express')
const app = express()

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

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// (1108) ayo, routes established in .get() first param
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})