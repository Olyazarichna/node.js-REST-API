const mongoose =require('mongoose');
const app = require('./app')

const {DB_HOST, PORT}=process.env;
mongoose.connect(DB_HOST).then(()=>app.listen(PORT)).catch(error=>{console.log(error.message);
process.exit(1)});

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

