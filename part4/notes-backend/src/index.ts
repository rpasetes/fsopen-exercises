// (sep10;0904) okay ig with ts, were doing modern ES6 imports
// for best practices sake
import app from './app'
import config from './utils/config'
import logger from './utils/logger'

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})