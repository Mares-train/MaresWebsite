import { Buffer } from "buffer";
import multer from "multer";
import path from "path";
import fs from 'fs'
import Student from '../models/Student.js';
import Opportunity from '../models/Opportunity.js';
import StudentRegistration from '../models/StudentRegistration.js';
import { getStudentApplicants } from './applicantController.js';
import { v4 as uuid } from 'uuid';

export const addOpportunity = async (req, res) => {
   const data = req.body;
   try {
      const existingOpportunity = await Opportunity.findOne({ companyId: data.companyId, opportunityName: data.opportunityName });
      console.log('existingOpportunity: ', existingOpportunity);
      if (existingOpportunity) {
         console.log("opportunity dosen't saved")
         return res.status(400).json({ message: "لقد قمت بإضافة هذه الفرصة مسبقا" });
      }
      const opp = await Opportunity.create(data)
      return res.status(200).json({ opp });
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const getAllOpportunities = async (req, res) => {
   try {
      const opp = await Opportunity.find()
         .populate("students companyId")
         .sort({ createdAt: -1 });

      return res.status(200).json({ opp });
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         return res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         return res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const searchOpportunity = async (req, res) => {
   let { search } = req.query;
   try {
      let match = {};

      if (search) {
         match.$or = [
            { opportunityName: { $regex: `.*${search}.*`, $options: "i" } },
            { duties: { $regex: `.*${search}.*`, $options: "i" } },
            { description: { $regex: `.*${search}.*`, $options: "i" } },
            { city: { $regex: `.*${search}.*`, $options: "i" } },
            { trainingType: { $regex: `.*${search}.*`, $options: "i" } },
         ];
      }

      const opp = await Opportunity.find(match)
         .populate("students companyId");

      return res.status(200).json({ opp });
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         return res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         return res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const registerOpportunity = async (req, res) => {
   const { id } = req.query;
   try {
      let user = await Student.findById(req.userId);
      if (!user) {
         return res.status(404).json({ message: "لم يتم العثور على حساب. الرجاء تسجيل الدخول كطالب" })
      }
      if (user.role !== "student") {
         return res.status(400).json({ message: "هذا الحساب غير مسجل كطالب" })
      }
      const opp = await Opportunity.findById(id);
      if (!opp) {
         return res.status(404).json({ message: "لم يتم العثور على فرصة" })
      }
      let alreadyExists = await StudentRegistration.findOne({
         studentId: user._id,
         opportunityId: opp._id,
      })
      if (alreadyExists) {
         return res.status(400).json({ message: "تقدمت بالفعل لهذه الفرصة" })
      }

      let registration = await StudentRegistration.create({
         opportunityId: opp._id,
         studentId: user._id
      });
      opp.students = [...opp.students, user._id];
      await opp.save();

      return res.status(200).json({ data: registration, msg: "تمت إضافة التسجيل" });
   } catch (error) {
      console.log(error.message)
      if (error.name === 'ValidationError') {
         return res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         return res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const updateOpportunity = async (req, res) => {
   const updateData = req.body;
   const { _id } = req.params;
   console.log('req.body: ', req.body)
   console.log('_id: ', _id)
   Opportunity.findOneAndUpdate(
      _id,
      updateData, // opportunity data to be updated from req.body such as Certificates, CollegeName etc...
      { new: true }, // to return the opdated object
      (err, doc) => { // CallBack function
         if (err) {
            console.log("حدث خظأ ما!");
            return res.status(400).json({ message: 'حدث خطأ من الخادم' });
         } if (!doc) {
            return res.status(404).json({ message: "الفرصة غير موجودة" });
         }
         console.log("تم تغيير البيانات بنجاح :", doc);
         res.status(200).json({ message: 'تم التحديث بنجاح' });
      }
   );
};
// // delete profile

export const deleteOpportunity = async (req, res) => {
   try {
      await Opportunity.deleteOne(Opportunity._id);
      return res.status(200).json({ message: "تم حذف الفرصة بنجاح" });

   } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
   };
};

export const getOpportunities = async (req, res) => {
   try {
      const data = await Opportunity.findOne();
      return res.status(200).json(data);

   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const getCompanyOpportunities = async (req, res) => {
   const { companyId } = req.params;
   try {
      const data = await Opportunity.find({ companyId });
      return res.status(200).json(data);

   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const getStudentOpportunities = async (req, res) => {
   try {
      const applicants = await getStudentApplicants(req, res)
      const data = [];
      for (const key in applicants) {
         const applicant = applicants[key];
         data.push(await Opportunity.find({ _id: applicant.opportunityId }));
      }
      return res.status(200).json(data);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const getOpportunity = async (req, res) => {
   const { id } = req.params;
   const { status } = req.query;

   try {
      let registration = await StudentRegistration.find({
         opportunityId: id,
         status
      }).populate("opportunityId studentId")
      console.log(registration);

      return res.status(200).json(registration);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const acceptRegistration = async (req, res) => {
   const { id } = req.query;

   try {
      let registration = await StudentRegistration.findByIdAndUpdate(id, {
         status: "Accepted"
      });

      console.log(registration);

      return res.status(200).json({ msg: "قبلت" });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const rejectRegistration = async (req, res) => {
   const { id } = req.query;

   try {
      let registration = await StudentRegistration.findByIdAndUpdate(id, {
         status: "Rejected"
      });

      console.log(registration);

      return res.status(200).json({ msg: "قبلت" });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const folderPath = "./public/drugs";
      // Check if the "drugs" folder exists
      if (!fs.existsSync(folderPath)) {
         // Create the "drugs" folder if it doesn't exist
         fs.mkdirSync(folderPath, { recursive: true });
      }
      cb(null, folderPath);
   },
   filename: function (req, file, cb) {
      req.uuid = uuid();
      console.log(req.uuid, "253");
      cb(null, `${req.uuid}.jpg`);
   },
});
const fileFilter = function (req, file, cb) {
   if (file.mimetype == "image/jpeg" || file.mimetype == "image/png")
      return cb(null, true);
   req.imgIsNotOk = 1;
   cb(null, false);
};
// Initialize multer upload
export const upload = multer({
   storage,
   limits: { fileSize: 20971520, files: 1 },
   fileFilter,
});
const uploadDir = 'public';
if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir, { recursive: true });
}

export const uploadImage = async (req, res) => {
   const { base64String } = req.body;
   if (!base64String) {
      return res.status(400).send('No file uploaded.');
   }

   const matches = base64String.match(/^data:(.+);base64,(.+)$/);
   if (!matches) {
      return res.status(400).send('Invalid base64 string.');
   }

   const mimeType = matches[1];
   const base64Data = matches[2];
   const buffer = Buffer.from(base64Data, 'base64');

   // Generate a unique filename
   const filename = `image-${Date.now()}.png`;
   const filePath = path.join(uploadDir, filename);

   // Save the file to the uploads directory
   fs.writeFile(filePath, buffer, (err) => {
      if (err) {
         return res.status(500).send('Error saving file.');
      }

      // Save file information to MongoDB
      // const image = new Image({
      //    filename,
      //    path: filePath,
      //    base64: base64String,
      // });
      console.log({
         filename,
         path: filePath,
      });
      return res.status(200).json({ img: filePath })
      // image.save()
      //    .then(() => res.json({ message: 'File uploaded and stored successfully', path: filePath }))
      //    .catch((err) => res.status(500).json({ error: 'Error storing file', details: err }));
   });
}

