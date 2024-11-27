import express from 'express';
import mongoose from 'mongoose'; 
import User, { userInterface } from '../models/User';
import Event from '../models/Event';
import bodyParser from 'body-parser'; 
import accessCode from'../models/AccessCode';


console.log("Build success");
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


router.post('/get_accessCode', async (req, res) => {
        console.log("get Access Code")
        const { pin } = req.body;
        try {
          const foundData = await accessCode.findOne({ code: pin });
          if (foundData) {  
              console.log(foundData.used);
            if (!foundData.used) {    
              foundData.used = true; // say this code has been used
              await foundData.save();
              return res.status(200).json({success: true})
            } else {
              return res.status(404).json({ success: false, message: "This code has already been used!" });
            }  
          }
          return res.status(500).json({ success: false, message: "This access code does not exist!"});
        } catch (error) {
          //console.error(error);
          return res.status(500).json({ message: error});
        }
});

router.get('/get_accessCode1', async (req, res) => {
        console.log("anything");
        res.send({success: true});
});


export default router;