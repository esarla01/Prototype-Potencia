import Availability, { availabilityInterface } from "../models/Availability";
import express from "express";
import {
  convertTimeDay,
  backendTimeToTime
} from "./timeZoneConverters";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import moment from "moment-timezone";
import User from "../models/User";
import Event from '../models/Event';
import { start } from "repl";

const router = express.Router();
const timezone = moment.tz.guess();

mongoose.connect(
  "mongodb+srv://potencia:F2NktSW5Yet0Axdd@potenciacluster.3ben6tu.mongodb.net/potenciaDB"
);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/schedule_session", async (req, res) => {
  

// // For testing: insert student user
// const defaultStudent = {
//     userType: "student",
//     userName: "CarloR",
//     firstName: "Carlo",
//     lastName: "Ralphaelo",
//     password: "password",
//     location: "Needham, MA",
//     interests: ["Baking", "Cooking", "Art", "Football"],
//     englishLevel: "intermediate",
//     university: "Tufts University",
//     tutorInfo: ["Jake Lattanzi", "Brianna Karmin"],
//     languages: ["Portuguese", "Spanish"],
//     phone: "7811113321",
//     email: "carlo.ralphaelo@gmail.com",
//   }
//    const newStudent = new User(defaultStudent);

//     newStudent.save()
//       .then(() => {
//         console.log('Default student inserted successfully!');
//       })
//       .catch((err) => {
//         console.error('Error inserting default student:', err);
//       }); 


  // get basic data
  console.log("BACKEND: scheduling session \n", "req.body: ", req.body);
  const day = req.body.day;
  const time = req.body.time;
  const studentName = req.body.studentName;
  const studentEmail = req.body.studentEmail;
  const tutorEmail = req.body.tutorEmail;
  const tutorFirst = req.body.tutorFirst;
  const tutorLast = req.body.tutorLast;


// // For testing: delete student user
// const result = await User.deleteOne({ email: studentEmail }).exec();
// console.log(result.deletedCount); // Logs the number of deleted users


  // If any of these are blank, then return a failure
  if (
    !day ||
    !time ||
    !studentName ||
    !studentEmail ||
    !tutorEmail
  ) {
    res.status(500).send({ error: "Missing a field in request" });
  }

  try {
    // await RemoveAvailability(tutorEmail, day, time);
    await AddTwelveWeeksOfEvents(studentEmail, tutorEmail, day, time, tutorFirst, tutorLast);
    res.status(200).send({ hello: "potencia" });
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

  // If it was a group session, return {TODO: group session not implemented!}
});



function getNextDay(day: string): Date {
  const today = moment().startOf('day');
  const nextDay = moment(day, 'dddd').startOf('day').add(7, 'days');
  if (nextDay.isSameOrBefore(today)) {
    nextDay.add(7, 'days');
  }
  return nextDay.toDate();
}


