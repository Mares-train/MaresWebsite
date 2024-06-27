import mongoose from 'mongoose';

const FAQsSchema = mongoose.Schema({
  answersId:{type: Number},
  questionsId:{type: Number},
  answers :{type: String},
  questions: {type: String},
});

export default mongoose.model("FAQs",FAQsSchema);
