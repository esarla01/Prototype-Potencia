import express from "express";
import paypal from "paypal-rest-sdk";

const payments_ip  = "http://10.245.51.38";
const payments_port  = "3000";
export const payments_url  = `${payments_ip}:${payments_port}`;

const router = express.Router();

/*connect to mongo db here*/
import mongoose from 'mongoose';
// import mongoose from 'mongoose';
import User from './User.js';
// import User from '../backend/models/User';
// const User = require('../backend/models/User.ts');


import bodyParser from 'body-parser';
// const bodyParser = require('body-parser') // Required to get req.body to work

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

mongoose.connect("MONGODB LINK");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
})

paypal.configure({
  mode: "sandbox",
  client_id:
    "CLIENT ID",
  client_secret:
    "CLIENT SECRET",
});


/*TODO: update credits model to reflect types of credits you can buy/price etc*/
const payment_cost = 5; 
// const credits = 4; 


const PORT = 3000;
const app = express();

let user_email;
let user_subtotal;
let user_credits;

app.use(express.json());

import { URL } from 'url';
const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

app.get("/", (req, res) => {
  try{
    console.log("Get request for /");
    res.sendFile(__dirname + "/index.html");
  } catch (error) {
    console.log(error); 
    res.status(500).send("failed to send file"); 
  }
});
app.listen(PORT, () => console.log(`Server Started on ${PORT}`));

app.post('/userpay', async (req, res) => {
  try {
  const { email, subtotal } = req.body;
  console.log("Received email:", email);

  /*before we pay we make sure the user exists: if they don't we need to cancel*/  
  /*TODO: HOW DO WE CANCEL OUT OF THIS?*/
  const user =  await User.findOne({email: email});
  console.log(user);
  user_email = user.email;
  user_subtotal = subtotal;
  user_credits = user_subtotal / payment_cost; // integer division?
  console.log("User's Email: " + user_email);
  console.log("User's Subtotal: " + user_subtotal);
  console.log("User's Credits Gained: " + user_credits);
  console.log("User's Original Credits: " + user.credits)
  if (!user) {
    res.status(404).send("User not found");
    // res.send(`<!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //       <meta charset="UTF-8">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //       <title>potenciaError</title>
    //     </head>
    //     <body>
        
    //         <h1>Potencia error</h1>
    //         <script>
    //         window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'potenciaError' }));
    //     </script>
          
    //     </body>
    //     </html>`);
    return;
  }
  res.send(user);
} catch {
  console.log("error in /userpay request ")
}
});

/*PAY post request for Potencia, build payment with information */
  app.post('/pay', async (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": `${payments_url}/success`,
        "cancel_url": `${payments_url}/cancel`
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Class",
                "price": payment_cost,
                "currency": "USD",
                "quantity": user_credits, // used to be credits
            }]
        },
        "amount": {
            "currency": "USD",
            "total": user_subtotal, // used to be payment_cost * credits
        },
        "description": "Classes for Potencia"
    }]
  };
  // res.send(user);
// });

/* REDIRECT SUCESSFUL: now we query the page for 
* the payer id and payment id, after we execute the payment and then see if it is 
* sucessful
*/
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": user_subtotal, // used to be payment_cost * credits
        }
    }]
  };

/*execute payemnt, if it goes through then the user has sucessful paid in full*/
  paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
    if (error) {
      /*PAYMENT DID NOT GO THORUGH*/
        console.log(error.response);
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>paypalError</title>
        </head>
        <body>
        
            <h1>Paypal Error Cancelled!</h1>
            <script>
            window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'paypalError' }));
        </script>
          
        </body>
        </html>`);
        throw error;
    } else {
      /*PAYMENT WENT THROUGH AND IS SUCCESS: MONGO HERE*/
      /*Note: JSON payment object has a lot of information not all we need 
      but some we might need for now we will just update the potencia credits */
        console.log(JSON.stringify(payment));
        
        
        // need to find user using their email (or other form of unique id)
        const user = await User.findOne({email: user_email});
        console.log(user.email);
        if (!user) {
          res.status(404).send("User not found");
          // res.send(`<!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //       <meta charset="UTF-8">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //       <title>potenciaError</title>
    //     </head>
    //     <body>
        
    //         <h1>Potencia error</h1>
    //         <script>
    //         window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'potenciaError' }));
    //     </script>
          
    //     </body>
    //     </html>`);
          return;
        }
       
        const init_balance = user.balance;
        user.balance += user_subtotal;

        console.log("Original balance:", init_balance);
        console.log("new balance:", user.balance); 


        //UPDATE TRANACTION FIELD: update transactions field 
        const description = "Add Amount";
        const transactionType = "Purchase";
        const date = Date.now();
        const amount = user_subtotal;

        const transaction = {
          date: date,
          description: description,
          transactionType: transactionType,
          amount: amount,
        }

        user.transactions.push(transaction);

        // Save the user to the database
        const saved = await user.save(); // throws error if no document with _id found

        /* ATTEMPT: */
        // const data = {
        //   html: `<!DOCTYPE html>
        //   <html lang="en">
        //   <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
        //     <title>success</title>
        //   </head>
        //   <body>
          
        //       <h1>Transaction Successful!</h1>
        //       <script>
        //       window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'success' }));
        //   </script>
            
        //   </body>
        //   </html>`,
        //   user: user,
        // };

        // res.send(JSON.stringify(data));

        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>success</title>
        </head>
        <body>
        
            <h1>Transaction Successful!</h1>
            <script>
            window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'success' }));
        </script>
          
        </body>
        </html>`);

        // res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
      }
  });
});


/* Code sends payment request to paypal, receives approval URL, then redirects
user to paypal to complete payment */
  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        /*PAYMENT COULDN'T BE CREATED*/
        console.log("here checking to see if error is in payement.create"); 
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>paypalError</title>
        </head>
        <body>
        
            <h1>Paypal Error Cancelled!</h1>
            <script>
            window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'paypalError' }));
        </script>
          
        </body>
        </html>`);
          throw error;
      } else {
          for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              res.redirect(payment.links[i].href);
            }
          }
      }
    });
    // res.send(user);
});

app.get('/cancel', (req, res) => {
  res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>cancel</title>
        </head>
        <body>
        
            <h1>Transaction Cancelled!</h1>
            <script>
            window.ReactNativeWebView.postMessage(JSON.stringify({ title: 'cancel' }));
        </script>
          
        </body>
        </html>`);
});
// app.get('/cancel', (req, res) => res.render('Cancelled'));

// log here or on webpage?