async function AddTwelveWeeksOfEvents(
  studentEmail: string,
  tutorEmail: string,
  day: string,
  time: string,
  tutorFirst: string,
  tutorLast: string
) {
  console.log(`Adding 12 weeks of events for student ${studentEmail} and tutor ${tutorEmail}`);
  
  // Parse the date and time string into a moment object
  const { newday: newDay, newtime: formatted_time } = convertTimeDay( time, moment().tz(timezone).format("Z"), day);

  // compute the date 
  // const newDate = getNextDay(newDay)
  const newDate = moment(newDay, 'dddd').startOf('day').toDate()
  const newTime = backendTimeToTime(formatted_time)

  const parsedTime = moment(newTime, 'hh:mma');
  newDate.setHours(parsedTime.hours());
  newDate.setMinutes(parsedTime.minutes());
  
  var startMoment = newDate
  console.log(`Start time: ${startMoment}`);
  
  // Create a list of 12 events, each one week apart
  const events = [];
  for (let i = 0; i < 12; i++) {
    startMoment = new Date(startMoment)
    
    const event = new Event({
      title: `Tutoring Session with ${tutorEmail}: ${i} of 12`,
      location: "Online",
      tutorFirst: new String(tutorFirst),
      tutorLast: new String(tutorLast),
      tutorEmail: new String(tutorEmail),
      startTime: startMoment,
      startTimeString: new String(newTime),
      repeat: {
        repeats: true,
        frequency: "Weekly",
      },
      invitees: [studentEmail, tutorEmail],
    });
    events.push(event);
    // make startMoment a new object with value equal to +7 days
    const startMoment2 = new Date(startMoment) 
    startMoment2.setDate(startMoment.getDate() + 7)
    startMoment = startMoment2;
  }

  console.log(`Saving ${events.length} events to the database`);

  // Save the events to the database
  await Promise.all(
    events.map(async (event) => {
      const savedEvent = await event.save();
      console.log("NEW START MOMENT: ", event.startTime)
      console.log(`Event ${savedEvent._id} saved to the database`);

      // Add the event to the tutor's calendar
      const tutor = await User.findOneAndUpdate(
        { email: tutorEmail },
        { $addToSet: { calendar: savedEvent._id } },
        { new: true }
      );
      if (!tutor) {
        console.log("cannot find tutor")
        throw new Error("Cannot find tutor");
      }

      console.log(`Event ${savedEvent._id} added to tutor's calendar`);

      // Add the event to the student's calendar
      console.log("finding student: ", studentEmail)
      const student = await User.findOneAndUpdate(
        { email: studentEmail },
        { $addToSet: { calendar: savedEvent._id } },
        { new: true }
      );
     if (!student) {
        console.log("cannot find student")
        throw new Error("Cannot find student");
     }

     console.log(`Event ${savedEvent._id} added to student's calendar`);
    })
  );

  console.log(`All events added successfully`);
}


// Helper: get all sessions on a given day +
async function fetchSessionsOn(
  day: string,
  tutorEmail: string
): Promise<availabilityInterface[]> {
  // current time zone Interval
  const { newday: startDay, newtime: startTime } = convertTimeDay(
    "12:00am",
    moment().tz(timezone).format("Z"),
    day
  );
  const { newday: endDay, newtime: endTime } = convertTimeDay(
    "11:59pm",
    moment().tz(timezone).format("Z"),
    day
  );

  let dayAvail: availabilityInterface[] = [];
  if (tutorEmail === "") {
    dayAvail = await Availability.find({
      $or: [
        { day: startDay, startingTime: { $gte: startTime } },
        { day: endDay, startingTime: { $lte: endTime } },
      ],
    });
  } else {
    dayAvail = await Availability.find({
      $or: [
        {
          tutorEmail: tutorEmail,
          day: startDay,
          startingTime: { $gte: startTime },
        },
        { tutorEmail: tutorEmail, day: endDay, startingTime: { $lte: endTime } },
      ],
    });
  }

  console.log(dayAvail);

  // Convert the session time back to the user's local time zone
  const availList = dayAvail.map((avail: availabilityInterface) => {
    const offset = moment().tz(timezone).format("Z");
    const reversedOffset = offset.startsWith("-")
      ? `+${offset.slice(1)}`
      : `-${offset.slice(1)}`;

    const { newday, newtime } = convertTimeDay(
      backendTimeToTime(avail.startingTime.toString()),
      reversedOffset,
      avail.day.toString()
    );
    return {
      day: new String(newday),
      startingTime: new String(newtime),
      location: avail.location,
      sessionType: avail.sessionType,
      firstName: avail.firstName,
      lastName: avail.lastName,
      tutorEmail: avail.tutorEmail,
    };
  });

  return availList;
}

