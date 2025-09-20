"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// and changed from require to ES6
const logger_1 = __importDefault(require("./logger"));
// (1825) oh my gosh, i can also do the same type inferences
// with RequestHandler, no 'request: Request' manual tedium!
const requestLogger = (request, response, next) => {
    logger_1.default.info('Method:', request.method);
    logger_1.default.info('Path  :', request.path);
    logger_1.default.info('Body  :', request.body);
    logger_1.default.info('---');
    next();
};
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
// (1313) also looks like the Error type is just available in ts,
// (1820) yo! @types/express has a dedicated type for this fn, so
// i don't need to manually type my parameters with this context!
const errorHandler = (error, request, response, next) => {
    logger_1.default.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
// (1314) and finally changed the default export
exports.default = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
