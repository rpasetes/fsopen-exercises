import { Document, Types } from 'mongoose'

// (1353) taking our og interface that has
// the content we'll be sharing throughout
export interface INote{
  content: string
  important?: boolean
}

// (1353) then extend it with data added by Mongoose
export interface INoteDocument extends INote, Document {
  _id: Types.ObjectId
  __v: number
}

// (1354) finally create the interface for our json
export interface INoteJSON extends INote {
  id: string
}
