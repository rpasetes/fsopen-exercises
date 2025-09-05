// (1045) handtyped initial file from fsopen section!

const mongoose = require('mongoose')

// (1048) taking in command > `node mongo.js yourPassword`
// (1051) changed pw to remove url encoding special characters
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// (1054) changing network access to include all IP addresses
// (1058) modifying uri to change db name reference to 'mongodb.net/noteApp?...'
const url =
`mongodb+srv://russap01_db_user:${password}@cluster0.dccws8n.mongodb.net/noteApp?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// (1113) so this is basically requesting to save this object onto our DB
// and we can run this multiple times to populate our model further
// const note = new Note({
//   content: 'MongoDB is interesting',
//   important: false,
// })

// (1056) note saved to mongo!
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

//
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})