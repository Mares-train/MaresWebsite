import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const companySchema = Schema({
  email: { type: String, trim: true, minlength: 5, maxlength: 100, unique: true, required: true },
  password: { type: String, trim: true, minlength: 8, required: true },
  role: { type: String, default: "company" },
  phoneNumber: { type: String },
  companyName: { type: String },
  companySector: { type: String },
  companyField: { type: String },
  city: { type: String },
  commercialRegistrationNumber: { type: Number },
  firstNameOfTheOfficial: { type: String },
  lastNameOfTheOfficial: { type: String },
  jobTitle: { type: String },
  companyAddress: { type: String },
  descriptionCompany: { type: String },
  companyImage: { type: String },
  socialMedia: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  linkedIn: { type: String },
  address: { type: String },// اناقش البنات +وصف كتابي

});

companySchema.methods.getJWToken = function () {
  const key = "app";
  return jwt.sign({ id: this._id, role: this.role, email: this.email }, key, {
    expiresIn: "100d",
  });
};

export default model("Company", companySchema);
