const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const filmRoutes = require('./api/routes/film');
const userRoutes = require('./api/routes/user');
const feedbackRoutes = require('./api/routes/feedback');
 var app = express(); 

 //import identifiants MongoDB
 const connect = require('./api/connect/connect')


/* async function start() { */
  const isDev = process.env.NODE_ENV !== 'production'
  const port = process.env.PORT || 3000

/* const nuxt = await loadNuxt(isDev ? 'dev' : 'start') */
//connect db 

mongoose.connect('mongodb+srv://'+connect.userId+':'+connect.password+'@'+connect.cluster+'.'+connect.key+'.mongodb.net/tomatoes?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology:true
});

mongoose.Promise = global.Promise

//morgan 

app.use(morgan('dev'));


//extraire le body 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production') 


// routes 

app.use('/films',filmRoutes); 
app.use('/users',userRoutes); 
app.use('/feedbacks',feedbackRoutes); 
// GESTION d'erreur 


app.use((req,res,next) =>{
  const error = new Error('404 Not Found');
  error.status = 404;
  next(error);
})

app.use((error,req,res,next) => {
  res.status(error.status || 500);
  res.json({
      error:{
          message:error.message
      }
  })
})


// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

// Export express app
module.exports = app