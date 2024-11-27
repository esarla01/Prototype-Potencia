/* 
 * Last edited by Stephanie, Olivia, and Erin on 11/20/22
 * 
 * Set up post request at the route "/schema", and tested fully 
 * that clients could input userType on the frontend and send it
 * all the way to the database to update the user type of "student123".
 *
 * Postman is a great tool for testing the routing.
 *
 */

import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import User from './models/User';
import cors from 'cors';
import { request } from "http";
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser'; // Required to get req.body to work
import calendar from './routes/calendar'
import searchAvail from './routes/searchAvail'
import scheduling from './routes/scheduling'
import scheduled from './routes/scheduled'
import authentication from './routes/authentication';
import Event from './models/Event';
import Availability from "./models/Availability";
import search from './routes/search';
import { Console } from "console";
import accessCode from "./models/AccessCode";
import auth from './routes/auth';
dotenv.config();

const router = express.Router();
const app = express();
const port = process.env.PORT;
app.use('/calendar', calendar);
app.use ('/searchAvail', searchAvail);
app.use('/scheduling', scheduling)
app.use('/scheduled', scheduled)

app.use('/auth', auth);
app.use('/authentication', authentication);
app.use('/search', search);

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

mongoose.connect("mongodb+srv://potencia:F2NktSW5Yet0Axdd@potenciacluster.3ben6tu.mongodb.net/potenciaDB");

/* user information for testing */
const userdata = {
    userType: "student",
    userName: "student456",
    password: "12345",
    interest: "Baking",
    phone: "7814989695",
    location: {
      city: "Boston",
      state: "MA",
    }
  }


  // const accessCode1 = {
  //   code: 'ABCDE',
  //   used: false,
  //   dateCreated: new Date(),
  //   usedBy: 'Ellis'
  // };

  // const accessCode2 = {
  //   code: 'ZXCVB',
  //   used: false,
  //   dateCreated: new Date(),
  //   usedBy: 'Sarah'
  // };

  // const accessCode3 = {
  //   code: 'XCVRW',
  //   used: false,
  //   dateCreated: new Date(),
  //   usedBy: 'Robert',
  };
    
  
  /* insertUser
   * purpose: Create an instance of a mongoose user schema and insert into the
   *          database based on hardcoded values. Useful for easily adding new
   *          users and can be repurposed for other schemas (i.e. Event).
   *   notes: Commented out since we don't want to insert a new User every time,
   *          but can be uncommented if anyone wants to easily insert a new User.
   */
  
  async function insertAccessCode(accessCode1: { used: boolean; dateCreated: Date; usedBy: string; code: string; }) {
    const code1 = new accessCode(accessCode1)
    code1.save( e => {if (e) console.log(e)})
  }
  // 
// 
  // insertAccessCode(accessCode1);
  // insertAccessCode(accessCode2);
  // insertAccessCode(accessCode3);
// Generate access codes from XX099 through XX999



/* insertUser
 * purpose: Create an instance of a mongoose user schema and insert into the
 *          database based on hardcoded values. Useful for easily adding new
 *          users and can be repurposed for other schemas (i.e. Event).
 *   notes: Commented out since we don't want to insert a new User every time,
 *          but can be uncommented if anyone wants to easily insert a new User.
 */
// async function insertUser() {
//   const user1 = new User(userdata)
//   user1.save( e => {if (e) console.log(e)})
// }

// insertUser()


/* purpose: For testing updating the user's phone number in the database based
 * on hardcoded inputs. Finds the student using a hardcoded userName of 
 * student123 and updates with a hardcoded phone number of 111111, and logs 
 * both the old and new user.
 */
// async function run() {
//   try {
//       const oldUser = await User.findOneAndUpdate({ userName: "student123"}, { phone: "111111"});
//       console.log(oldUser)
//       const newUser = await User.find({ userName: "student123"});
//       console.log(newUser)
                  
//   } catch (e) {
//     console.log(e)
//   }
// }


/* param: data - stringified JSON object sent firom the frontend
 * purpose: Create a new user 
 */
