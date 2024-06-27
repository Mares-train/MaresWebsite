import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import CompanyHeader from "./CompanyHome/CompanyHeader/CompanyHeader";
import CompanySidebar from "./CompanyHome/CompanySidebar";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useOpportunityContext } from '../../../contexts/OpportunityContext';
import './Company.css';
import { useNavigate } from 'react-router';
import { useSystemContext } from '../../../contexts/SystemContext';


const initialFormDate = {
    generalSpecializationField: '',
    specificSpecializationField: '',
    opportunityName: '',
    semester: '',
    trainingType: '',
    city: '',
    numberOfTrainees: '',
    trainingBonus: '',
    description: '',
    duties: '',
    benefits: '',
    trainingHours: "",
    name: "",
    img: "",
    customizedTrainingPlans: "",
    trainingDuration: "",
    startDates: "",
    endDates: "",
    workingDays: [],
    workingHours: [],
    trainingPlan: "",



}
const TrainingOpportunity = () => {
    const { saveOpportunity, uploadImage, img, setImg } = useOpportunityContext()
    const { showToast } = useSystemContext();
    const [formData, setFormData] = useState(initialFormDate);
    const [fromDay, setFromDay] = useState('')
    const [toDay, setToDay] = useState("")
    const [workingFrom, setWorkingFrom] = useState("")
    const [workingTo, setWorkingTo] = useState("")
    const navigate = useNavigate();


    const handleGeneralSpecializationChange = (event, value) => {
        setFormData({ ...formData, generalSpecializationField: value });
    };

    const handleSave = () => {
        if (!img || img === "") {
            return showToast("error", "Image is not uploaded.");
        }
        saveOpportunity({ ...formData, img });
    };

    const handleCancel = () => {
        navigate('/company-home')
    };
    useEffect(() => setImg(""), [])




    const handleChangeTrainingDay = (value, type) => {
        if (type === "from") {
            formData.workingDays = [value, formData.workingDays[1]]
            setFromDay(value)
        }
        if (type === "to") {
            formData.workingDays = [formData.workingDays[0], value]
            setToDay(value)
        }
    };

    const handleChangeTrainingHours = (value, type) => {
        if (type === "from") {
            formData.workingHours = [value, formData.workingHours[1]]
            setWorkingFrom(value)
        }
        if (type === "to") {
            formData.workingHours = [formData.workingHours[0], value]
            setWorkingTo(value)
        }
    };

    const daysOfWeek = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];



    const generateHourOptions = () => {
        let options = [];
        for (let hour = 8; hour <= 16; hour++) {
            options.push(hour + ":00")
            if (hour !== 16) {
                options.push(hour + ":30");
            }
        }
        return options;
    };


    const handleNumberOfTraineesChange = (event, value) => {
        setFormData({ ...formData, numberOfTrainees: value });
    };





    const handleTrainingBonusChange = (event, value) => {
        setFormData({ ...formData, trainingBonus: value });
    };



    const handleChangeDescription = (event) => {
        setFormData({ ...formData, description: event.target.value });
    };

    const handleChangeDuties = (event) => {
        setFormData({ ...formData, duties: event.target.value });
    };

    const handleChangeBenefits = (event) => {
        setFormData({ ...formData, benefits: event.target.value });
    };



    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const base64String = await getBase64(file);
        // const file = event.target.files[0];
        // const formData = new FormData();
        // formData.append('image', file);
        uploadImage(base64String)


    };


    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    return (
        <>
            <CompanyHeader />
            <div className="container d-flex flex-column">
                <div className="row w-100 mt-5">
                    <div className="col">
                        <h1 className='text-center fw-bold'>إنشاء فرصة تدريبية</h1>
                    </div>
                </div>
                <div className="row w-100 my-5">
                    <div className="col-12 col-md-8 mx-auto">
                        <div className="card rounded-4 border-0 shadow p-4">
                            <h3 style={{ marginBottom: '20px' }}>مجال التدريب:</h3>
                            <div className="row row-cols-1 row-cols-sm-2 g-3">
                                <div className="col">
                                    <Autocomplete
                                        fullWidth
                                        dir='rtl'
                                        className='autoComplete-stylling'
                                        options={['تقنية', 'علوم تطبيقية', 'ادارة اعمال', 'التسويق', 'الإعلام']}
                                        value={formData.generalSpecializationField}
                                        onChange={handleGeneralSpecializationChange}
                                        renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> مجال التخصص العام</span>} />}
                                    />
                                </div>
                                <div className="col">
                                    <Autocomplete
                                        fullWidth
                                        className='autoComplete-stylling'
                                        options={['برمجة', 'تطوير مواقع الويب', 'هندسة الشبكات', 'الدعم الفني', 'اتصالات وتقنية المعلومات']}
                                        value={formData.specificSpecializationField}
                                        onChange={(event, value) => setFormData({ ...formData, specificSpecializationField: value })}
                                        renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> مجال التخصص الدقيق</span>} />}
                                    />
                                </div>
                            </div>
                            <h3 className='my-4'>حول التدريب:</h3>
                            <div className="row mb-4">
                                <div className="col-12 col-sm-6">
                                    <TextField
                                        fullWidth
                                        label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>عنوان الفرصة التدريبية</span>}
                                        value={formData.opportunityName}
                                        onChange={(event) => setFormData({ ...formData, opportunityName: event.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-12 col-sm-6">
                                    <Autocomplete
                                        fullWidth
                                        className='autoComplete-stylling'
                                        options={['الفصل الدراسي الأول', 'الفصل الدراسي الثاني', 'الفصل الدراسي الثالث', 'الصيف']}
                                        value={formData.semester}
                                        onChange={(event, value) => setFormData({ ...formData, semester: value })}
                                        renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> الفصل الدراسي</span>} />}
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-12 col-sm-6">
                                    <Autocomplete
                                        fullWidth
                                        className='autoComplete-stylling'
                                        options={['حضوري', 'عن بعد', 'هجين']}
                                        value={formData.trainingType}
                                        onChange={(event, value) => setFormData({ ...formData, trainingType: value })}
                                        renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> كيفية مزاولة التدريب</span>} />}
                                    />
                                </div>
                            </div>
                            <h3 className='my-4'>تفاصيل حول الفرصة التدريبية:</h3>
                            <div className="row mb-4">
                                <div className="col-12 col-sm-6">
                                    <TextField
                                        fullWidth
                                        label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> المدينة</span>}
                                        value={formData.city}
                                        onChange={(event) => setFormData({ ...formData, city: event.target.value })}
                                    />
                                </div>
                            </div>


                            <h4>أيام التدريب</h4>
                            <div className='row'>
                                <div className="col-12 col-sm-6">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormControl variant="standard" sx={{ width: '100%' }}>
                                                <InputLabel id="from-label">{<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>من</span>}</InputLabel>
                                                <Select
                                                    labelId="from-label"
                                                    id="from"
                                                    value={fromDay}
                                                    label="من"
                                                    onChange={e => handleChangeTrainingDay(e.target.value, "from")}
                                                >
                                                    {daysOfWeek.map((day, index) => (
                                                        <MenuItem key={index} value={day}>{day}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl variant="standard" sx={{ width: '100%' }}>
                                                <InputLabel id="to-label">{<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>الى</span>}</InputLabel>
                                                <Select
                                                    labelId="to-label"
                                                    id="to"
                                                    value={toDay}
                                                    label="الى"
                                                    onChange={e => handleChangeTrainingDay(e.target.value, "to")}
                                                >
                                                    {daysOfWeek.map((day, index) => (
                                                        <MenuItem key={index} value={day}>{day}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>


                            <h4 className='mt-3'>ساعات التدريب</h4>
                            <div className='row'>
                                <div className="col-12 col-sm-6">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormControl variant="standard" sx={{ width: '100%' }}>
                                                <InputLabel id="from-label">{<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>من</span>}</InputLabel>
                                                <Select
                                                    labelId="from-label"
                                                    id="from"
                                                    value={workingFrom}
                                                    label="من"
                                                    onChange={e => handleChangeTrainingHours(e.target.value, "from")}
                                                >
                                                    {generateHourOptions().map((hour, index) => (
                                                        <MenuItem key={index} value={hour}>{hour}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl variant="standard" sx={{ width: '100%' }}>
                                                <InputLabel id="to-label">{<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>الى</span>}</InputLabel>
                                                <Select
                                                    labelId="to-label"
                                                    id="to"
                                                    value={workingTo}
                                                    label="الى"
                                                    onChange={e => handleChangeTrainingHours(e.target.value, "to")}
                                                >
                                                    {generateHourOptions().map((hour, index) => (
                                                        <MenuItem key={index} value={hour}>{hour}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>

                            <div className="row my-4">
                                <div className="col-12 col-sm-6">
                                    <Autocomplete
                                        fullWidth
                                        className='autoComplete-stylling'
                                        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'اخرى']}
                                        value={formData.numberOfTrainees}
                                        onChange={handleNumberOfTraineesChange}
                                        renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>عدد المتدربين</span>} />}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-12 col-sm-6">
                                    <Autocomplete
                                        fullWidth
                                        className='autoComplete-stylling'
                                        options={['1000', '1500', '2000', '2500', 'اخرى']}
                                        value={formData.trainingBonus}
                                        onChange={handleTrainingBonusChange}
                                        renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>مكافأة التدريب</span>} />}
                                    />
                                </div>
                            </div>

                            <h3 style={{ marginBottom: '20px' }}>الفرصة التدريبية:</h3>

                            <h4 style={{ marginBottom: '20px' }}>وصف الشاغر التدريبي</h4>

                            <TextareaAutosize
                                aria-label="Description"
                                value={formData.description}
                                onChange={handleChangeDescription}
                                style={{ minHeight: '100px', marginBottom: '20px' }}
                            />
                            <h4 style={{ marginBottom: '20px' }}>واجبات الشاغر التدريبي</h4>

                            <TextareaAutosize
                                aria-label="Duties"
                                value={formData.duties}
                                onChange={handleChangeDuties}
                                style={{ minHeight: '100px', marginBottom: '20px' }}
                            />
                            <h4 style={{ marginBottom: '20px' }}>فوائد التدريب معنا</h4>
                            <TextareaAutosize
                                aria-label="Benefits"
                                value={formData.benefits}
                                onChange={handleChangeBenefits}
                                style={{ minHeight: '100px', marginBottom: '20px' }}
                            />

                            <div className="row">
                                <div className="col">

                                    <input
                                        type="file"
                                        id="file-upload"
                                        style={{ display: 'none', }}

                                        onChange={handleFileUpload}
                                    />
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: 'mediumaquamarine', color: 'black', fontSize: '12px' }}
                                        component="span"
                                    >
                                        <label htmlFor="file-upload">
                                            +    إضافة صورة
                                        </label>
                                    </Button>
                                </div>
                            </div>


                            <div className='row mt-4'>
                                <div className="col">
                                    <Button
                                        fullWidth
                                        onClick={handleSave}
                                        variant="contained"
                                        style={{ backgroundColor: 'mediumaquamarine', color: 'black', fontSize: '12px' }}
                                    >
                                        حفظ
                                    </Button>
                                </div>
                                <div className="col">
                                    <Button
                                        fullWidth
                                        onClick={handleCancel}
                                        variant="contained"
                                        style={{ backgroundColor: 'lightcoral', color: 'black', fontSize: '12px' }}
                                    >
                                        إلغاء
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrainingOpportunity;