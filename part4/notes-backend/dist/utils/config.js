"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// (sep11;1232) load variables
dotenv_1.default.config();
// (1238) create the object to be exported
const config = {
    PORT: process.env.PORT || '3001',
    MONGODB_URI: process.env.MONGODB_URI || ''
};
// and then validate required environment variables
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is required');
}
exports.default = config;
exports.PORT = config.PORT, exports.MONGODB_URI = config.MONGODB_URI;
