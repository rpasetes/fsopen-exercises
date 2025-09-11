import dotenv from 'dotenv'

// (sep11;1232) load variables
dotenv.config()

// (1235) then set the types
interface Config {
  PORT: string
  MONGODB_URI: string
}

// (1238) create the object to be exported
const config: Config = {
  PORT: process.env.PORT || '3001',
  MONGODB_URI: process.env.MONGODB_URI || ''
}

// and then validate required environment variables
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required')
}

export default config
export const { PORT, MONGODB_URI } = config