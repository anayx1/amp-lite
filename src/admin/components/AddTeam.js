
import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import { Camera } from 'lucide-react';

const AddTeamMember = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        position: '',
        gender: 'Male',
        photo: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            gender: e.target.value
        });
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                photo: file
            });

            // Create preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhotoPreview(event.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Create FormData object for file upload
            const submitData = new FormData();
            submitData.append('firstName', formData.firstName);
            submitData.append('lastName', formData.lastName);
            submitData.append('email', formData.email);
            submitData.append('phoneNumber', formData.phoneNumber);
            submitData.append('position', formData.position);
            submitData.append('gender', formData.gender);

            if (formData.photo) {
                submitData.append('photo', formData.photo);
            }

            // Make POST request to API
            const response = await fetch('/api/team-members', {
                method: 'POST',
                body: submitData,
                // Note: Don't set Content-Type header when using FormData
            });

            if (!response.ok) {
                throw new Error('Failed to add team member');
            }

            // Reset form on success
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                position: '',
                gender: 'Male',
                photo: null
            });
            setPhotoPreview(null);
            setSuccess(true);

        } catch {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
    };

    return (
        <Container className="py-8">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Add Team Member
            </Typography>
            <Box className="bg-white rounded-lg shadow-sm md:p-20 p-6">
                <form onSubmit={handleSubmit}>
                    <Box className="flex flex-col items-center mb-8">
                        <Box
                            className="relative mb-2 cursor-pointer"
                            onClick={() => document.getElementById('photo-upload')?.click()}
                        >
                            <Avatar
                                src={photoPreview || ''}
                                className="w-24 h-24 bg-gray-100"
                                sx={{ width: 96, height: 96 }}
                            >
                                {!photoPreview && <Camera className="text-gray-400" size={32} />}
                            </Avatar>
                            <input
                                type="file"
                                id="photo-upload"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            color="primary"
                            className="text-sm cursor-pointer"
                            onClick={() => document.getElementById('photo-upload')?.click()}
                        >
                            Upload Photo
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter your last name"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Your email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Position"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                placeholder="CEO"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" className="bg-gray-50">
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    value={formData.gender}
                                    onChange={handleSelectChange}
                                    label="Gender"
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box className="mt-8 flex justify-center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                            className="w-full max-w-xs bg-blue-500 hover:bg-blue-600 py-3"
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Now'}
                        </Button>
                    </Box>
                </form>
            </Box>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Team member added successfully!
                </Alert>
            </Snackbar>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AddTeamMember;
