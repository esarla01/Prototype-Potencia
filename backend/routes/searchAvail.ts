import Availability, { availabilityInterface } from '../models/Availability';
import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; // Required to get req.body to work
import moment from 'moment-timezone';
import { convertTimeDay, convertTime, computeEndTime } from './timeZoneConverters';
import User from '../models/User';

// Allows us to use routes in this folder. Make sure to import this file
// in backend/index.ts and write app.use('/calendar', calendar_erin);
const router = express.Router();

// TODO: Do we need to connect from the route????
mongoose.connect("mongodb+srv://potencia:F2NktSW5Yet0Axdd@potenciacluster.3ben6tu.mongodb.net/potenciaDB");

// Used for parsing body: DO NOT CHANGE
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

export type timepairType = {
    day: string,
    index: Number,
    startTime: string,
    sessionType: string,
    location: String,
    firstName: String,
    lastName: String,
    tutorEmail: String, /* Unique Username for querying */
}

// clear the avail database helper function
const deleteAllAvail = () => {
    Availability.deleteMany({}, function (err) {
        if (err) {
            console.error('Error deleting documents:', err);
        } else {
            console.log('All documents deleted successfully');
        }
    });
}

// Get the time zone
const timezone = moment.tz.guess();

router.post('/update_avail', async (req, res) => {
    console.log("BACKEND: ", req.body);

    // // For testint: insert the tutor's User
    // const defaultTutor = {
    //   userType: "tutor",
    //   userName: "TUTOR",
    //   firstName: "Rachel",
    //   lastName: "Greenwich",
    //   password: "password",
    //   location: "Medford, MA",
    //   interests: ["Teaching", "Cooking", "Art", "Football"],
    //   university: "Tufts University",
    //   tutorInfo: ["Jake Lattanzi", "Brianna Karmin"],
    //   languages: ["Portuguese", "Spanish"],
    //   phone: "000000",
    //   email: "RachelGreenwich@gmail.com",
    //   monthlyHours: 4,
    //   totalHours: 20,
    // };

    // const newTutor = new User(defaultTutor);

    // newTutor.save()
    //   .then(() => {
    //     console.log('Default tutor inserted successfully!');
    //   })
    //   .catch((err) => {
    //     console.error('Error inserting default tutor:', err);
    //   }); 

    const { timepairs } = req.body;

    console.log(timezone); // output: "America/Los_Angeles" 

    const availList = timepairs.map((pair: timepairType) => {
        const { newday, newtime } = convertTimeDay(pair.startTime, moment().tz(timezone).format('Z'), pair.day)
        return {
            day: new String(newday),
            startingTime: new String(newtime),
            location: pair.location,
            sessionType: new String(pair.sessionType),
            firstName: new String(pair.firstName),
            lastName: new String(pair.lastName),
            tutorEmail: new String(pair.tutorEmail)
        }
    })

    console.log("AvailList: ", availList);
    let errorOccurs = false
    try {
        availList.map(async (curr: availabilityInterface) => {
            const avail = new Availability(curr);
            console.log("Converted into model:", avail);
            try {
                avail.save((err: any) => {
                    // Check if the error was a duplicate key error
                    if (err && err.code === 11000) {
                        // Duplicate key error is acceptable
                    } else if (err) {
                        console.log("Error with database", err);
                        errorOccurs = true
                    } else {
                        console.log("Saved availability to database");
                    }
                })
                // Write to the User's schema to update their availability TODO: the avail._id is off
                const user = await User.findOneAndUpdate({ email: curr.tutorEmail }, { $addToSet: { availability: avail._id } }, { new: true });
                if (!user) {
                    console.log("Error: User not found");
                     errorOccurs = true
                } else {
                    console.log("User updated successfully");
                }
            } catch (err) {
                console.log(err)
            }
        })
    } catch (err) {
        console.log(err)
    }

    if (errorOccurs) {
        res.status(400).send();
    } else {
        res.status(200).send({response: 'Availability saved successfully!'})
    }

});




router.post('/delete_avail', async (req, res) => {
    let { day, tutorEmail } = req.body
    console.log(tutorEmail)
    const { newday: startDay, newtime: startTime } = convertTimeDay("12:00am", moment().tz(timezone).format('Z'), day)
    const { newday: endDay, newtime: endTime } = convertTimeDay("11:59pm", moment().tz(timezone).format('Z'), day)

    try {
        await Availability.deleteMany({
            tutorEmail: tutorEmail,
            $or: [
                { day: startDay, startingTime: { $gte: startTime } },
                { day: endDay, startingTime: { $lte: endTime } },
            ]
        });
        res.sendStatus(200)
        console.log(`Deleted all availabilities between (${startDay}, ${startTime}) and (${endDay}, ${endTime}) for tutor ${tutorEmail}.`);
    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }

})

export default router;