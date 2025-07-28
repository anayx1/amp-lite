"use client"

import { useState } from "react"
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    FormControlLabel,
    Checkbox,
    Link,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
    InputAdornment,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import { CloudUpload, KeyboardArrowDown, FilterAlt } from "@mui/icons-material"

export default function NewAdvertisement() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        state: "",
        city: "",
        runTime: "",
        date: "",
        filterBy: "",
        agreeToTerms: false,
    })
    const [file, setFile] = useState(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Here you would typically send the data to your backend
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                border: "1px solid #e0e0e0",
                borderRadius: 2,
            }}
        >
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="filter-by-label">Filter By</InputLabel>
                            <Select
                                labelId="filter-by-label"
                                id="filter-by"
                                value={formData.filterBy}
                                name="filterBy"
                                label="Filter By"
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <FilterAlt fontSize="small" sx={{ color: "action.active", mr: 1 }} />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="recent">Recent</MenuItem>
                                <MenuItem value="popular">Popular</MenuItem>
                                <MenuItem value="price">Price</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="date-label">Date</InputLabel>
                            <Select
                                labelId="date-label"
                                id="date"
                                value={formData.date}
                                name="date"
                                label="Date"
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDown}
                            >
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="this-week">This Week</MenuItem>
                                <MenuItem value="this-month">This Month</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="state-label">State</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                value={formData.state}
                                name="state"
                                label="State"
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDown}
                            >
                                <MenuItem value="lagos">Lagos</MenuItem>
                                <MenuItem value="abuja">Abuja</MenuItem>
                                <MenuItem value="kano">Kano</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small" variant="outlined">
                            <InputLabel id="city-label">City</InputLabel>
                            <Select
                                labelId="city-label"
                                id="city"
                                value={formData.city}
                                name="city"
                                label="City"
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDown}
                            >
                                <MenuItem value="ikeja">Ikeja</MenuItem>
                                <MenuItem value="lekki">Lekki</MenuItem>
                                <MenuItem value="victoria-island">Victoria Island</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 500,
                            color: "text.primary",
                            fontSize: "0.95rem",
                        }}
                    >
                        • Upload photo file
                    </Typography>
                    <Box
                        sx={{
                            border: "1px dashed #ccc",
                            borderRadius: 1,
                            p: 3,
                            textAlign: "center",
                            backgroundColor: "#f9f9f9",
                            mt: 1,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Drag & Drop file or
                        </Typography>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUpload />}
                            sx={{
                                mt: 1,
                                textTransform: "none",
                                borderColor: "#2196f3",
                                color: "#2196f3",
                                "&:hover": {
                                    borderColor: "#1976d2",
                                    backgroundColor: "rgba(33, 150, 243, 0.04)",
                                },
                            }}
                        >
                            Browse file
                            <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                        </Button>
                        {file && (
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Selected file: {file.name}
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 500,
                            color: "text.primary",
                            fontSize: "0.95rem",
                        }}
                    >
                        • Description of product :
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Write description of product here..."
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{ mt: 1 }}
                    />
                </Box>

                <Box sx={{ mt: 3 }}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={formData.agreeToTerms} onChange={handleChange} name="agreeToTerms" color="primary" />
                        }
                        label={
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                you agree to our{" "}
                                <Link href="#" underline="hover" sx={{ color: "#2196f3" }}>
                                    Terms & Conditions
                                </Link>{" "}
                                and{" "}
                                <Link href="#" underline="hover" sx={{ color: "#2196f3" }}>
                                    Privacy & Cookies Policy
                                </Link>
                            </Typography>
                        }
                    />
                </Box>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            px: 4,
                            py: 1,
                            borderRadius: 28,
                            backgroundColor: "#2196f3",
                            "&:hover": {
                                backgroundColor: "#1976d2",
                            },
                            textTransform: "none",
                            fontWeight: 500,
                            minWidth: 180,
                        }}
                        disabled={!formData.agreeToTerms}
                    >
                        Start Advertising
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

