/* express -> libreria */
const express = require('express');
const mongoose = require('mongoose');
const { logErrors, errorHandler,boomErrorHandler} = require('./src/middlewares/error.handler');
const routerApi = require('./src/routes')
const my_app = express();
/* Accede al archivo .env */
require('dotenv').config();
const port = process.env.PORT;



my_app.listen(port, () => console.log('Port active', port));


mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Succes connection'))
  .catch((error) => console.error(error));

my_app.use(express.json());
my_app.use(logErrors)
my_app.use(errorHandler)
my_app.use(boomErrorHandler)


/* ---------------------TWILIO------------------------------ */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Prueba de twilio. Ingenieria de Software II. U Autonoma - 2022',
    from: '+19706717884',
    to: '+573207974474',
  })
  .then((message) => console.log(message.sid));

/* ---------------------TWILIO------------------------------ */

/* ---------------------SENDGRID------------------------------ */

my_app.use(express.json());
my_app.use(express.urlencoded({ extended: false}));

my_app.get('/', (req,res)=>{
  res.json({message:'Success'})
})

my_app.post('/api/email/confirmation', async(req,res,next)=>{
  try {
    res.json(await email.sendOrder(req.body))
  } catch (error) {
    next(error)
  }
})

my_app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({ message: err.message})
  return;
});

/* ---------------------SENDGRID------------------------------ */
routerApi(my_app);