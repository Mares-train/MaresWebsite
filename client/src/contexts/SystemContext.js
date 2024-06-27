
import axios from "axios";
import { API } from "../index";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SystemContext = createContext();
export default function SystemContextProvider(props) {
  const navigate = useNavigate() ;
  const getItem = (key) => {
    const data = window.sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data)
    }
    return null;
  }

  const setItem = (key, val) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (error) {
      return false;
    }
  }
  const setSession = (key, value) => {
    return setItem(key, value)
  };
  const getSession = (key) => {
    return getItem(key);
  }
  const resetSession = () => {
    window.sessionStorage.clear();
  }

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [toast, setToast] = useState({ type: "info", text: "", open: false });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const showToast = (type, text) => {
    setToast({ type: type, text: text, open: true});
  };

  const hideToast = () => {
    setToast({ type: "info", text: null, open: false});
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const handleLoading = (loading) => {
    setLoading(loading)
  }
  const uploadFile = async (file, fileType, params) => {
    const fd = new FormData();
    for (const k in params) {
      fd.append(k, params[k]);
      fd.append(fileType, file);
    }
    try {
      return await axios.post(`${API}/upload/${fileType}`, fd);
    } catch (err) {
      console.error(err);
    }
  }; 
  const goToPage=(page)=>{
    navigate(page); 
  }
  const handleError=(error)=>{
    setError(error);
    if(error){
    showToast("error", error)
    }
  }
  const value = {
    handleError,
    error,
    setSession,
    getSession,
    loading,
    setLoading,
    handleLoading,
    isDrawerOpen,
    active,
    setActive,
    closeDrawer,
    openDrawer,
    toast,
    showToast,
    hideToast,
    resetSession,
    uploadFile,
    screenWidth,
    screenHeight,
    goToPage,
  };

  return (
    <SystemContext.Provider value={value}>{props.children}</SystemContext.Provider>
  );
}
export const useSystemContext = () => useContext(SystemContext);

