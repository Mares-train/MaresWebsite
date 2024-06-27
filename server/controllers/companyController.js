import Opportunity from '../models/Opportunity.js';
import Company from '../models/Company.js';
import sha256 from 'js-sha256';
import path from "path";
import fs from 'fs'

export const signinCompany = async (req, res) => {
   const { email, password } = req.body;
   console.log("company email:", email);
   try {
      const company = await Company.findOne({ email: email });
      if (!company) {
         return res.status(404).json({ message: 'الحساب غير موجود' });
      }
      const hashedPassword = sha256(password).toString();
      if (hashedPassword !== company.password) {
         return res.status(400).json({ message: 'كلمة المرور غير صحيحة' });
      }
      let jwtoken = company.getJWToken();

      return res.status(200).json({ _id: company._id, email: company.email, role: company.role, jwtoken });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
};

export const signupCompany = async (req, res) => {
   const company = req.body;
   console.log("company", company);
   try {
      const result = await Company.create(company);
      let jwtoken = result.getJWToken();
      let body = { _id: result._id, email: result.email, role: result.role, companyImage: result.companyImage, companyName: result.companyName, jwtoken }
      res.status(200).json(body);
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else if (error.code && error.code === 11000) {
         res.status(400).json({ message: 'هذا الحساب مسجل بالفعل' });
      } else {
         res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
};
export const getCurrentUser = async (req, res) => {
   const { id } = req.params;

   try {
      // Perform search based on the query
      let company = await Company.findById(id); // Case-insensitive search
      if (company) {

         const activeOpportunities = await Opportunity.find({
            companyId: id,
         });

         let companyData = {
            user: company,
            activeOpportunities,
         }
         return res.status(200).json({ company: companyData });
      } else {
         return res.status(404).json({ message: "Company not found" })
      }
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while searching.' });
   }
}

export const resetPassword = async (req, res) => {
   const { email, newPassword } = req.body;
   try {
      const existingUser = await Company.findOne({ email });
      if (!existingUser)
         return res.status(404).sed("الحساب غير مسجل مسبقا!");

      const result = await Company.update(Company._id, { password: newPassword });//ارجع له
      return res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
   }
   catch (error) {
      console.log(error);
      return res.status(500).json({ message: "حدث خطأ ما!" });
   }
};


export const testCompany = async (req, res) => {
   // const existingUser = await user.find();
   res.json("HELLO");
}

//  Complete Profile

// // update profile

export const updateCompany = async (req, res) => {
   const updateData = req.body;
   const { id } = req.params;
   try {

      let updatedData = await Company.findOneAndUpdate({ _id: id }, updateData, { new: true });
      if (updatedData) {
         return res.status(200).json({ message: 'تم التحديث بنجاح' });
      }
   } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: error.message })
   }
};
// // delete profile

export const deleteAccount = async (req, res) => {
   try {
      const result = await Company.deleteOne(Company._id);
      return res.status(200).json({ message: "تم حذف الحساب بنجاح" });

   } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
   };


};



//   View Company Profile
export const ViewProfile = async (req, res) => {
   try {
      const Company = await Company.findById(req.companyId);
      if (!Company) {
         return res.status(404).json({ message: 'الشركة غير موجودة' });
      }

      return res.status(200).json(Company);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }

}


export const SelectStudents = async (req, res) => {

   const { studentId } = req.body;

   try {
      const existingApplicant = await Applicant.findOne({ studentId });
      if (existingApplicant) {
         return res.status(400).json({ message: 'الطالب مُسجل مسبقا' });
      }

      const newApplicant = new Applicant({ studentId });
      await newApplicant.save();

      return res.status(200).json({ message: 'تمت اضافة الطالب ' });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}


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
      let company = await Company.findById(req.userId);
      if (company.companyImage && company.companyImage !== "") {
         fs.access(company.companyImage, fs.constants.F_OK, (err) => {
            if (err) {
               console.log('File does not exist.');
            } else {
               fs.unlink(company?.companyImage, async (err) => {
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
      const uploadDirCompanyImage = 'public/company-images';
      if (!fs.existsSync(uploadDirCompanyImage)) {
         fs.mkdirSync(uploadDirCompanyImage, { recursive: true });
      }

      // Generate a unique filename
      const filename = `image-${Date.now()}.png`;
      const filePath = path.join(uploadDirCompanyImage, filename);

      // Save the file to the uploads directory
      fs.writeFile(filePath, buffer, async (err) => {
         if (err) {
            return res.status(500).send('Error saving file.');
         }

         company.companyImage = filePath;
         await company.save()
         console.log({
            filename,
            path: filePath,
         });
         return res.status(200).json({ filePath });
      });
   } catch (error) {

   }
};