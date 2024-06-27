import Applicant from '../models/Applicant.js';

export const updateApplicant = async (req, res) => {
   const updateData = req.body;
   const { _id } = req.params;
   console.log('req.body: ', req.body)
   console.log('_id: ', _id)
   Applicant.findOneAndUpdate(
      _id,
      updateData,
      { new: true },
      (err, doc) => {
         if (err) {
            console.log("حدث خظأ ما!");
            return res.status(400).json({ message: 'حدث خطأ من الخادم' });
         } if (!doc) {
            return res.status(404).json({ message: "الطلب غير موجود" });
         }
         console.log("تم تغيير البيانات بنجاح :", doc);
         res.status(200).json({ message: 'تم التحديث بنجاح' });
      }
   );
};

export const deleteApplicant = async (req, res) => {
   try {
      await Applicant.deleteOne(Applicant._id);
      return res.status(200).json({ message: "تم حذف الطلب بنجاح" });

   } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
   };


};

export const addApplicant = async (req, res) => {
   const applicant = req.body;
   try {
      const existingApplicant = await Applicant.findOne({ studentId: applicant.studentId });
      if (existingApplicant) {
         return res.status(400).json({ message: 'الطالب مُسجل مسبقا' });
      }
      const result = await Applicant.create(applicant);
      return res.status(200).json(result);
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         return res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const getStudentApplicants = async (req, res) => {
   const { studentId } = req.params;
   try {
      const applicants = await Applicant.find({ studentId });
      if (!applicants) {
         return res.status(404).json({ message: 'لا توجد طلبات مسجلة' });
      }
      res.status(200).json(applicants);
   } catch (error) {
      res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const getOpportunityApplicants = async (req, res) => {
   const { opportunityId } = req.params;
   try {
      const applicants = await Applicant.find({ studentId: opportunityId });
      if (!applicants) {
         return res.status(404).json({ message: 'لا توجد طلبات مسجلة' });
      }
      res.status(200).json(applicants);
   } catch (error) {
      res.status(500).json({ message: 'خطأ في الإتصال' });
   }

}
export const getApplicants = async (req, res) => {
   try {
      const applicants = await Applicant.find();
      if (!applicants) {
         return res.status(404).json({ message: 'لا توجد طلبات مسجلة' });
      }
      res.status(200).json(applicants);
   } catch (error) {
      res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

