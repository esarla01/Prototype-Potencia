import mongoose, { Schema } from 'mongoose';

// Each session will be an hour long, so only start time is needed
// The universal time zone we use in database will be GMT+0, Coordinated Universal Time

interface availabilityInterface {
    day: String,
    startingTime: String,
    location: String,
    sessionType: String,
    firstName: String,
    lastName: String,
    tutorEmail: String
}

const availabilitySchema = new Schema<availabilityInterface> ({
    day: {
        type: String,
        required: true
    },

    startingTime: { //e.g. For query convenience, time string is stored like "am00:00", "pm10:00", refer to the backendTime in TimeBox.tsx in the frontend
        type: String,
        requried: true
    },

    location: {
        type: String,
        required: true
    },

    sessionType: {
        type: String,
        enum: ["single", "group"],
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    

    tutorEmail: {
        type: String,
        required: true,
    }

})

availabilitySchema.index(
  { day: 1, startingTime: 1, location: 1, sessionType: 1, tutorName: 1 , tutorEmail: 1},
  { unique: true } // Consideration for group sessions: Remove this requirement
);

const Availability = mongoose.model('Availability', availabilitySchema);

export default Availability;
export { availabilityInterface, availabilitySchema };