import mongoose from 'mongoose'
import { consola } from 'consola'

import server from './lib/server.js'
import config from './config/config.js'

const init = async () => {
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(config.mongoUri)

    server.setup()
    server.start()
  } catch (error) {
    consola.error(error)
    process.exit(1)
  }
}

init()
