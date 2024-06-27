import axios from "axios";
import { API } from "../index";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSystemContext } from "./SystemContext";
import { useAuthContext } from "./AuthContext";

const Context = createContext();
export default function ApplicantContextProvider(props) {
  const { user } = useAuthContext();
  const { goToPage, showToast, handleError, setLoading, setSession, getSession, resetSession } = useSystemContext();
  const [applicants, setApplicants] = useState(getSession("applicants") ?? []);
  const [loaded, setLoaded] = useState(false);

  const handleApplicants = useCallback((applicants) => {
    setSession("applicants", applicants);
    setApplicants(applicants);
  }, [setSession])


  const handleAddApplicant = (applicant) => {
    const _applicants = applicants.map((v, i) => {
      if (v._id === applicant._id) {
        return applicant;
      }
      else {
        return v;
      }
    })
    handleApplicants(_applicants)
  };


  const loadApplicants = useCallback(async () => {
    const userId = user._id;
    const role = user.role;
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.get(`${API}/applicant/${role}/${userId}`);
      setLoading(false);
      if (response.status === 200) {
        const _applicants = response.data;
        handleApplicants(_applicants)
      } else {
        // handleError(response.data.message);
        handleApplicants([])
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response?.data?.message || error.message);
    }
  }, [handleApplicants, setLoading, user]);

  useEffect(() => {

    if (user && !loaded) {
      setLoaded(true);
      // loadApplicants();
    }
  }, [getSession, handleApplicants, loadApplicants, loaded, user]);



  const updateApplicant = async (data, _id) => {
    try {
      setLoading(true);
      const dataToUpdate = Object.fromEntries(
        Object.keys(data)
          .filter(key => key !== 'password' && key !== "email")
          .map(key => [key, data[key]])
      );
      const response = await axios.patch(`${API}/applicant/${_id}`, dataToUpdate);
      setLoading(false);
      if (response.status === 200) {
        const applicant = response.data;
        handleAddApplicant(applicant)
        showToast("success", "تم تحديث الطلب بنجاح!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  }

  const addApplicant = async (applicant_id, student_id) => {
    try {
      setLoading(true);
      const response = await axios.حخسف(`${API}/applicant`, { applicant_id, student_id });
      setLoading(false);
      if (response.status === 200) {
        const applicant = response.data;
        handleAddApplicant(applicant)
        showToast("success", "تم تقديم طلبك بنجاح!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }

  }





  const value = {
    applicants,
    addApplicant,
    updateApplicant,
  };

  return (
    <Context.Provider value={value}>{props.children}</Context.Provider>
  );
}
export const useApplicantContext = () => useContext(Context);

