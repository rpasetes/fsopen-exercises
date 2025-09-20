"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// (sep10;0904) okay ig with ts, were doing modern ES6 imports
// for best practices sake
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
app_1.default.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server running on port ${config_1.default.PORT}`);
});
