import mongoose from 'mongoose';
const { Schema } = mongoose;

const accessCodeSchema = new Schema({
  code: {
    type: String,
    unique: true,
    // validate: {
      // validator: function(v: string | any[]) {
        // return v.length === 5;
      // },
      // message: (props: { value: any; }) => `${props.value} must be 5 characters long`
    // },
  },
  used: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  // usedBy: {
    // type: String,
  // },
});

accessCodeSchema.index({ used: 1, dateCreated: 1 }, { unique: true });

const accessCode = mongoose.model('accessCode', accessCodeSchema);
export default accessCode;
