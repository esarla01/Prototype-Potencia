import Event from '../models/Event';
import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose';
import { profile } from 'console';
import bodyParser from 'body-parser'; // Required to get req.body to work

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

// app.post('/calendar/scheduling', (req, res) => {
//         const { input1, input2, input3 } = req.body;
//         const data = new Data({ input1, input2, input3 });
//         data.save((err) => {
//           if (err) {
//             res.status(500).send(err);
//           } else {
//             res.status(201).send('Data saved successfully!');
//           }
//         });
// });

router.get('/example', (req, res) => {
  res.send('Hello World!');
});

router.post('/make_event', (req, res) => {
  console.log(req.body);
  const {event1} = req.body;
  const event = new Event (event1);
  event.save((err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('Event saved successfully!');
    }
  });
});

export default router;