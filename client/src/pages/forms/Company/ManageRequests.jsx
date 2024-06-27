import React, { useEffect, useState } from 'react';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';
import { Typography, Button, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link, useNavigate } from "react-router-dom";
import { useOpportunityContext } from '../../../contexts/OpportunityContext';
import { useSystemContext } from '../../../contexts/SystemContext';


const OpportunityList = () => {
    const [selectedOpp, setSelectedOpp] = useState("");
    const { loadMyOpportunities, allOpportunities, getOpportunityRegistrations, registrations, setRegistrations, acceptRegistration, rejectRegistration } = useOpportunityContext();
    const { showToast } = useSystemContext();

    const navigate = useNavigate();

    useEffect(() => {
        loadMyOpportunities()
    }, [])

    useEffect(() => {
        if (selectedOpp !== "") {
            getOpportunityRegistrations(selectedOpp, "Pending")
        } else {
            setRegistrations([])
        }
    }, [selectedOpp])

    const handleReject = (id) => {
        rejectRegistration(id, selectedOpp)
    }

    const handleAccept = (id) => {
        acceptRegistration(id, selectedOpp)
    }
    return (
        <div>
            <CompanyHeader />
            <div className="container flex-column">
                <div className="row w-100 my-4">
                    <div className="col text-center">
                        <h1 className='fw-bold'>إدارة الطلبات</h1>
                    </div>
                </div>
                <div className="row w-100 ">
                    <div className="col-12 col-md-6 mx-auto">
                        <h5 className='fw-bold'>اختر  فرصة تدريبية:</h5>
                        <select
                            className='w-100 my-3 py-2'
                            // style={{ width: '50%', minHeight: '30px', fontFamily: 'Tajawal' }}
                            onChange={(e) => setSelectedOpp(e.target.value)}>
                            <option value={""} className='text-secondary'>
                                حدد الفرصة
                            </option>
                            {allOpportunities?.map((item, i) => (
                                <option key={i} value={item?._id}>
                                    {item?.opportunityName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row w-100 mt-3 mb-5">
                    <div className="col-12 col-md-6 mx-auto">
                        <div className="row row-cols-1 row-cols-sm-2 g-3">
                            <div className="col">
                                {/* <Link to="/select-student" style={{ textDecoration: 'none', marginLeft: '100px', marginRight: '70px', marginTop: '80px' }}> */}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<PersonAddIcon />}
                                    sx={{
                                        fontFamily: 'Tajawal, sans-serif',
                                        backgroundColor: 'mediumaquamarine',
                                    }}
                                    onClick={() => {
                                        if (selectedOpp === "") {
                                            return showToast("error", "الرجاء تحديد الفرصة");
                                        }
                                        navigate(`/rejected-student/${selectedOpp}`)
                                    }}

                                >
                                    الطلاب المرفوضين
                                </Button>
                                {/* </Link> */}
                            </div>
                            <div className="col">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<HowToRegIcon />}
                                    sx={{
                                        fontFamily: 'Tajawal, sans-serif',
                                        backgroundColor: 'mediumaquamarine',
                                    }}
                                    onClick={() => {
                                        if (selectedOpp === "") {
                                            return showToast("error", "الرجاء تحديد الفرصة");
                                        }
                                        navigate(`/accepted-student/${selectedOpp}`)
                                    }}
                                >
                                    الطلاب المقبولين
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr />
            <div className="container">
                <div className="row w-100" >
                    <div className="col-12 col-md-8 mx-auto">
                        {registrations?.map((item, i) => {
                            return <Box key={i} sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid #ccc', borderRadius: '8px', mb: 2 }}>
                                <Typography sx={{ flexGrow: 1 }}>{item?.studentId?.firstName}</Typography>
                                <Link to={`/view-student-details/${item?.studentId?._id}`} >عرض الملف الشخصي</Link>
                                <Button
                                    size='small'
                                    variant="contained"
                                    sx={{
                                        fontFamily: 'Tajawal, sans-serif',
                                        backgroundColor: 'mediumaquamarine',
                                        marginRight: 1,
                                        marginLeft: 1
                                    }}
                                    onClick={() => handleAccept(item?._id)}

                                >
                                    يقبل
                                </Button>
                                <Button
                                    size='small'
                                    variant="contained"
                                    sx={{
                                        fontFamily: 'Tajawal, sans-serif',
                                        backgroundColor: 'mediumaquamarine',
                                    }}
                                    onClick={() => handleReject(item?._id)}
                                >
                                    يرفض
                                </Button>
                            </Box>
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OpportunityList;