// async function createUser(data: typeof User) {
//   try {
//     // const oldUser = await User.findOneAndUpdate({ userName: "student123"}, data);
//     // console.log("old user:")
//     // console.log(oldUser)
//     console.log("IN CREATE USER")
//     console.log(data)
//     // const newUser = new User(data);
//     // await newUser.save();
//     await data.save()
//     console.log("Updating user'info on the database")
//     // console.log(newUser)
//   } catch (e) {
//     console.log(e)
//   }
// }


/* param: data - stringified JSON object sent firom the frontend
 * purpose: Update the user document with name "student123" on MongoDB with data
 */
async function updateUser(data: object) {
  try {
    const oldUser = await User.findOneAndUpdate({ userName: "student123"}, data);
    console.log("old user:")
    console.log(oldUser)
    const newUser = await User.find(data);
    console.log("Updating user'info on the database")
    console.log(newUser)
  } catch (e) {
    console.log(e)
  }
}

/* param: userName - stringfied JSON object from the frontend
 * purpose: Reset the user document with userName on MongoDB with userdata defined above
 */
async function resetUser(userName: object) {
  try {
    const oldUser = await User.findOneAndUpdate(userName, userdata);
    console.log("old user:")
    console.log(oldUser)
    const newUser = await User.find({userName: "student123"});
    console.log("Resetting user's info")
    console.log(newUser)
  } catch (e) {
    console.log(e)
  }
}

/* To enabling the parsing in app.post method  */
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Access-Control-Allow-Origin", "*")
  next();
});

/* To enable across-network access */
const allowedOrigins = ['*'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello Potencia!");
});

/* To receive data sent from the frontend, and update the user'data on MongoDB 
 * Notes: 
 *  - avoid using empty app.use(), instead we need a json body parser
 *  - this is post instead of get method
 *  - tested using Postman: POST - Body - raw - JSON
 *  - tested using frontend axios.post request
 */
app.post("/schema", (req: Request, res: Response) => {
  console.log("in /schema")
  console.log(req.body)
  /* Update the userType of user's document on MongoDB based on the data sent from the frontend */
  updateUser(req.body);
  res.send("updated the userType")

})

// app.post("/onboard_user", (req: Request, res: Response) => {
//   console.log("in /onboard_user")
//   console.log(req.body)
//   const user = req.body;
//   try {
//     await user.save();
//   } catch (err) {
//     console.log(err);
//   }

//   // createUser(req.body);
//   // createUser(user);
//   res.send("created a new user")

// })

app.post("/onboard_user", async (req: Request, res: Response) => {
  console.log("in /onboard_user")
  console.log(req.body)
  const user = new User(req.body);
  // const user = req.body;
  // User newUser = user;
  
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  // createUser(req.body);
  // createUser(user);
  res.send("created a new user")
})

/* To receive userName from the frontend, and reset the user's info on MongoDB */
app.post("/reset", (req: Request, res: Response) => {
  console.log("in /reset")
  resetUser(req.body);
  res.send("done resetting the user's info")
})


// Find the user in the database and update their languages
app.post("/update_languages", async (req: Request, res: Response) => {
  const { email, languages } = req.body;
  // Find the user in the database with their email
  const user = await User.findOne({email: email});
  console.log(user)
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  // Update the user's languages to the new languages
  user.languages = languages;
  // Save the user to the database
  const saved = await user.save(); // throws error if no document with _id found
  console.log("/update_languages: saved new languages: ", languages);
  res.status(200).send("Reached update languages");
})

// Find the user in the database and update their interests
app.post("/update_interests", async (req: Request, res: Response) => {
  const { email, interests } = req.body;
  // Find the user in the database with their email
  const user = await User.findOne({email: email});
  console.log(user)
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  // Update the user's interests to the new interests
  user.interests = interests;
  // Save the user to the database
  const saved = await user.save(); // throws error if no document with _id found
  console.log("/update_interests: saved new interest: ", interests);
  res.status(200).send("Reached update interests");
})

