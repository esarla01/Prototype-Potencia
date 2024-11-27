import express from "express";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import moment from "moment-timezone";

import {
  convertTime,
  convertTimeDay,
  backendTimeToTime
} from "./timeZoneConverters";
import User, { userInterface } from '../models/User';
import Event, { eventInterface} from '../models/Event';

const router = express.Router()
const timezone = moment.tz.guess()

mongoose.connect(
  "mongodb+srv://potencia:F2NktSW5Yet0Axdd@potenciacluster.3ben6tu.mongodb.net/potenciaDB"
);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/fetch_sessions", async (req, res) => {
    console.log("fetch sessions route reached");
    const date: Date = req.body.date
    const email = req.body.userEmail
    console.log(email)

    // convert time zone 
    const diff = moment().tz(timezone).format("Z")
    const [diffHour, diffMinute] = diff.split(':').map(Number);
    const standardStart = new Date(new Date(date).getTime() + diffHour * 60 * 60 * 1000)
    const standardEnd = new Date(standardStart.getTime() + 24 * 60 * 60 * 1000)
    console.log("fetch sessions on: ", date, diffHour, "\nstandardStart: ", standardStart, standardEnd)

    try {
      var user = await User.findOne({ email: email }).populate('calendar');
      if (user) {
        console.log("found user")
        const lessons = user.calendar.filter((event: any) => {
          const eventStartTime = new Date(event.startTime);
          return eventStartTime >= standardStart && eventStartTime < standardEnd;
        });
        console.log(lessons)

        type lessonType = {
          title: string,
          location: string, 
          startTime: Date,
          startTimeString: string,
          alert: Date[],
          repeat: { repeats: boolean; frequency: 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly' },
          invitees: [String]
        }
        
        type sessionType = {
          tutorEmail: string,
          tutorFirst: string,
          tutorLast: string,
          location: string,
          startTime: string,
          endTime: string,
         }

        // convert the list to the frontend version
        const sessionsToday:sessionType[] = lessons.map((lesson: any, i) => {
          console.log(lesson.startTimeString)
          const reversedOffset = diff.startsWith("-")
            ? `+${diff.slice(1)}`
            : `-${diff.slice(1)}`;

          const startTime = backendTimeToTime(convertTime(lesson.startTimeString, reversedOffset))
          const endTime = backendTimeToTime(convertTime(startTime, "01:00"))
          console.log("start: ", startTime, "end: ", endTime)

          return ({
            tutorEmail: lesson.tutorEmail,
            tutorFirst: lesson.tutorFirst,
            tutorLast: lesson.tutorLast,
            location: lesson.location,
            startTime: startTime,
            endTime: endTime, 
          })
        })

        console.log(sessionsToday)

        res.status(200).send(sessionsToday)
      } else {
        console.log("user not found")
        res.status(500).send()
      }
    } catch (err) {
      console.log("failed to fetch sessions, ", err)
      res.status(500).send()
    }



    // User.findOne({ email: req.body.userEmail })
    // .populate({
    //     path: 'calendar',
    //     match: { startTime: { $gte: standardStart, $lt: standardEnd } }
    // })
    // .exec((err: any, user: userInterface) => {
    // if (err) {
    //   console.error(err);
    //   return;
    // }

    // const lessons = user.calendar.filter(event => {
    //   const start = new Date(event.startTime);
    //   return start.getFullYear() === date.getFullYear() && start.getMonth() === date.getMonth() && start.getDate() === date.getDate();
    // });

    // console.log(lessons);
    // });
})

export default router;