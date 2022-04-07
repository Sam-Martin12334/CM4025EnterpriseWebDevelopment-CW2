import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {dbname: "test"}, function (error) {
  // Do things once connected
  if (error) {
    console.log('Database error or database connection error ' + error);
  }
  console.log('Database state is ' + mongoose.connection.readyState);
});

mongoose.connection.on('error', err => {
 throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

console.log(config.mongoUri)



app.listen(config.port, (err) => {
 if (err) {
 console.log(err)
 }
 console.info('Server started on port %s.', config.port)
})

console.log(mongoose.connection.readyState);
