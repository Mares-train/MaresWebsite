import axios from "axios";
import { API } from "../index";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSystemContext } from "./SystemContext";
import { useAuthContext } from "./AuthContext";

const Context = createContext();
export default function EvaluationContextProvider(props) {
  const { user, isCompany } = useAuthContext();
  const { goToPage, showToast, handleError, setLoading, } = useSystemContext();
  const [comments, setComments] = useState([])



  const addComment = async (body) => {
    const studentId = user?._id;
    const token = user?.jwtoken;
    try {
      if (user.role !== "student") {
        return showToast("error", "يمكن للطلاب فقط إضافة تعليق");
      }
      setLoading(true);
      body.studentId = studentId;
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/evaluation/add-evaluation`, body, { headers });
      setLoading(false);
      const msg = response.data.msg;
      showToast("success", msg)
      goToPage(`/view-company-details/${body.companyId}`)

    } catch (error) {
      setLoading(false);
      console.log(error.response?.data?.message || error.message);
    }
  }

  const getCompanyComments = async (companyId) => {
    const userId = user?._id;
    const token = user?.jwtoken;
    try {
      setLoading(true);
      let id;
      if (companyId) {
        id = companyId
      } else {
        id = userId
      }
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const { data } = await axios.get(`${API}/evaluation/get-evaluations/${id}`, { headers });
      setLoading(false);
      setComments(data.evaluations);
      // const msg = response.data.msg;
      // showToast("success", msg)      

    } catch (error) {
      setLoading(false);
      console.log(error.response?.data?.message || error.message);
    }
  }

  const value = {
    addComment,
    comments,
    getCompanyComments
  };

  return (
    <Context.Provider value={value}>{props.children}</Context.Provider>
  );
}
export const useEvaluationContext = () => useContext(Context);