// Fetch the earliest session times of each tutor on a given day
router.post("/fetch_tutors", async (req, res) => {
  console.log("BACKEND: fetching tutors\n", "req.body: ", req.body.day);
  console.log("Timezone: ", timezone);
  const day = req.body.day;

  // Get all sessions on the given day
  const availList = await fetchSessionsOn(day, "");

  console.log(availList);

  // data structure for selecting the earliest session time for each tutor
  interface earliestInterface {
    [email: string]: {
      startTime: string;
      location: string;
      sessionType: string;
      firstName: string;
      lastName: string
    };
  }

  // Filter out the earliest session that each tutor have and store in the result dictionary
  const earliestStartingTimesByTutor: earliestInterface = availList.reduce(
    (result: earliestInterface, availability: availabilityInterface) => {
      const { firstName, lastName, startingTime, location, sessionType, tutorEmail } =
        availability;
      const email: keyof earliestInterface = tutorEmail.toString();
      const tutorfirstName: string = firstName.toString();
      const tutorlastName: string = lastName.toString();
      const startTime: string = startingTime.toString();
      const loc: string = location.toString();
      const stype: string = sessionType.toString();

      if (!(email in result) || startingTime < result[email].startTime) {
        result[email] = {
          startTime: backendTimeToTime(startTime),
          location: loc,
          sessionType: stype,
          firstName: tutorfirstName,
          lastName: tutorlastName
        };
      }
      return result;
    },
    {}
  );
    console.log(earliestStartingTimesByTutor);
  // send to the frontend
  res.status(200).send(earliestStartingTimesByTutor);
});

// fetch all sessions of a tutor on a single day given the day and the tutor name
router.post("/fetch_sessions", async (req, res) => {
  console.log("Reached scheduling.ts fetch_sessions")
  console.log("BACKEND: fetching sessions\n");

  const day = req.body.day;
  // const tutor = req.body.tutorName;
  const email = req.body.tutorEmail;

  // get all sessions of a given tutor on a given day
  const availList = await fetchSessionsOn(day, email);

  console.log(availList);

  interface sessionType {
    tutorEmail: string;
    firstName: string,
    lastName: string,
    time: string;
  }

  const ret: sessionType[] = availList.map((rawsession) => {
    return {
      tutorEmail: rawsession.tutorEmail.toString(),
      firstName: rawsession.firstName.toString(),
      lastName: rawsession.lastName.toString(),
      time: backendTimeToTime(rawsession.startingTime.toString()),
    };
  });

  res.status(200).send(ret);
});

async function RemoveAvailability(
  tutorEmail: string,
  day: string,
  time: string
) {


  // Converting time zone
  const { newday: standardDay, newtime: standardTime } = convertTimeDay(time, moment().tz(timezone).format("Z"), day);

  console.log(`Removing.... availability for tutor ${tutorEmail} on ${standardDay} at ${standardTime} in Avail DB`)

  // remove from the Availability DB 
  try {
    await Availability.deleteOne({
      tutorEmail: tutorEmail,
      day: standardDay,
      startingTime: standardTime
    })
    console.log(`Removed availability for tutor ${tutorEmail} on ${standardDay} at ${standardTime} in Avail DB`)

  } catch (err) {
    console.log("Failed to delete the avail for tutor ${tutorEmail} on ${day} at ${time} in Avail DB. ", err)
  }

  // TODO: (add to the User's DB first when adding avail)remove from the User's DB
  // const filter = { email: tutorEmail };
  // const update = {
  //   $pull: { availability: { day: newDay, startingTime: newTime } },
  // };
  // const options = { new: true }; // return the updated document

  // try {
  //   const updatedTutor = await User.findOneAndUpdate(filter, update, options);
  //   if (!updatedTutor) {
  //     throw new Error(`Tutor with email ${tutorEmail} not found`);
  //   }
  //   console.log(
  //     `Removed availability for tutor ${tutorEmail} on ${day} at ${time}`
  //   );
  //   return updatedTutor;
    
  // } catch (err) {
  //   console.log(err)
  // }

  
}

export default router;
