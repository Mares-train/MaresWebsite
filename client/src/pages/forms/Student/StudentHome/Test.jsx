import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EventIcon from '@mui/icons-material/Event';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { useSystemContext } from '../../../../contexts/SystemContext';
import { useAuthContext } from '../../../../contexts/AuthContext';

const Test = () => {
    const { handleLoading } = useSystemContext()
    const { user, updateUser, getUser, userData, uploadStudentImage, profilePic } = useAuthContext();
    const [isLoading, setIsLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
        profilePic,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        city: ''
    });
    React.useEffect(() => {
        getUser()
    }, [])

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        updateUser(formData)
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const base64String = await getBase64(file);
        uploadStudentImage(base64String);
        getUser()
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };
    const url = "http://localhost:5001/"

    return (
        <>
            <div className="container flex-column">
                <h3 className='text-center' >المعلومات الشخصية</h3>
                <div className="row my-4 w-100">
                    <div className="col-12 col-sm-6 col-md-3 my-4 mx-auto">
                        <div className="card border-0 shadow p-4 d-flex justify-content-center align-items-center" >
                            <div style={{ position: "relative" }}>
                                <img src={userData?.user?.profilePic ? url + userData?.user?.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className='rounded-circle bg-info' width={200} height={200} alt="profile_image" />
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
                        </div>
                    </div>
                </div>
                <div className="row w-100">
                    <div className="col-12 col-md-7 mx-auto">
                        <TextField
                            margin="normal"
                            required
                            name="firstName"
                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> الإسم الأول </span>}
                            value={formData.firstName}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <PersonIcon />
                                ),
                            }}
                            fullWidth
                        />
                        <br />
                        <TextField
                            margin="normal"
                            required
                            name="lastName"
                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> الإسم الأخير </span>}
                            value={formData.lastName}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <PersonIcon />
                                ),
                            }}
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            name="phoneNumber"
                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>رقم الهاتف  </span>}
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <PhoneIcon />
                                ),
                            }}
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            name="dateOfBirth"
                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>تاريخ الميلاد  </span>}
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <EventIcon />
                                ),
                            }}
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            name="city"
                            label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}> المدينة </span>}
                            value={formData.city}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <LocationCityIcon />
                                ),
                            }}
                            fullWidth
                        />
                        <Button
                            onClick={handleSave}
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                            fullWidth
                            style={{ backgroundColor: 'mediumaquamarine', color: 'black', }}
                        >
                            <span> حفظ</span>

                        </Button  >
                    </div>
                </div>
            </div>
        </>

    );
};

export default Test;

