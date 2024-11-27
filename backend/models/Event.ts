/* Event.ts
 * Potencia
 * 
 * by Andrew and Olivia
 * Last modified: 10/30/22
 * 
 * This file defines a single calendar event schema, storing informational
 * data such as title, invitees, notes, and a file. An event also holds
 * logistical data such as location, time, alert(s), repeat, and travel time.
 * An event can also be deleted.
 *
 * TODO: we want to make the time field => timeInterval instead => making sure they won't overlap
 * TODO: store the starting time as a secondary index for efficient query
 *
 */

import mongoose from 'mongoose';
const { Schema } = mongoose;

interface eventInterface {
  title: String;
  location: String;
  tutorFirst: String,
  tutorLast: String,
  tutorEmail: String,
  startTime: Date;
  startTimeString: String;
  alert: Date[];
  repeat: { repeats: boolean; frequency: 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly' };
  travelTime?: { hours: number; minutes: number };
  invitees: [String];
  notes?: string;
  file?: Buffer;
  delete?: boolean;
}


const eventSchema = new Schema ({
        title: {
                type: String, /* event title */
                trim: true,
                required: true
        },

        location: { 
                type: String, /* address */
                trim: true,
                required: true
        },

        tutorFirst: {
                type: String,
                required: true,
        },

        tutorLast: {
                type: String,
                required: true
        },

        tutorEmail: {
                type: String,
                required: true
        },

        meetingLink: {
                type: String,
                // required: true
        },

        /* time: type - Used to store the time for the scheduled tutoring 
        session; default - The default (initial time) is set to today */
       
        startTime: {
                type: Date,
                default: Date.now, /* For testing TBD */
                index: true,
                required: true
        },


        startTimeString: {
                type: String, // in backendtime format
                required: true
        },
               
        
        alert: [Date], /* Stores an array of Dates */

        // /* repeats: true if event repeats, false otherwise; frequency is
        // "daily", "weekly", "biweekly", or "monthly" */
        // repeat: { 
        //         repeats: Boolean, 
        //         frequency: {
        //                 type: String, 
        //                 enum: ["Daily", "Weekly", "Biweekly", "Monthly"]
        //         } 
        // },
        
        /* optional travel time to location in hours and minutes */
        travelTime: { hours: Number, minutes: Number },

        /* invitees: list of the UUID of all invitees */
        invitees: [String], 

        notes: {
                type: String, /* optional notes */
                trim: true
        },
        file: Buffer, /* optional attachment - must not cause the document to 
                         be larger than 16MB*/
        
        /* delete: true if the user wants to delete the event, false otherwise */
        delete: Boolean 
});

/* create event model */
const Event = mongoose.model('Event', eventSchema);
export default Event;
export { eventInterface, eventSchema };