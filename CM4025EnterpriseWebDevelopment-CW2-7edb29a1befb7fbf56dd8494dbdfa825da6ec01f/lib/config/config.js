

const config = {
    env: process.env.NODE_ENV || 'start',
    port: process.env.PORT || 8000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: 'mongodb+srv://admin:password1234@cluster0.wg0en.mongodb.net/users?retryWrites=true&w=majority'

    
   }
   console.log(config.mongoUri)
   export default config
   