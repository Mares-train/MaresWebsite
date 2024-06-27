import StudentRegistration from '../models/StudentRegistration.js';
import Student from '../models/Student.js';
import sha256 from 'js-sha256';
import path from "path";
import fs from 'fs'

export const signin = async (req, res) => {
   const { email, password } = req.body;
   try {
      const student = await Student.findOne({ email: email });
      if (!student) {
         return res.status(404).json({ message: 'الحساب غير موجود' });
      }
      const hashedPassword = sha256(password).toString();
      if (hashedPassword !== student.password) {
         return res.status(400).json({ message: 'خطأ في كلمة المرور' });
      }
      let jwtoken = student.getJWToken();

      return res.status(200).json({ _id: student._id, email: student.email, role: student.role, jwtoken });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}
// // Signup

export const signup = async (req, res) => {
   const student = req.body;
   console.log("student", student);
   try {
      const result = await Student.create(student);
      let jwtoken = result.getJWToken();
      let data = { _id: result._id, email: result.email, role: result.role, jwtoken }
      res.status(200).json(data);
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         res.status(400).json({ message: error.message });
      } else if (error.code && error.code === 11000) {
         res.status(400).json({ message: 'الحساب مسجل مسبقا' });
      } else {
         res.status(500).json({ message: 'خطأ في الاتصال' });
      }
   }
};

export const resetPassword = async (req, res) => {
   const { email, newPassword } = req.body;
   try {
      const existingStudent = await Student.findOne({ email });
      if (!existingStudent)
         return res.status(404).sed("الحساب غير مسجل مسبقا!");

      await Student.update(student._id, { password: newPassword });//ارجع له
      return res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
   }
   catch (error) {
      console.log(error);
      return res.status(500).json({ message: "حدث خطأ ما!" });
   }
};

export const updateStudent = async (req, res) => {
   const updateData = req.body;
   const { id } = req.params;
   try {

      let updatedData = await Student.findOneAndUpdate({ _id: id }, updateData, { new: true });
      if (updatedData) {
         return res.status(200).json({ message: 'تم التحديث بنجاح' });
      }
   } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: error.message })
   }
};
export const deleteStudent = async (req, res) => {
   try {

      await Student.deleteOne(student._id);
      return res.status(200).json({ message: "تم حذف الحساب بنجاح" });

   } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
   };


};

export const ViewProfile = async (req, res) => {

   try {
      const student = await student.findById(req.studentId);
      if (!student) {
         return res.status(404).json({ message: 'الشركة غير موجودة' });
      }

      return res.status(200).json(student);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }

};

//   View Student Page
export const ViewStudentPage = async (req, res) => {
   try {
      const student = await student.findById(req.studentId);
      if (!student) {
         return res.status(404).json({ message: 'الشركة غير موجودة' });
      }

      return res.status(200).json(student);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
};

//   Filter The Opportunities
export const FilterTheOpp = async (req, res) => {
   const { major, numOfStars } = req.query;

   try {
      const evaluationResults = await Evaluation.find({ numOfStars });
      const opportunityIds = evaluationResults.map((evaluation) => evaluation.opportunityId);

      const filteredOpportunities = await Opportunity.find({
         major,
         _id: { $in: opportunityIds },
      });

      return res.status(200).json(filteredOpportunities);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }

}

//   Search For The Opportunity
export const SearchForTheOpp = async (req, res) => {
   const { query } = req.query;

   try {
      // Perform search based on the query
      const result = await Item.find({ name: { $regex: query, $options: 'i' } }); // Case-insensitive search

      res.json(result);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching.' });
   }
}

export const getCurrentUser = async (req, res) => {
   const { id } = req.params;

   try {
      // Perform search based on the query
      let student = await Student.findById(id); // Case-insensitive search
      if (student) {

         const activeRegistrations = await StudentRegistration.find({
            studentId: id,
            status: "Accepted"
         });

         const completedRegistrations = await StudentRegistration.find({
            studentId: id,
            status: "Completed"
         });
         let studentData = {
            user: student,
            activeRegistrations,
            completedRegistrations
         }
         return res.status(200).json({ student: studentData });
      } else {
         return res.status(404).json({ message: "Student not found" })
      }
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while searching.' });
   }
}



export const uploadPDF = async (req, res) => {
   const { base64String } = req.body;
   if (!base64String) {
      return res.status(400).send('No file uploaded.');
   }

   const matches = base64String.match(/^data:(.+);base64,(.+)$/);
   if (!matches) {
      return res.status(400).send('Invalid base64 string.');
   }
   let student = await Student.findById(req.userId);
   if (student.cv && student.cv !== "") {
      fs.access(student.cv, fs.constants.F_OK, (err) => {
         if (err) {
            console.log('File does not exist.');
         } else {
            fs.unlink(student?.cv, async (err) => {
               if (err) {
                  if (err.code === 'ENOENT') {

                     return res.status(404).send('File not found.');
                  }
                  // Other errors
                  return res.status(500).send('Error deleting file.');
               }
            })
         }
      });
   }

   const mimeType = matches[1];
   const base64Data = matches[2];
   const buffer = Buffer.from(base64Data, 'base64');

   const uploadDir = 'public/studentCV';
   if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
   }

   // Generate a unique filename
   const filename = `pdf-${Date.now()}.pdf`;
   const filePath = path.join(uploadDir, filename);

   // Save the file to the uploads directory
   fs.writeFile(filePath, buffer, async (err) => {
      if (err) {
         return res.status(500).send('Error saving file.');
      }

      student.cv = filePath;
      await student.save()
      console.log({
         filename,
         path: filePath,
      });
      return res.status(200).json({ filePath });
   });
};

