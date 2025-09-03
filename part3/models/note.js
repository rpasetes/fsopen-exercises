const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

// (1242) to be initially passed in with:
// MONGODB_URI="connection_string_here" npm run dev 
const url = process.env.MONGODB_URI

/* taken from index.js
mongodb+srv://russap01_db_user:${password}@cluster0.
dccws8n.mongodb.net/noteApp?retryWrites=true&w=majority
&appName=Cluster0
*/

// (1243) yea we adding connection logging now boiiiii
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// (1244) different from 'export default' in frontend 
module.exports = mongoose.model('Note', noteSchema)