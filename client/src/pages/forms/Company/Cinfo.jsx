import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';
import PersonIcon from '@mui/icons-material/Person';
import { useSystemContext } from '../../../contexts/SystemContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Box } from '@mui/material';

const Cinfo = () => {
    const { handleLoading } = useSystemContext()
    const { user, updateUser, getCompany, userData, companyImage, getUser, uploadCompanyImage } = useAuthContext();
    const [isLoading, setIsLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
        companyName: '',
        companyField: '',
        phoneNumber: '',
        companyAddress: '',
        city: '',
        commercialRegistrationNumber: '',
        companySector: '',
        descriptionCompany: '',
        companyImage,
        facebook: '',
        twitter: '',
        instagram: '',
        linkedIn: '',
    });
    React.useEffect(() => {
        if (userData && userData.user && isLoading) {
            const fd = { ...formData };
            for (const key in fd) {
                const val = userData.user[key] ?? "";
                // console.log(key, val)
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
    React.useEffect(() => {
        getCompany()
    }, [])

    React.useEffect(() => {
        setFormData({ ...formData, companyImage })
    }, [companyImage])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const base64String = await getBase64(file);
        uploadCompanyImage(base64String);
        getCompany()
    };


    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleSave = () => {
        // console.log(formData);
        updateUser(formData);
        getCompany()
    }
    const url = "http://localhost:5001/"

    return (
        <div style={{ maxWidth: "100vw !imaportant" }}>
            <CompanyHeader />

            <div className="container flex-column">
                <h3 >معلومات عامة </h3>
                <div className="row my-4 w-100">
                    <div className="col-12 col-sm-6 col-md-3 my-4 mx-auto">
                        <div className="card border-0 shadow p-4 d-flex justify-content-center align-items-center" >
                            <div style={{ position: "relative" }}>
                                <img src={userData?.user?.companyImage ? url + userData?.user?.companyImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className='rounded-circle bg-info' width={200} height={200} alt="profile_image" />
                                <Button
                                    variant="contained"
                                    component="label"
                                    className='rounded-circle py-2 px-1'
                                    startIcon={<CloudUploadIcon fontSize='small' />}
                                    style={{ top: 20, right: 0, position: "absolute", backgroundColor: 'mediumaquamarine' }}
                                >
                                    <input
                                        type="file"
                                        hidden
                                        className='d-none'
                                        name="companyImage"
                                        onChange={handleFileUpload}
                                    />
                                </Button>
                            </div>
                            <h5 className='text-center mt-3'>{userData?.user?.companyName}</h5>
                        </div>
                    </div>
                </div>
                <div className="row w-100 mt-4">
                    <div className="col-8 mx-auto">
                        <div className="row">
                            <div className="col">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="companyName"
                                    label={"اسم الشركة"}
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <PersonIcon />
                                        ),
                                    }}
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    name="phoneNumber"
                                    fullWidth
                                    label={"رقم الهاتف"}
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <PhoneIcon />
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    required
                                    name="companyField"
                                    label={"مجال الشركة"}
                                    value={formData.companyField}
                                    onChange={handleChange}
                                    fullWidth
                                />

                            </div>
                            <h3 className='my-4'>موقع الشركة </h3>
                        </div>
                        <div className="row">
                            <div className="col">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    name="city"
                                    label={"المدينة"}
                                    value={formData.city}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <LocationCityIcon />
                                        ),
                                    }}
                                    fullWidth
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    name="companyAddress"
                                    label={"عنوان الشركة"}
                                    value={formData.companyAddress}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <LocationOnIcon />
                                        ),
                                    }}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    type='number'
                                    name="commercialRegistrationNumber"
                                    label={"السجل التجاري"}
                                    value={formData.commercialRegistrationNumber}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <h3 className='my-4'>حول العمل</h3>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    name="companySector"
                                    label={"قطاع الشركة"}
                                    value={formData.companySector}
                                    onChange={handleChange}
                                    fullWidth
                                />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h4>عن الشركة </h4>
                                <TextareaAutosize
                                    aria-label="self-description"
                                    placeholder="اكتب وصفًا عن الشركة..."
                                    name="descriptionCompany"
                                    value={formData.descriptionCompany}
                                    onChange={handleChange}
                                    style={{ width: '100%', minHeight: '100px', marginBottom: '20px' }}
                                />

                            </div>
                        </div>
                        <h3 className='my-4'>وسائل التواصل الإجتماعي</h3>

                        <div className="row row-cols-1 row-cols-md-2">
                            <div className="col">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    name="facebook"
                                    label={"فيسبوك"}
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    name="twitter"
                                    label={"تويتر"}
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    name="instagram"
                                    label={"انستقرام"}
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                            <div className="col">
                                <TextField
                                    className='bg-white border-0'
                                    margin="normal"
                                    name="linkedIn"
                                    label={"لينكد ان"}
                                    value={formData.linkedIn}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-4 mx-auto">
                                <Button
                                    onClick={handleSave}
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{ backgroundColor: 'mediumaquamarine', color: 'black', }}
                                >
                                    <span> حفظ</span>

                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cinfo;


