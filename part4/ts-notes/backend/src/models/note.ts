// (sep11;1319) cool to import both objects and types
// (1350) okay a lil more extra things to type out
// but the final product will be really cool and
// set me up really well when i touch the controller...
import mongoose, { Schema } from 'mongoose'
import { INote, INoteDocument, INoteJSON } from '../types/note'

// (1320) and we're defining an interface for our
// data and how it's being handled by our backend
// (1351) okay let's comment this out and bring
// this code over to src/types/note.ts
// interface INote extends Document {
//   content: string
//   important?: boolean
//   id: string // the transformed to JSON id
// }

// (1322) and the schema object doesn't have to be
// called with mongoose.() since we import it directly
const noteSchema = new Schema<INote>({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

// (1405) okay looks like this json method might be
// messy to implement in typescript, lemme try a
// cleaner approach that claude recommends...
// noteSchema.set('toJSON', {
//   transform: (document, returnedObject: any) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })
// (1749) oh nice, looks like this cleaner version will
// work with my router, since JSON.stringify() will use
// whatever we provide it through our schema, transparency!
noteSchema.methods.toJSON = function(): INoteJSON {
  const note = this as INoteDocument
  return {
    id: note._id.toString(),
    content: note.content,
    important: note.important
  }
}

export default mongoose.model<INote>('Note', noteSchema)