// Find the user in the database and update their region
app.post("/update_region", async (req: Request, res: Response) => {
  const { email, region } = req.body;
  // Find the user in the database with their email
  const user = await User.findOne({email: email});
  console.log(user)
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  // Update the user's region to the new region
  user.location = region;
  // Save the user to the database
  const saved = await user.save(); // throws error if no document with _id found
  console.log("/update_region: saved new region: ", region);
  res.status(200).send("Reached update region");
})


app.post("/settings/update_email", async (req: Request, res: Response) => {
  console.log("in update email");
  const { email, new_email } = req.body;
  // const email_lowercase = new_email.toLowerCase() || '';
  // const { user, new_email } = req.body;
  // console.log("Email is: ", email_lowercase, new_email);
  
  // Find the user in the database with the old email
  const user = await User.findOne({email: email});
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  console.log("User before update: ", user);
  // Update the user's email to the new email
  user.email = new_email;
  // Save the user to the database
  const saved = await user.save(); // throws error if no document with _id found
  console.log("/settings/update_email: saved new email: ", new_email);
  res.status(200).send("Reached update email");
})

app.post("/settings/update_phone", async (req: Request, res: Response) => {
  const { phone, new_phone } = req.body;
  // Find the user in the database with the old email
  const user = await User.findOne({phone: phone});
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  // Update the user's email to the new email
  user.phone = new_phone;
  // Save the user to the database
  const saved = await user.save(); // throws error if no document with _id found
  console.log("/settings/update_phone: saved new phonenumber: ", new_phone);
  res.status(200).send("Reached update phone number");
})

app.post("/settings/update_password", async (req: Request, res: Response) => {
  console.log("in update_password");
  const { email, new_password } = req.body;
  console.log("new password is ", new_password);
  // Find the user in the database with the old email
  const user = await User.findOne({email: email});
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  function hashPassword(new_password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(new_password, 10, (err: any, hash: string) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  const hashedPassword = await hashPassword(new_password);
  user.password = hashedPassword;
  
  // Save the user to the database
  const saved = await user.save(); // throws error if no document with _id found
  console.log("/settings/update_password: saved new password: ", user.password);
  res.status(200).send("Reached update password");
})

app.post("/settings/update_temp_password", async (req: Request, res: Response) => {
  console.log("in update_temp_password");
  const { email, new_password } = req.body;
  console.log("new temp password is ", new_password);
  // Find the user in the database with the old email
  const user = await User.findOne({email: email});

  //console.log("Email: " + email);
  
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  console.log("before hashing password")

  function hashPassword(new_password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(new_password, 10, (err: any, hash: string) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }
  console.log("after hashing password")

  const hashedPassword = await hashPassword(new_password);
  user.tempPassword = hashedPassword; //save new password 
  console.log(user.tempPassword);
  
  // Save the user to the database
  const saved = await user.save(); // throws error if no document with _id found
  console.log("/settings/update_temp_password: saved temp hashed password: ", user.tempPassword);
  res.status(200).send("Reached update temp password");
})
 
app.post("/refreshBalance", async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);

  const user = await User.findOne({email: email});
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const transactions = user.transactions;
  const balance = user.balance;
  
  console.log("transactions: ", transactions);
  console.log("balance:", balance);

  const info = {
    user_transactions: transactions,
    user_balance: balance,
  }

  res.send(JSON.stringify(info));
})

/* Default route */
app.get("*", (req: Request, res: Response) => {
  res.send("PAGE NOT FOUND");
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8000`);
});

/* TODO: There seems to be errors with this? */
/* Accepts request from frontend, saves user-inputted data into database */
// app.post('/calendar/make_event', (req: Request, res: Response) => {
//   const {event1} = req.body;
//   console.log(event1);
//   const event = new Event ({event1});
//   event.save((err) => {
//     if (err) {
//       res.status(400).send('Backend insertion failed');
//     } else {
//       res.status(201).send('Event saved successfully!');
//     }
//   });
// });