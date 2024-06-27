import axios from "axios";
import { API } from "../index";
import { sha256 } from "js-sha256";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSystemContext } from "./SystemContext";
import { useEvaluationContext } from "./EvaluationContext";

const Context = createContext();
export default function AuthContextProvider(props) {
  const { goToPage, showToast, handleError, setLoading, setSession, getSession, resetSession } = useSystemContext();
  const [hasLogin, setHasLogin] = useState(false);
  const [isStudent, setIsStudent] = useState();
  const [isCompany, setIsCompany] = useState();
  const [userData, setUserData] = useState({});
  const [cv, setCV] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [certificates, setCertificates] = useState("");
  const [companyImage, setCompanyImage] = useState("");
  const [user, setUser] = useState(getSession("user") ?? null);

  const handleUser = useCallback((user) => {
    if (user) {
      user.password = "";
    }
    setSession("user", user);
    setUser(user);
    setHasLogin(user != null);
    setIsCompany(user != null && user?.role === "company")
    setIsStudent(user != null && user?.role === "student")
  }, [setSession])



  useEffect(() => {
    handleUser(getSession("user"));
  }, [getSession, handleUser]);

  const getUser = async (id) => {
    handleError(null)
    try {
      setLoading(true);
      let userId;
      if (id) {
        userId = id
      } else {
        userId = user?._id
      }
      const response = await axios.get(`${API}/student/get-current-user/${userId}`);
      setLoading(false);

      if (response.status === 200) {
        let userDat = response.data.student;
        setUserData(userDat)
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      const msg = error.response?.data?.message ?? error.message;
      handleError(msg);
    }
  }

  const getCompany = async (id) => {
    handleError(null)
    try {
      setLoading(true);
      const response = await axios.get(`${API}/company/get-current-user/${id ? id : user?._id}`);

      if (response.status === 200) {
        let userDat = response.data.company;
        setUserData(userDat)
        let check = user?._id
      } else {
        handleError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const msg = error.response?.data?.message ?? error.message;
      handleError(msg);
    }
  }
  const signUpStudent = async (user) => {
    handleError(null)
    try {
      setLoading(true);
      user.password = sha256(user?.password).toString();
      user.role = "student";
      const response = await axios.post(`${API}/student/sign-up`, user);
      setLoading(false);

      if (response.status === 200) {
        user = response.data;
        user.password = "";
        handleUser(user);
        showToast("success", "تم التسجيل بنجاح!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      const msg = error.response?.data?.message ?? error.message;
      handleError(msg);
    }
  };



  const signUpCompany = async (user) => {
    try {
      setLoading(true);
      user.password = sha256(user?.password).toString();
      user.role = "company";
      const response = await axios.post(`${API}/company/sign-up`, user);
      setLoading(false);

      if (response.status === 200) {
        user = response.data;
        user.password = "";
        console.log(user);
        handleUser(user);
        showToast("success", "تم التسجيل بنجاح!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  };

  const updateUser = async (data) => {
    const token = user.jwtoken;
    const id = user._id;
    const role = user.role;

    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.put(`${API}/${role}/${id}`, data, { headers });
      setLoading(false);
      const status = response.status;
      if (status === 200) {
        showToast("success", "Updating success!")
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }
  }

  const signIn = async ({ email, password, role }) => {
    try {
      setLoading(true);
      const hash = sha256(password);
      const response = await axios.post(`${API}/${role}/sign-in`, { email: email, password });
      setLoading(false);

      if (response.status === 200) {
        const user = response.data;
        handleUser(user);
        showToast("success", "Sign in success!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  };


  const signOut = () => {
    handleUser(null);
    resetSession();
    goToPage("/");
  }

  const resetPassword = async ({ secretQuestion, secretAnswer }) => {
    try {
      setLoading(true);
      const hash = sha256(secretAnswer);
      const ob = { secretQuestion: secretQuestion, secretAnswer: hash };

      const response = await axios.post(`${API}/reset-password`, ob);
      setLoading(false);
      const status = response.status;
      if (status === 200) {
        goToPage("reset-password");
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      handleError(error.message)
    }

  }

  const setSecret = async ({ secretQuestion, secretAnswer }) => {
    try {
      setLoading(true);
      const hash = sha256(secretAnswer);
      const ob = { uid: user?._id, secretQuestion: secretQuestion, secretAnswer: hash };
      const role = user?.role;
      const response = await axios.post(`${API}/${role}/secret`, ob);
      setLoading(false);
      const status = response.status;
      if (status === 200) {
        showToast("success", "Secret info added successfully!")
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }

  }
  const uploadStudentCV = async (base64String) => {
    const token = user?.jwtoken;

    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/student/upload`, { base64String }, { headers });
      // const response = await axios.post(`${API}/${role}/secret`, ob);
      const status = response.status;
      if (status === 200) {
        setLoading(false);
        setCV(response.data.filePath)
        // console.log();
        // setImg(response.data?.img)
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }

  }

  const uploadStudentCertificate = async (base64String) => {
    const token = user?.jwtoken;

    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/student/uploadCertificate`, { base64String }, { headers });
      // const response = await axios.post(`${API}/${role}/secret`, ob);
      const status = response.status;
      if (status === 200) {
        setLoading(false);
        setCertificates(response.data.filePath)
        // console.log();
        // setImg(response.data?.img)
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }

  }

  const uploadCompanyImage = async (base64String) => {
    const token = user?.jwtoken;

    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/company/upload`, { base64String }, { headers });
      // const response = await axios.post(`${API}/${role}/secret`, ob);
      const status = response.status;
      if (status === 200) {
        setLoading(false);
        setCompanyImage(response.data.img)
        // console.log();
        // setImg(response.data?.img)
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }

  }

  const uploadStudentImage = async (base64String) => {
    const token = user?.jwtoken;

    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/student/uploadImage`, { base64String }, { headers });
      // const response = await axios.post(`${API}/${role}/secret`, ob);
      const status = response.status;
      if (status === 200) {
        setLoading(false);
        setProfilePic(response.data.img)
        // console.log();
        // setImg(response.data?.img)
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }

  }

  const deleteCV = async (cvPath) => {
    const token = user?.jwtoken;

    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/student/deleteCV`, { cvPath }, { headers });
      // const response = await axios.post(`${API}/${role}/secret`, ob);
      const status = response.status;
      if (status === 200) {
        setLoading(false);
        setCV(response.data.filePath)
        // console.log();
        // setImg(response.data?.img)
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }

  }

  const deleteCertificate = async (certificatePath) => {
    const token = user?.jwtoken;

    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/student/deleteCertificate`, { certificatePath }, { headers });
      // const response = await axios.post(`${API}/${role}/secret`, ob);
      const status = response.status;
      if (status === 200) {
        setLoading(false);
        setCertificates(response.data.filePath)
        // console.log();
        // setImg(response.data?.img)
      }
      else {
        const message = response.message;
        handleError(message)
      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
    }

  }


  const value = {
    user,
    signUpStudent,
    signUpCompany,
    signIn,
    deleteCV,
    signOut,
    getUser,
    cv,
    certificates,
    resetPassword,
    setSecret,
    companyImage,
    hasLogin,
    uploadCompanyImage,
    uploadStudentImage,
    profilePic,
    uploadStudentCV,
    isCompany,
    userData,
    uploadStudentCertificate,
    getCompany,
    deleteCertificate,
    isStudent,
    updateUser,
  };

  return (
    <Context.Provider value={value}>{props.children}</Context.Provider>
  );
}
export const useAuthContext = () => useContext(Context);