export const uploadCertificates = async (req, res) => {
   const { base64String } = req.body;
   try {
      if (!base64String) {
         return res.status(400).send('No file uploaded.');
      }

      const matches = base64String.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
         return res.status(400).send('Invalid base64 string.');
      }
      let student = await Student.findById(req.userId);
      if (student.certificates && student.certificates !== "") {
         fs.access(student.certificates, fs.constants.F_OK, (err) => {
            if (err) {
               console.log('File does not exist.');
            } else {
               fs.unlink(student?.certificates, async (err) => {
                  if (err) {
                     if (err.code === 'ENOENT') {

                        return res.status(404).send('File not found.');
                     }
                     // Other errors
                     return res.status(500).send('Error deleting file.');
                  }
               })
            }
         });
      }

      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');
      const uploadDirCertificate = 'public/student-certificates';
      if (!fs.existsSync(uploadDirCertificate)) {
         fs.mkdirSync(uploadDirCertificate, { recursive: true });
      }

      // Generate a unique filename
      const filename = `pdf-${Date.now()}.pdf`;
      const filePath = path.join(uploadDirCertificate, filename);

      // Save the file to the uploads directory
      fs.writeFile(filePath, buffer, async (err) => {
         if (err) {
            return res.status(500).send('Error saving file.');
         }

         student.certificates = filePath;
         await student.save()
         console.log({
            filename,
            path: filePath,
         });
         return res.status(200).json({ filePath });
      });
   } catch (error) {

   }
};

export const deleteCV = async (req, res) => {
   const { cvPath } = req.body;
   try {

      if (!cvPath) {
         return res.status(400).send('لم يتم العثور على السيرة الذاتية');
      }
      // console.log(req.userId);

      fs.unlink(cvPath, async (err) => {
         if (err) {
            if (err.code === 'ENOENT') {

               return res.status(404).send('File not found.');
            }
            // Other errors
            return res.status(500).send('Error deleting file.');
         }
         let student = await Student.findById(req.userId);
         student.cv = ""
         await student.save()
         return res.status(200).send('File deleted successfully.');
      });
   } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
   }
};

export const deleteCertificate = async (req, res) => {
   const { certificatePath } = req.body;
   try {

      if (!certificatePath) {
         return res.status(400).send('لم يتم العثور على السيرة الذاتية');
      }
      // console.log(req.userId);

      fs.unlink(certificatePath, async (err) => {
         if (err) {
            if (err.code === 'ENOENT') {

               return res.status(404).send('File not found.');
            }
            // Other errors
            return res.status(500).send('Error deleting file.');
         }
         let student = await Student.findById(req.userId);
         student.certificates = ""
         await student.save()
         return res.status(200).send('File deleted successfully.');
      });
   } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
   }
};

export const uploadImage = async (req, res) => {
   const { base64String } = req.body;
   try {
      if (!base64String) {
         return res.status(400).send('No file uploaded.');
      }

      const matches = base64String.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
         return res.status(400).send('Invalid base64 string.');
      }
      let student = await Student.findById(req.userId);
      if (student.profilePic && student.profilePic !== "") {
         fs.access(student.profilePic, fs.constants.F_OK, (err) => {
            if (err) {
               console.log('File does not exist.');
            } else {
               fs.unlink(student?.profilePic, async (err) => {
                  if (err) {
                     if (err.code === 'ENOENT') {

                        return res.status(404).send('File not found.');
                     }
                     // Other errors
                     return res.status(500).send('Error deleting file.');
                  }
               })
            }
         });
      }

      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');
      const uploadDirCertificate = 'public/student-images';
      if (!fs.existsSync(uploadDirCertificate)) {
         fs.mkdirSync(uploadDirCertificate, { recursive: true });
      }

      // Generate a unique filename
      const filename = `image-${Date.now()}.png`;
      const filePath = path.join(uploadDirCertificate, filename);

      // Save the file to the uploads directory
      fs.writeFile(filePath, buffer, async (err) => {
         if (err) {
            return res.status(500).send('Error saving file.');
         }

         student.profilePic = filePath;
         await student.save()
         console.log({
            filename,
            path: filePath,
         });
         return res.status(200).json({ filePath });
      });
   } catch (error) {

   }
};


//   Registration in the opportunity
export const RegistrationInTheOpp = async (req, res) => {
}

//   Discover Location
export const DiscoverLocation = async (req, res) => {
};

//   View Request
export const ViewRequest = async (req, res) => {
};

export const test = async (req, res) => {
   // const existingStudent = await Student.find();
   res.json("HELLO");
};