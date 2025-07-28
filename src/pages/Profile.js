"use client"

import { useState } from "react"
import { Container, Box, Tabs, Tab, Typography, useMediaQuery, useTheme } from "@mui/material"
import NewAdvertisement from "../admin/components/userProfile/Newad"
import YourPosts from "../admin/components/userProfile/yourPost"
import ProfileSidebar from "../admin/components/userProfile/ProfileSidebar"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ProfilePage() {
    const [tabValue, setTabValue] = useState(0)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const [userProfile, setUserProfile] = useState({
        name: "Melissa peters",
        role: "Dealer",
        location: "Lagos, Nigeria",
        // address: "Shop full address, Not otaraak fiddomba.",
        email: "example@xyz.com",
        phone: "9313875648",
        avatar: "/3.png",
        funds: 30000,
    })

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    return (
        <>
            <Navbar />
            <Container
                className="max-w-7xl"
                sx={{
                    py: { xs: 2, md: 2 },
                    px: { xs: 1, sm: 2, md: 3 },
                    minHeight: "100vh",
                }}
            >
                <div style={{
                    backgroundColor: "#f0f0f0",
                    backgroundImage: "url(/test1.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: '30dvh'
                }}>

                </div>
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        flexDirection: { xs: "column", md: "row" },
                        position: "relative",
                    }}
                >
                    <div className="md:w-1/3 w-full md:-mt-10">
                        <ProfileSidebar profile={userProfile} />
                    </div>

                    <Box sx={{ flexGrow: 1 }} className='md:w-3/4'>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                sx={{
                                    "& .MuiTabs-indicator": {
                                        backgroundColor: "#2196f3",
                                        height: 3,
                                    },
                                    "& .MuiTab-root": {
                                        textTransform: "none",
                                        fontWeight: 500,
                                        fontSize: "1rem",
                                        color: "text.secondary",
                                        "&.Mui-selected": {
                                            color: "#2196f3",
                                            fontWeight: 600,
                                        },
                                    },
                                }}
                            >
                                <Tab label="Your Posts" />
                                <Tab label="New Advertisement" />
                            </Tabs>

                            {!isMobile && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        backgroundColor: "#4caf50",
                                        color: "white",
                                        py: 0.5,
                                        px: 2,
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography variant="body2" fontWeight="medium">
                                        Your Fund
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        $ {userProfile.funds.toLocaleString()}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
                            <YourPosts />
                        </Box>

                        <Box sx={{ display: tabValue === 1 ? "block" : "none" }}>
                            <NewAdvertisement />
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </>
    )
}

