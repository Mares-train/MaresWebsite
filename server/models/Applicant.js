import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const applicantSchema= Schema({
  opportunityId: [{ type: SchemaTypes.ObjectId, ref: 'Opportunity' }],
  studentId: [{ type: SchemaTypes.ObjectId, ref: 'Student' }]
});

export default model("Applicant",applicantSchema);

