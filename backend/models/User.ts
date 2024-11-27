/* 
 * Last edited by Won Kim, Stephanie Xu on Nov 6, 2022
 *
 * Authors: Karen Bei, Stephanie Xu on Oct 29, 2022
 * 
 * Updated by Olivia Byun, Sarah Svahn, Clark Bolin on March 3, 2023
 *
 * Define a generic user schema for all types of users (admin, tutor, and student).
 * 
 * Fields that are mandatory: userType, userName, password, phone, UUID.
 * Fiedls needed to be unique: userName, UUID, phone, email.
 *
 * For student, we'll add credits, level (beginner/intermediate/advanced).
 * For tutor, we'll add access code (for sign-up), univeristy, 
 *                      badges, total hours tutoring, and availability.
 * 
 *
 * Combining the userSchema with eventSchema through the "calendar" field:
 *      we chose store by reference (by _id of events) because it's more
 *      space efficient and search efficient, comparing to the alternative 
 *      (i.e. embeded data structure). 
 *      When we want to query events by date range, we can populate the 
 *      "calendar" field of users, which would replace the array of _id's with 
 *      an array of actual event objects. 
 *      Since the "time" field of eventSchema is a BTREE index, the query 
 *      performance is optimized.
 *
 * 
 * Reference:
 * https://www.mongodb.com/docs/manual/indexes/#ref-b-tree-id2
 * https://mongoosejs.com/docs/guide.html#indexes
 * https://mongoosejs.com/docs/populate.html
 */

import mongoose, { Schema } from 'mongoose';

interface userInterface {
    userType: string,
    userName: string,
    password: string,
    phone: string,
    email: string,
    calendar: [Schema.Types.ObjectId]
}

/* User schema for all 3 types of users */
const userSchema = new Schema ({
    /************ Generics fields to all users **************/
    /* Each user will have a distinct _id (ObjectId) generated when instantiated */
    /* the three different user types that someone could choose from */
    userType: {
        type: String,
        enum: ['student', 'tutor', 'admin'],
        required: true
    },
    /* a unique username for each user that identifies them within the program*/
    userName: {
        type: String, 
        trim: true,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    /* each user must set up a password for their account with a min length of 5
        password uniqueness isn't necessary*/
    password: {
        type: String,
        minLength: 5,
        required: true
    }, 

    /* temporary password generated when a user forgets their password. Should
        be deleted after successful login */
    tempPassword: {
        type: String,
        minLength: 5,
    },
    
    /* a pfp for the user, TODO: limit the image size to be < 5MB on upload */
    profilePhoto: {
        data: Buffer, 
        contentType: String,
    }, 
    /* a unique phone number to be associated with each user 
        users are not assumed to have US phone numbers
        meaning they can have an international number and pass
        the numbers will be checked in the front end with the area codes
    */
    phone: {
        type: String,
        unique: true,
        required: true
    },
    /* a unique email for each user to make sure it matches a certain and valid format */
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    /* the location of where the user is based off of 
        is required bc users could be across the nation and be in different time zones */
    location: {
        type: String,
        // city: String, //TODO: make it work with city and state fields
        // state: String,
        // required: true
    },
    /* keywords for interests of an user 
        stored in an array bc a user can have multiple interests */
    interests: [String], 
    /* a user can choose what types of notifications they would like to receive 
        assumption: all notifications are in real time */
    notificationPreference: {
        text: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true }
    }, /* Users can select which way(s) they would like receive messages */
    /* the language(s) that the user is/are already familiar with */
    languages: [String],
    /* Each user has a calendar of a list of events  */
    calendar: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event'
    }],
    /*********** Fields that are only visible to students **********/
    /* Each student has a non-negative number of credits for purchasing classes */
    credits: {
        type: Number,
        minimum: 0
    },
    balance: {
        type: Number,
        minimum: 0
    },
    /* Indicating if the student is a beginner/intermediate/advanced learner in English 
        default setting to be enforced in the front end*/
    englishLevel: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"]
    },

    /* True if user would like to receive reminders, false if not */ 
    reminders: {
        type: Boolean
    }, 

    /* Description of what user would like to achieve with Potencia */ 
    achievements: {
        type: String
    },
    
    /*********** Fields that are only visible to tutors **********/
    /* Each student has a non-negative number of credits for purchasing classes */
    /* Access code for tutor sign-up */
    accessCode: { 
        type: String
    },
    /* All tutors have to be university students  */
    university: {
        type: String,
    },
    /* the badges (maybe awards) that the app gives to the tutors */
    badges: [String],
    /* the total amount of hours that the tutors have done in the app (and total hours spent learning) */
    totalHours: {
        type: Number,
        minimum: 0
    },
    /* the hours spent learning per month */
    monthlyHours: {
        type: Number,
        minimum: 0
    },
    tutorInfo: [String],
    /* Each tutor can mark a number of periods of times for their availability */
    availability: [{
        day: String,
        startTime: Date,
        endTime: Date,
    }],
    transactions: [{
        date: Date,
        description: String, /* Description of transaction: this is shown to user */
         /* Examples: 
         Group Session with Won K.
         Individual Session with Cecelia C. 
         Purchase of Credits 
         */
        transactionType: String,  /* Individual | Group | Purchase, where individual stands for individual session between a tutor and a learner, etc. */
        amount: Number, /* Can be positive or negative. 
                        Purchase Credits => Positive amount
                        Pay for lesson => negative amount */
    }]
})

const User = mongoose.model('User', userSchema);

export default User;
export { userInterface, userSchema };
