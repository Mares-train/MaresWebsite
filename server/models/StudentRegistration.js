import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const StudentRegistrationSchema = Schema({
  opportunityId: {
    type: SchemaTypes.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  studentId: {
    type: SchemaTypes.ObjectId,
    ref: 'Student',
    required: true
  },
  status: {
    type: String,
    default: 'Pending',
  },
}, { timestamps: true });

export default model("Student-registration", StudentRegistrationSchema);
