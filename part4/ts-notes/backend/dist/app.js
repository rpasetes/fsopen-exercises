"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const notes_1 = __importDefault(require("./controllers/notes"));
// (sep10;0916) ts does implicit type inference,
// no need to define when creating object!
const app = (0, express_1.default)();
logger_1.default.info('connecting to', config_1.default.MONGODB_URI);
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(config_1.default.MONGODB_URI)
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connection to MongoDB:', error.message);
});
app.use(express_1.default.static('dist-frontend'));
app.use(express_1.default.json());
app.use(middleware_1.default.requestLogger);
app.use('/api/notes', notes_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
