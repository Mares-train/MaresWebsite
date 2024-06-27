import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const Opportunitieschema = new Schema({
  name: {
    type: String
  },
  companyId: {
    type: SchemaTypes.ObjectId,
    ref: 'Company',
    required: true
  },
  generalSpecializationField: {
    type: String
  },
  specificSpecializationField: {
    type: String
  },
  opportunityName: {
    type: String
  },
  trainingType: {
    type: String
  },
  city: {
    type: String
  },
  customizedTrainingPlans: {
    type: Object
  },
  trainingDuration: {
    type: Number
  },
  semester: {
    type: String
  },
  startDates: {
    type: Date
  },
  endDates: {
    type: Date
  },
  workingDays: {
    type: [String],  // Define the type as an array of strings
  },
  workingHours: {
    type: [String],  // Define the type as an array of strings
  },
  trainingHours: {
    type: Number
  },
  trainingPlan: {
    type: String
  },
  numberOfTrainees: {
    type: Number
  },
  trainingBonus: {
    type: Number
  },
  description: {
    type: String
  },
  duties: {
    type: String
  },
  img: {
    type: String,
    default: "drugs/no-image.jpg"
  },
  benefits: {
    type: String
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
}, { timestamps: true });

export default model("Opportunity", Opportunitieschema);
