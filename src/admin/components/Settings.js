
import React from "react"
import { useState, useEffect } from "react"
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material"
import { Camera } from "lucide-react"

const Settings = () => {
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [logoPreview, setLogoPreview] = useState(null)
    const [formData, setFormData] = useState({
        siteName: "",
        copyright: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        logo: null
    })

    // Fetch existing settings on component mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch("/api/settings")
                if (!response.ok) {
                    throw new Error("Failed to fetch settings")
                }

                const data = await response.json()
                setFormData({
                    siteName: data.siteName || "",
                    copyright: data.copyright || "",
                    seoTitle: data.seoTitle || "",
                    seoDescription: data.seoDescription || "",
                    seoKeywords: data.seoKeywords || "",
                    logo: null,
                })

                if (data.logoUrl) {
                    setLogoPreview(data.logoUrl)
                }
            } catch (err) {
                console.error("Error fetching settings:")
            } finally {
                setLoadingData(false)
            }
        }

        // Comment out to use mock data instead of API call
        // fetchSettings();

        // Mock data for development
        setTimeout(() => {
            setFormData({
                siteName: "Bright Web",
                copyright: "All rights Reserved@brightweb",
                seoTitle: "Bright web is a hybrid dashboard",
                seoDescription: "Bright web is a hybrid dashboard",
                seoKeywords: "CEO",
                logo: null,
            })
            setLoadingData(false)
        }, 500)
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleLogoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setFormData({
                ...formData,
                logo: file,
            })

            // Create preview
            const reader = new FileReader()
            reader.onload = (event) => {
                setLogoPreview(event.target?.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // Create FormData object for file upload
            const submitData = new FormData()
            submitData.append("siteName", formData.siteName)
            submitData.append("copyright", formData.copyright)
            submitData.append("seoTitle", formData.seoTitle)
            submitData.append("seoDescription", formData.seoDescription)
            submitData.append("seoKeywords", formData.seoKeywords)

            if (formData.logo) {
                submitData.append("logo", formData.logo)
            }

            // Make POST request to API
            const response = await fetch("/api/settings", {
                method: "POST",
                body: submitData,
                // Note: Don't set Content-Type header when using FormData
            })

            if (!response.ok) {
                throw new Error("Failed to save settings")
            }

            setSuccess(true)
        } catch {
            setError("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => {
        setSuccess(false)
    }

    if (loadingData) {
        return (
            <Container maxWidth="md" className="py-8 flex justify-center items-center" style={{ minHeight: "50vh" }}>
                <CircularProgress />
            </Container>
        )
    }

    return (
        <Container className="py-8">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                General Settings
            </Typography>
            <Box className="bg-white rounded-lg shadow-sm p-6">

                <form onSubmit={handleSubmit}>
                    <Box className="flex flex-col items-center mb-8">
                        <Box
                            className="relative mb-2 cursor-pointer"
                            onClick={() => document.getElementById("logo-upload")?.click()}
                        >
                            <Avatar src={logoPreview || ""} className="w-24 h-24 bg-gray-100" sx={{ width: 96, height: 96 }}>
                                {!logoPreview && <Camera className="text-gray-400" size={32} />}
                            </Avatar>
                            <input type="file" id="logo-upload" accept="image/*" className="hidden" onChange={handleLogoChange} />
                        </Box>
                        <Typography
                            variant="body2"
                            color="primary"
                            className="text-sm cursor-pointer"
                            onClick={() => document.getElementById("logo-upload")?.click()}
                        >
                            Upload Logo
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Site Name"
                                name="siteName"
                                value={formData.siteName}
                                onChange={handleInputChange}
                                placeholder="Enter site name"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Copy Right"
                                name="copyright"
                                value={formData.copyright}
                                onChange={handleInputChange}
                                placeholder="Enter copyright text"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="SEO Title"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleInputChange}
                                placeholder="Enter SEO title"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="SEO Description"
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleInputChange}
                                placeholder="Enter SEO description"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="SEO Keywords"
                                name="seoKeywords"
                                value={formData.seoKeywords}
                                onChange={handleInputChange}
                                placeholder="Enter SEO keywords"
                                variant="outlined"
                                className="bg-gray-50"
                                required
                            />
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
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
                        </Button>
                    </Box>
                </form>
            </Box>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Settings saved successfully!
                </Alert>
            </Snackbar>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
                <Alert onClose={() => setError("")} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Settings

