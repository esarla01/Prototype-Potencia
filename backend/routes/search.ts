import express from 'express';
import User from "../models/User";
import Availability from "../models/Availability";
const router = express.Router();
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://potencia:F2NktSW5Yet0Axdd@potenciacluster.3ben6tu.mongodb.net/potenciaDB");

router.get("/test", async (req, res) => {
    // await createNewAvailability();
    res.send("OK");
})
/* ****************************** TODO: Testing availability ************************* */
async function createNewAvailability() {
    const testAvailability = {
        startingTime: new Date('2023-03-01T09:00:00Z'),
        location: {
          city: 'New York',
          state: 'NY'
        },
        tutorId: new mongoose.Types.ObjectId(),
        sessionType: 'single',
        tutorName: 'John Doe'
      };
    const availability = new Availability(testAvailability);
    await availability.save();
}


async function searchByDate(data: Date) {
    try {
        User.find({
            match: {
                "availability.startTime": { $gte : "" }
            }
        })
        .exec((err, user) => {
            if (err) return err;
            console.log(user)
        })
         
  
    } catch (e) {
      console.log(e)
    }
  
  }
  
  
  /* ****************************** TODO: API for availability ************************* */
  
  
  
  
  
  
  
  

export default router;

// Fact: Sessions are 1 hour. (Doucment this everywhere it matters)
// (medium) Sub-task: Search database for availability, group by DATE & LOCATION
// (hard) Sub-task: From a frontend request (see frontend design), create a list of availability and add to database
// (hard) Sub-task: From a frontend request (see frontend design) for a deleted availability or scheduled session, query for all availability that needs to be removed, and remove them from the database
// (easy) Sub-task: Send to frontend a list of availability on a given day for a given location (or all locations) 

// Task: Change availability to include DAYS OF WEEK (schema change)
// Task: Add to settings, onboarding: timezone
// Invariant: All events are assumed to be in +0 timezone in database
// Task: When rendering a lesson you have scheduled or a possible lesson to schedule, offset the time by timezone
// Task: For Viewing a day's availability (Monday), check for Sunday & Tuesday, and check if any are in the offset timezone. For Monday, make sure all are still in the timezone :D 
// Task: Frontend of "change availability"
// Task: Tell Won & Alex to add a "change availability" profile page option based on user isTutor, and write "MyTutors" vs "MyLearners"
// Task: Update availability save button on frontend requests to backend, saves to database offset based on timezone (set to timezone +0). Deletes old availability for that day from the tutor <get access to their old availability>
// Task: Schedule a meeting button deletes from database availability (do last)
// Task: Show the list of available meetings on the frontend based on timezone.

