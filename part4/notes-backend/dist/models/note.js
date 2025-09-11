"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// (sep11;1319) cool to import both objects and types
// (1350) okay a lil more extra things to type out
// but the final product will be really cool and
// set me up really well when i touch the controller...
const mongoose_1 = __importStar(require("mongoose"));
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
const noteSchema = new mongoose_1.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
});
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
noteSchema.methods.toJSON = function () {
    const note = this;
    return {
        id: note._id.toString(),
        content: note.content,
        important: note.important
    };
};
exports.default = mongoose_1.default.model('Note', noteSchema);
