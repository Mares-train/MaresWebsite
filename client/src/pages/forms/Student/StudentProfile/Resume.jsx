import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader/StudentHeader';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useSystemContext } from '../../../../contexts/SystemContext';
import { useAuthContext } from '../../../../contexts/AuthContext';
import './herosection.css'

const Resume = () => {
    const { handleLoading } = useSystemContext()
    const { user, userData, updateUser, getUser, uploadStudentCV, uploadStudentCertificate, cv, certificates, deleteCV, deleteCertificate } = useAuthContext();
    const [isLoading, setIsLoading] = React.useState(true);

    const [formData, setFormData] = useState({
        description: '',
        cv,
        certificates,
        college: '',
        major: '',
        graduationDate: '',
        languages: [],
        academicLevel: '',
        jobTitle: '',
        companyName: '',
        companyLocation: '',
        typeOfTheJob: '',
        workDescription: '',
        tools: [], // متغير الأدوات
        administrativeSkills: [], // متغير المهارات الإدارية
        technicalSkills: [], // متغير المهارات التقنية
        jobRelatedSkills: [] // متغير المهارات ذات الصلة بالوظيفة

    });

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        setFormData({ ...formData, cv })
    }, [cv])
    useEffect(() => {
        setFormData({ ...formData, certificates })
    }, [certificates])

    React.useEffect(() => {
        if (userData && userData.user && isLoading) {
            const fd = { ...formData };
            for (const key in fd) {
                const val = userData.user[key] ?? "";
                fd[key] = val;
            }
            setFormData(fd);
            setIsLoading(false)
            handleLoading(false)
        }
    }, [formData, handleLoading, isLoading, userData, user]);

    if (isLoading) {
        handleLoading(true);
    }

    useEffect(() => {

        const fetchedLanguages = [
            { label: 'العربية - مبتدئ' },
            { label: 'العربية - متوسط' },
            { label: 'العربية - متقدم' },
            { label: 'الإنجليزية - مبتدئ' },
            { label: 'الإنجليزية - متوسط' },
            { label: 'الإنجليزية - متقدم' },
        ];
        setLanguages(fetchedLanguages);
    }, []);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSave = async () => {
        updateUser(formData)
        // Code to handle form submission, including file uploads
    };

    const [languages, setLanguages] = useState([]);

    const jobRelatedSkillsOptions = [
        { label: 'الرسوم البيانية', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'مهارات حسابية', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'إدارة المشاريع', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] }
        // Add more job related skills here if needed
    ];

    const jobRelatedSkillsWithOptions = jobRelatedSkillsOptions.flatMap(skill => (
        skill.proficiencyLevels.map(level => ({
            label: `${skill.label} - ${level}`,
            skill: skill.label,
            level: level
        }))
    ));


    // Define the options for tools with proficiency levels
    const toolsOptions = [
        { label: 'الإكسل', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'الوورد', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'البوربوينت', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'أدوات الاستطلاع', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] }
        // Add more tools here if needed
    ];

    // Flatten the options array to include proficiency levels
    const optionsWithLevelstool = toolsOptions.flatMap(tool => (
        tool.proficiencyLevels.map(level => ({
            label: `${tool.label} - ${level}`,
            tool: tool.label,
            level: level
        }))
    ));

    //المهارات الادارية
    const [administrativeSkills, setAdministrativeSkills] = useState([]);

    // Define the options for administrative skills with proficiency levels
    const administrativeSkillsOptions = [
        { label: 'حس المسؤولية', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'العمل الجماعي', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'المرونة في التعلم', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] }
        // Add more administrative skills here if needed
    ];

    // Flatten the options array to include proficiency levels
    const optionsWithLevels = administrativeSkillsOptions.flatMap(skill => (
        skill.proficiencyLevels.map(level => ({
            label: `${skill.label} - ${level}`,
            skill: skill.label,
            level: level
        }))
    ));

    useEffect(() => {
        // Set administrative skills state with the options including proficiency levels
        setAdministrativeSkills(optionsWithLevels);
    }, []); // Ensure this effect runs only once on component mount

    const handleUploadCV = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const base64String = await getBase64(file);
            console.log(base64String);
            uploadStudentCV(base64String);
        } else {
            console.error("Please upload a PDF file.");
        }
    };

    const handleUploadCertificate = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const base64String = await getBase64(file);
            console.log(base64String);
            uploadStudentCertificate(base64String);
        } else {
            console.error("Please upload a PDF file.");
        }
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };
    const handleDeleteCV = () => {
        deleteCV(formData?.cv)
        getUser()
    }
    const handleDeleteCertificate = () => {
        deleteCertificate(formData?.certificates)
        getUser()
    }
    const url = "http://localhost:5001/"

    return (
        <div >
            <StudentHeader />
            <div className="container">
                <div className="row w-100">
                    <div className="col-8 mx-auto my-5">
                        <h3 className='text-center'>سيرتي الذاتية</h3>
                        <h4 className='mt-3'>ملخص عني:</h4>
                        <TextareaAutosize
                            aria-label="self-description"
                            placeholder="اكتب وصفًا عن نفسك..."
                            name="description"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            style={{ width: '100%', minHeight: '100px' }}
                        />

                        <h4 className='mt-3'>تحميل السيرة الذاتية:</h4>
                        <div className="row">
                            <div className={(formData?.cv && formData?.cv !== "") ? `col-4` : `col-12`}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    style={{ fontFamily: 'Tajawal, sans-serif', marginBottom: '20px', backgroundColor: 'mediumaquamarine' }}
                                >
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        hidden
                                        name="cv"
                                        onChange={handleUploadCV}
                                    />
                                </Button>
                            </div>
                            {(formData?.cv && formData?.cv !== "") &&
                                <div className={`col-8`}>
                                    <div className="card border-0 p-4 shadow" style={{ height: '500px' }}>
                                        <iframe
                                            src={url + formData?.cv}
                                            title="PDF Viewer"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 'none' }}
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        onClick={handleDeleteCV}
                                        style={{ fontFamily: 'Tajawal, sans-serif', marginBottom: '20px', marginTop: 20, backgroundColor: 'mediumaquamarine' }}
                                    >
                                        حذف السيرة الذاتية
                                    </Button>
                                </div>
                            }
                        </div>
                        <h4 className='mt-3'>تحميل الشهادات:</h4>
                        <div className="row">
                            <div className={(formData?.cv && formData?.cv !== "") ? `col-4` : `col-12`}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    style={{ fontFamily: 'Tajawal, sans-serif', marginBottom: '20px', backgroundColor: 'mediumaquamarine' }}
                                >
                                    <input
                                        type="file"
                                        hidden
                                        accept=".pdf"
                                        name="certificates"
                                        onChange={handleUploadCertificate}
                                    />
                                </Button>
                            </div>
                            {(formData?.certificates && formData?.certificates !== "") &&
                                <div className={`col-8`}>
                                    <div className="card border-0 p-4 shadow" style={{ height: '500px' }}>
                                        <iframe
                                            src={url + formData?.certificates}
                                            title="PDF Viewer"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 'none' }}
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        onClick={handleDeleteCertificate}
                                        style={{ fontFamily: 'Tajawal, sans-serif', marginBottom: '20px', marginTop: 20, backgroundColor: 'mediumaquamarine' }}
                                    >
                                        حذف الشهادة
                                    </Button>
                                </div>
                            }
                        </div>
                        <h3 className='my-3 text-center'>التعليم:</h3>
                        <Autocomplete
                            disablePortal
                            id="combo-box-level"
                            options={[
                                { label: 'المستوى الأول' },
                                { label: 'المستوى الثاني' },
                                { label: 'المستوى الثالث' },
                                { label: 'المستوى الرابع' },
                                { label: 'المستوى الخامس' },
                                { label: 'المستوى السادس' },
                                { label: 'المستوى السابع' },
                                { label: 'المستوى الثامن' },
                                { label: 'المستوى التاسع' },
                                { label: 'المستوى العاشر' }
                            ]}
                            className='autoComplete-stylling'
                            value={formData?.academicLevel || null}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> المستوى الدراسي</span>} />}
                            style={{ width: '100%', marginBottom: '20px' }}
                            onChange={(event, value) => setFormData({ ...formData, academicLevel: value ? value.label : '' })}
                        />

                        <Autocomplete
                            disablePortal
                            id="combo-box-college"
                            options={[{ label: 'كلية الحاسبات' }]}
                            sx={{ width: 300 }}
                            className='autoComplete-stylling'
                            value={formData?.college || null}
                            renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> الكلية</span>} />}
                            style={{ width: '100%', marginBottom: '20px' }}
                            onChange={(event, value) => setFormData({ ...formData, college: value ? value.label : '' })}
                        />

                        <Autocomplete
                            disablePortal
                            id="combo-box-specialization"
                            options={[
                                { label: 'نظم المعلومات' },
                                { label: 'علوم الحاسب الآلي' },
                                { label: 'هندسة علم البرمجيات' },
                                { label: 'هندسة الشبكات والحاسب' },
                                { label: 'الأمن السيبراني' },
                                { label: 'علم البيانات' },
                            ]}
                            className='autoComplete-stylling'
                            sx={{ width: 300 }}
                            value={formData?.major || null}
                            renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> التخصص</span>} />}
                            style={{ width: '100%', marginBottom: '20px' }}
                            onChange={(event, value) => setFormData({ ...formData, major: value ? value.label : '' })}
                        />
                        <TextField
                            id="graduationDate"
                            name="graduationDate"
                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> تاريخ التخرج</span>}
                            type="date"
                            value={formData.graduationDate?.split("T")[0] || formData.graduationDate}
                            onChange={e => setFormData({ ...formData, graduationDate: e.target.value })}
                            style={{ width: '100%', marginBottom: '20px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Stack spacing={3} sx={{ width: '100%', marginBottom: '20px' }}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                className='autoComplete-stylling'
                                options={languages}
                                value={formData?.languages || null}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, s) => setFormData({ ...formData, languages: s })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>اللغة</span>}
                                        placeholder="اللغة"
                                    />
                                )}
                            />
                        </Stack>
                        <h3 className='my-3 text-center'>المهارات:</h3>
                        <div className="row row-cols-1 row-cols-md-2 mt-3 g-3">
                            <div className="col">
                                <Autocomplete
                                    multiple
                                    id="technicalSkills"
                                    className='autoComplete-stylling'
                                    value={formData?.technicalSkills || null}
                                    onChange={(e, s) => setFormData({ ...formData, technicalSkills: s })}
                                    options={[
                                        { label: 'تحليل البيانات - مبتدئ' },
                                        { label: 'تحليل البيانات - متوسط' },
                                        { label: 'تحليل البيانات - متقدم' },
                                        { label: 'مهارات حاسوبية - مبتدئ' },
                                        { label: 'مهارات حاسوبية - متوسط' },
                                        { label: 'مهارات حاسوبية - متقدم' },
                                        { label: 'استخدام التكنولوجيا - مبتدئ' },
                                        { label: 'استخدام التكنولوجيا - متوسط' },
                                        { label: 'استخدام التكنولوجيا - متقدم' },
                                        // يمكنك إضافة المزيد من المهارات هنا بنفس النمط
                                    ]}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>المهارات التقنية</span>}
                                            placeholder="المهارات التقنية"
                                        />
                                    )}
                                />
                            </div>
                            <div className="col">
                                <Autocomplete
                                    multiple
                                    id="job-skills"
                                    value={formData?.jobRelatedSkills || null}
                                    className='autoComplete-stylling'
                                    options={jobRelatedSkillsWithOptions}
                                    onChange={(e, s) => setFormData({ ...formData, jobRelatedSkills: s })}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>المهارات الوظيفية</span>}
                                            placeholder="المهارات الوظيفية"
                                        />
                                    )}
                                />
                            </div>
                            <div className="col">
                                <Autocomplete
                                    multiple
                                    value={formData?.tools || null}
                                    id="tools-skills"
                                    className='autoComplete-stylling'
                                    options={optionsWithLevelstool}
                                    onChange={(e, s) => setFormData({ ...formData, tools: s })}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>الأدوات والبرامج</span>}
                                            placeholder="الأدوات والبرامج"
                                        />
                                    )}
                                />
                            </div>
                            <div className="col">
                                <Autocomplete
                                    multiple
                                    className='autoComplete-stylling'
                                    id="administrative-skills"
                                    value={formData?.administrativeSkills || null}
                                    options={administrativeSkills}
                                    onChange={(e, s) => setFormData({ ...formData, administrativeSkills: s })}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>المهارات الإدارية</span>}
                                            placeholder="المهارات الإدارية"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <h3 className='my-3 text-center'>الخبرات:</h3>
                        <div className="row row-cols-1 row-cols-md-2 g-3">
                            <div className="col">
                                <TextField
                                    margin="normal"
                                    name="jobTitle"
                                    label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> العنوان الوظيفي </span>}
                                    value={formData.jobTitle}
                                    style={{ width: '100%', }}
                                    onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    margin="normal"
                                    name="companyName"
                                    label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>اسم المؤسسة </span>}
                                    value={formData.companyName}
                                    style={{ width: '100%', }}
                                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    margin="normal"
                                    name="companyLocation"
                                    label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>مكان المؤسسة </span>}
                                    value={formData.companyLocation}
                                    style={{ width: '100%', }}
                                    onChange={e => setFormData({ ...formData, companyLocation: e.target.value })}
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    margin="normal"
                                    name="typeOfTheJob"
                                    label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>نوع الوظيفة</span>}
                                    value={formData.typeOfTheJob}
                                    style={{ width: '100%', }}
                                    onChange={e => setFormData({ ...formData, typeOfTheJob: e.target.value })}
                                />
                            </div>
                        </div>
                        <h5 className='my-3 text-center'>تفاصيل مهام عملك:</h5>
                        <TextareaAutosize
                            aria-label="self-description"
                            placeholder="اكتب تفاصيل مهام عملك ....."
                            name="workDescription"
                            value={formData.workDescription}
                            onChange={e => setFormData({ ...formData, workDescription: e.target.value })}
                            style={{ width: '100%', minHeight: '100px', }}
                        />
                        <hr className="mt-0 mb-4" />

                        <Button
                            onClick={handleSave}
                            variant="contained"
                            style={{ backgroundColor: 'mediumaquamarine', color: 'black', width: '50%', marginBottom: '20px' }}
                        >
                            حفظ
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;


