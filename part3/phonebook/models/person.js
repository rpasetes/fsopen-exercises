const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('now connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// (1111) sweet we working with regex for the validation
// (1119) ugh i guess i have to update the data with new
// numbers... unless the validators don't check entries
// already in the server...
// (1149) oh WOW, today i learned about Regex Anchors!
// this allows the validation to match strs completely
// rather than finding a substring match. this'll help
// a ton in making the phone numbers only use one dash
// (1155) figured i'd also make a helpful error msg,,,
// (1201) PHEW and we didn't even need to change the
// backend or the frontend. let's fucken SHIP
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number (must start with 2 or 3 digit area code, separated by a single dash)`
    },
    minLength: 8,
    required: true
  },
})



personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)