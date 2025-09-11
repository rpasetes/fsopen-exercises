"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// (1814) changing the imports also made all the
// type errors go away too? that's crazy
const express_1 = require("express");
const note_1 = __importDefault(require("../models/note"));
const notesRouter = (0, express_1.Router)();
notesRouter.post('/', (request, response, next) => {
    const body = request.body;
    const note = new note_1.default({
        content: body.content,
        important: body.important || false,
    });
    note.save()
        .then(savedNote => {
        response.json(savedNote);
    })
        .catch(error => next(error));
});
notesRouter.get('/', (request, response) => {
    note_1.default.find({}).then(notes => {
        response.json(notes);
    });
});
notesRouter.get('/:id', (request, response, next) => {
    note_1.default.findById(request.params.id)
        .then(note => {
        if (note) {
            response.json(note);
        }
        else {
            response.status(404).end();
        }
    })
        .catch(error => next(error));
});
notesRouter.delete('/:id', (request, response, next) => {
    note_1.default.findByIdAndDelete(request.params.id)
        .then(() => {
        response.status(204).end();
    })
        .catch(error => next(error));
});
// (sep11;1813) DAMN REALLY async await solves my ts problems?
// wow dude i gotta get on this clean promise syntax more...
notesRouter.put('/:id', async (request, response, next) => {
    try {
        const { content, important } = request.body;
        const note = await note_1.default.findById(request.params.id);
        if (!note) {
            return response.status(404).end();
        }
        note.content = content;
        note.important = important;
        const updatedNote = await note.save();
        response.json(updatedNote);
    }
    catch (error) {
        next(error);
    }
});
exports.default = notesRouter;
