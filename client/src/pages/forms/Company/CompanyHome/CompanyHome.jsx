import CompanySidebar from "./CompanySidebar"
import CompanyHeader from "./CompanyHeader/CompanyHeader";
import CompanyHeroSection from "./CompanyHeroSection/CompanyHeroSection";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useSystemContext } from "../../../../contexts/SystemContext";
import { useEffect } from "react";
const CompanyHome = () => {
    const { hasLogin} = useAuthContext();
    const {goToPage} = useSystemContext();
    useEffect(() => {
      if(!hasLogin){
        goToPage("/");
      }
    }, [goToPage, hasLogin]);
  
  
    return ( 
        <div>
 <CompanyHeader/>               
<CompanyHeroSection/>


        </div>
        )
        
}
 
export default CompanyHome;