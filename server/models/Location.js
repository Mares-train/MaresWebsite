import mongoose from 'mongoose';

const LocationsSchema = mongoose.Schema({
  //CompanyID: {type: Number},
  latitude: {type: Number},
  longitude: {type: Number},
  address: {type: String},//وصف كتابي
});

export default mongoose.model("Location",LocationsSchema);
