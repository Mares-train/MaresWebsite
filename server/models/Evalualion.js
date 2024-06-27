import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const evaluationsSchema = Schema({
  companyId: { type: SchemaTypes.ObjectId, ref: 'Company', required: true },
  studentId: { type: SchemaTypes.ObjectId, ref: 'Student', required: true },
  comment: { type: String },
  numOfStars: { type: Number },
});

export default model("Evaluation", evaluationsSchema);
