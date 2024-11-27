import express, { Request, Response } from "express";
import bodyParser from 'body-parser'; // Required to get req.body to work
import User from '../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import e from "express";

mongoose.connect("mongodb+srv://potencia:F2NktSW5Yet0Axdd@potenciacluster.3ben6tu.mongodb.net/potenciaDB");
const saltRounds = 10; // Used for hashing the password.


const router = express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())



router.post("/signin", async (req: Request, res: Response) => {
    console.log("Sign in route reached");
    const { email, password } = req.body;
    const email_lowercase = email.toLowerCase() || '';
    console.log("email_lowercase", email_lowercase)
    // Lookup in MongoDb the user with the given email
      
    const user = await User.findOne({email: email_lowercase}); // TODO: check if errors (such as database not connected) do not crash server

    if (!user) {
        return res.status(400).send("No user exists with that email");
    }
    console.log("user email", user.email)
    console.log("password: ", password);
    console.log("user password", user.password);
    // Compare the password with the hashed password

    /* only look for a temporary password if we've got one; either is valid
       for login (though temp will get deleted after they log in once with 
       a true password!) */

    const validPassword = (await bcrypt.compare(password, user.password)
                           || (user.tempPassword ? 
                            await bcrypt.compare(password, user.tempPassword) 
                            : false));

    console.log(validPassword);
    if (!validPassword) {
        return res.status(400).send("Invalid password");
    }
    /* we remove their temp password on first successful login so they're 
       incentivised to reset it right away */
    if (user.tempPassword) {
        console.log("!!!!!!!!!!!!!!!! in tempPassword if block");
        user.set('tempPassword', undefined);
        await user.save();
    }

    // return the user
    res.send(user);

});
// const response  = await fetch(`${backend_url}/authentication/user`, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({email: value.email}),
// });

router.post('/user', async (req: Request, res: Response) => {
    console.log("Sign in route reached");
    const { email } = req.body;
    if (!email || email == "") {
        return res.status(400).json({error: "No email provided"});
    }
    const email_lowercase = email.toLowerCase() || '';
    console.log("email_lowercase", email_lowercase)
    // Lookup in MongoDb the user with the given email
      
    const user = await User.findOne({email: email_lowercase}); // TODO: check if errors (such as database not connected) do not crash server

    if (!user) {
        return res.status(400).send("No user exists with that email");
    }
    console.log("user email", user.email)


    /* we remove their temp password on first successful login so they're 
       incentivised to reset it right away */
    if (user.tempPassword) {
        console.log("!!!!!!!!!!!!!!!! in tempPassword if block");
        user.set('tempPassword', undefined);
        await user.save();
    }
// return the user
    res.send(user);

});

/* Function to create new user from username, password, phone number */


async function createUser(user: any) {
    const email = user.userName.toLowerCase() || '';
    bcrypt.hash(user.password, saltRounds, (err: any, hash: string) => {
      if (err) {
        console.log(err);
        return err;
  
      }
      const newUser = new User ({
        userType: user.userType,
        userName: email, // TODO: Is this field required?
        firstName: user.firstName,
        lastName: user.lastName,
        password: hash,
        location: user.location,
        interests: user.interests,
        reminders: user.reminders,
        achievements: user.achievements,
        languages: user.languages,
        phone: user.phone,
        email: email,
        monthlyHours: 0,
        totalHours: 0,
        credits: 0,
        balance: 0,

      })
      
      newUser.save(function(e) {
        if (e) {
          console.log("here")
          console.log(e)
        }
      })
  
      return newUser;
      
    })
  }
  

/* To receive username, password, phoneNumber from frontend, create new user on MongoDB */
router.post("/create", async (req: Request, res: Response) => {
    console.log("create")
    const response = await createUser(req.body);
    res.send(response);
  })


  
/* Possible code to be used to subtract credits and delete an event -- would just have to make
sure this is done for all events that have times prior to the current time */

/*
  
  router.post('/delete-event', async (req: Request, res: Response) => {
    try {
      const { userId, eventId } = req.body;
  
      // Find the user in the database
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the event in the database
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Check if the user has enough credits to delete the event
      if (user.credits < 10) {
        return res.status(403).json({ error: 'User has insufficient credits' });
      }
  
      // Subtract 10 credits from the user's account
      user.credits -= 10;
      await user.save();
  
      // Delete the event
      await event.remove();
  
      // Return a success message
      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  });

  */


export default router;
