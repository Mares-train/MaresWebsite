import Evolution from '../models/Evalualion.js';
import Student from '../models/Student.js';
import sha256 from 'js-sha256';

export const addEvaluation = async (req, res) => {
   try {
      let body = req.body;
      const evaluation = await Evolution.create(body);
      return res.status(200).json({ msg: "تمت إضافة التعليق بنجاح" });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const getEvaluations = async (req, res) => {
   const { companyId } = req.params;
   try {
      const evaluations = await Evolution.find({ companyId })
         .populate("studentId");
      // if (evaluations.length == 0) {
      //    return res.status(404).json({ message: "لم يتم العثور على التعليقات" });
      // } else {
      return res.status(200).json({ evaluations });
      // }
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}
