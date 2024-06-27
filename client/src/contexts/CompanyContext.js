import axios from "axios";
import { API } from "../index";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSystemContext } from "./SystemContext";
import { useEvaluationContext } from "./EvaluationContext";

const Context = createContext();
export default function CompanyContextProvider(props) {
  const { goToPage, showToast, handleError, setLoading, setSession, getSession, resetSession } = useSystemContext();
  const [company, setCompany] = useState(getSession("company") ?? false);
  const [targetCompanyId, setTargetCompanyId] = useState("targetCompanyId" ?? false);

  const handleTargetCompany = (company) => {
    setSession("company", company);
    setCompany(company);
  };


  const handleTargetCompanyId = (companyId) => {
    setSession("targetICompanyId", companyId);
    setTargetCompanyId(companyId);
  };


  const loadTargetCompany = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/company/${targetCompanyId}`);
      setLoading(false);
      const status = response.status;
      if (status === 200) {
        handleTargetCompany(response.data.result)
        showToast("success", "loading success!")

      }
      else {
        const message = response.message;
        handleError(message)
        console.log(message)

      }
    } catch (error) {
      setLoading(false);
      handleError(error.message)
      console.log(error)

    }
  }


  const value = {
    loadTargetCompany,
    handleTargetCompanyId,
    company,
    targetCompanyId,
    handleTargetCompany,

  };

  return (
    <Context.Provider value={value}>{props.children}</Context.Provider>
  );
}
export const useCompanyContext = () => useContext(Context);

