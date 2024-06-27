import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const { Schema, model, SchemaTypes } = mongoose;
const studentSchema = Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, trim: true, minlength: 5, maxlength: 100, unique: true, required: true },
  password: { type: String, trim: true, minlength: 8, required: true },
  role: { type: String, default: "student" },
  dateOfBirth: { type: Date },
  city: { type: String },
  phoneNumber: { type: String },
  universityName: { type: String },
  college: { type: String },//4
  major: { type: String },
  academicLevel: { type: String },
  graduationDate: { type: Date },//6
  languages: { type: Array },//7
  discription: { type: String },//1
  cv: { type: String },//2
  certificates: { type: String },//3
  technicalSkills: { type: Array },
  jobRelatedSkills: { type: Array },
  tools: { type: Array },
  administrativeSkills: { type: Array },
  experiences: { type: String },
  companyName: { type: String },
  jobTitle: { type: String },
  companyLocation: { type: String },
  typeOfTheJob: { type: String },
  workDescription: { type: String },
  description: { type: String },
  address: { type: String },//وصف كتابي نفس الكومبني
  profilePic: { type: String },

});

studentSchema.methods.saveStudent = function () {
  return this.save(); // استخدام دالة save() المدمجة في Mongoose لحفظ البيانات في قاعدة البيانات
};

studentSchema.methods.getJWToken = function () {
  const key = "app";
  return jwt.sign({ id: this._id, role: this.role, email: this.email }, key, {
    expiresIn: "100d",
  });
};


export default model("Student", studentSchema);
