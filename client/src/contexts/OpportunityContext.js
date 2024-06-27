import axios from "axios";
import { API } from "../index";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSystemContext } from "./SystemContext";
import { useAuthContext } from "./AuthContext";

const Context = createContext();
export default function OpportunityContextProvider(props) {
  const { user, isCompany } = useAuthContext();
  const { goToPage, showToast, handleError, setLoading, setSession, getSession, resetSession } = useSystemContext();
  const [opportunities, setOpportunities] = useState(getSession("opportunities") ?? []);
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [img, setImg] = useState("");

  const handleOpportunities = useCallback((opportunities) => {
    setSession("opportunities", opportunities);
    setOpportunities(opportunities);
  }, [setSession])

  const handleAddOpportunity = (opportunity) => {
    const _opportunities = opportunities.map((v, i) => {
      if (v._id === opportunity._id) {
        return opportunity;
      }
      else {
        return v;
      }
    })
    handleOpportunities(_opportunities)
  };

  const loadMyOpportunities = useCallback(async () => {
    const userId = user?._id;
    const token = user?.jwtoken;
    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.get(`${API}/opportunity/company/${userId}`, { headers });
      setLoading(false);
      if (response.status === 200) {
        const opportunities = response.data;
        setAllOpportunities(opportunities)
        // handleOpportunities(opportunities)
      } else {
        // handleError(response.data.message);
        setAllOpportunities([])

      }
    } catch (error) {
      setLoading(false);
      console.log(error.response?.data?.message || error.message);
    }
  }, [handleOpportunities, setLoading, user]);

  useEffect(() => {
    if (!loaded && user) {
      setLoaded(true);
    }
  }, [getSession, handleOpportunities, loaded, user]);


  const saveOpportunity = async (opportunity) => {
    opportunity.companyId = user._id;
    if (opportunity.workingDays.length > 0 && !opportunity.workingDays[0]) {
      return showToast("error", "مطلوب يوم البدء");
    }
    if (opportunity.workingDays.length > 0 && !opportunity.workingDays[1]) {
      return showToast("error", "يوم النهاية مطلوب");
    }
    if (opportunity.workingHours.length > 0 && !opportunity.workingHours[0]) {
      return showToast("error", "وقت البدء مطلوب");
    }
    if (opportunity.workingHours.length > 0 && !opportunity.workingHours[1]) {
      return showToast("error", "وقت الانتهاء مطلوب");
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API}/opportunity`, opportunity);
      setLoading(false);
      if (response.status === 200) {
        opportunity = response.data;
        handleAddOpportunity(opportunity)
        showToast("success", "تمت إضافة الفرصة بنجاح!");
        goToPage(isCompany ? "display-published" : "dispaly-opportunities")
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  };

  const updateOportunity = async (data, _id) => {
    try {
      setLoading(true);
      const dataToUpdate = Object.fromEntries(
        Object.keys(data)
          .filter(key => key !== 'password' && key !== "email")
          .map(key => [key, data[key]])
      );
      const response = await axios.patch(`${API}/opportunity/${_id}`, dataToUpdate);
      setLoading(false);
      if (response.status === 200) {
        const opportunity = response.data;
        handleAddOpportunity(opportunity)
        showToast("success", "تم تحديث الفرصة بنجاح!");
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  }

  const getAllOpportunities = async (data, _id) => {
    const token = user?.jwtoken;
    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.get(`${API}/opportunity/getAllOpportunities`, { headers });
      setLoading(false);
      if (response.status === 200) {
        const opportunity = response?.data?.opp;
        setAllOpportunities(opportunity)
      } else {
        setAllOpportunities([])
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  }

  const registerOpportunity = async (id) => {
    const token = user.jwtoken;
    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/opportunity/registerOpportunity?id=${id}`, { headers });
      setLoading(false);
      if (response.status === 200) {
        const opportunity = response?.data?.msg;
        showToast("success", opportunity);
        getAllOpportunities()
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  }

  const searchOpportunity = async (search) => {
    const token = user.jwtoken;
    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      setTimeout(async () => {
        const response = await axios.get(`${API}/opportunity/searchOpportunity?search=${search}`, { headers });
        setLoading(false);
        if (response.status === 200) {
          const opportunity = response?.data?.opp;
          setAllOpportunities(opportunity)

          // getAllOpportunities()
        } else {
          handleError(response.data.message);
        }
      }, 500);
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  }

  const getOpportunityRegistrations = async (id, status) => {
    const token = user.jwtoken;
    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.get(`${API}/opportunity/${id}?status=${status}`, { headers });
      setLoading(false);
      if (response.status === 200) {
        const opportunity = response?.data;
        setRegistrations(opportunity)
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  }

  const acceptRegistration = async (id, oppId) => {
    const token = user.jwtoken;
    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.put(`${API}/opportunity/acceptRegistration?id=${id}`, { headers });
      setLoading(false);
      if (response.status === 200) {
        const opportunity = response?.data.msg;
        showToast("success", opportunity);
        getOpportunityRegistrations(oppId)

      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  }

  const rejectRegistration = async (id, oppId) => {
    const token = user.jwtoken;
    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.put(`${API}/opportunity/rejectRegistration?id=${id}`, { headers });
      setLoading(false);
      if (response.status === 200) {
        const opportunity = response?.data.msg;
        showToast("success", opportunity);
        getOpportunityRegistrations(oppId)

      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      handleError(error.response?.data?.message || error.message);
    }
  }
  const uploadImage = async (base64String) => {
    const token = user.jwtoken;

    try {
      setLoading(true);
      const headers = {
        'Authorization': token, // Example header for token-based auth
        'Content-Type': 'application/json', // Include other headers as needed
      };
      const response = await axios.post(`${API}/opportunity/upload`, { base64String }, { headers });
      // const response = await axios.post(`${API}/${role}/secret`, ob);
      const status = response.status;
      if (status === 200) {
        setLoading(false);
        setImg(response.data?.img)
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
    getAllOpportunities,
    opportunities,
    registrations,
    setRegistrations,
    allOpportunities,
    img,
    setImg,
    loadMyOpportunities,
    uploadImage,
    getOpportunityRegistrations,
    searchOpportunity,
    rejectRegistration,
    acceptRegistration,
    registerOpportunity,
    updateOportunity,
    saveOpportunity
  };

  return (
    <Context.Provider value={value}>{props.children}</Context.Provider>
  );
}
export const useOpportunityContext = () => useContext(Context);

