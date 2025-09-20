// (1453) changing commonjs requires to es6 imports
import express, { Router } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

// (1539) alright we scripting types in this mfer
interface Config {
  PORT: string
  MONGODB_URI: string
}

const config: Config = {
  PORT: process.env.PORT || '3003',
  MONGODB_URI: process.env.MONGODB_URI || ''
}

// (1454) new import makes for new schema
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

// (1523) after settling some finance stuff, deciding
// to create a new db thru my browser on atlas
// (1529) actually, now i'm talking to claude and
// figuring out how to make the new db programatically
// (1530) aight lemme set up my dotenv config first
// (1542) cool, now we have a proper connection setup
const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => console.log('connected to MongoDB'))
  .catch((error: Error) => console.error('error connecting', error.message))

app.use(express.json())

// (1455) creating blogRouter for types 
const blogRouter = Router()

// (1456) replacing api route to root
// (1606) and localhost is returning all blogs! SHIP
blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// (1543) and now to make a request
// (1549) cool, let's see if our boy river
// makes it to mongodb
// (1550) and it does, just doesn't have our
// data taken in from the backend
// (1602) oh snap i gotta set the content type
// for my route handler to receive my json,
// ht claude to tip me on logging the request body 
blogRouter.post('/', (request, response) => {
  console.log(request.body)

  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

// (1456) attaching router to our app
app.use('/api/blogs', blogRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})