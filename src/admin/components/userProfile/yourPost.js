"use client"

import { useState } from "react"
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
    Chip,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import { LocationOn, FilterList, KeyboardArrowDown } from "@mui/icons-material"

export default function YourPosts() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [filterAnchorEl, setFilterAnchorEl] = useState(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget)
    }

    const handleFilterClose = () => {
        setFilterAnchorEl(null)
    }

    // Sample post data
    const posts = [
        {
            id: 1,
            title:
                "Godrej 5-in-1 Convertible Cooling 2024 Model 1.5 Ton 3 Star Split Inverter Heavy Duty Cooling at Extreme Temperature AC - White",
            image: "/test1.jpg",
            location: "Lagos, Nigeria",
            views: 37000,
            price: 30000,
        },
        {
            id: 2,
            title:
                "Godrej 5-in-1 Convertible Cooling 2024 Model 1.5 Ton 3 Star Split Inverter Heavy Duty Cooling at Extreme Temperature AC - White",
            image: "/test1.jpg",
            location: "Lagos, Nigeria",
            views: 37000,
            price: 30000,
        },
        {
            id: 3,
            title:
                "Godrej 5-in-1 Convertible Cooling 2024 Model 1.5 Ton 3 Star Split Inverter Heavy Duty Cooling at Extreme Temperature AC - White",
            image: "/test1.jpg",
            location: "Lagos, Nigeria",
            views: 37000,
            price: 30000,
        },
    ]

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mb: 2,
                    gap: 1,
                }}
            >
                <Button
                    startIcon={<FilterList />}
                    endIcon={<KeyboardArrowDown />}
                    onClick={handleFilterClick}
                    size="small"
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        borderColor: "#e0e0e0",
                        color: "text.primary",
                    }}
                >
                    Filter By
                </Button>
                <Menu
                    anchorEl={filterAnchorEl}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleFilterClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem onClick={handleFilterClose}>Date</MenuItem>
                    <MenuItem onClick={handleFilterClose}>State</MenuItem>
                    <MenuItem onClick={handleFilterClose}>City</MenuItem>
                    <MenuItem onClick={handleFilterClose}>Run time</MenuItem>
                </Menu>
            </Box>

            <Box sx={{ mb: 4 }}>
                {posts.map((post, index) => (
                    <Card
                        key={post.id}
                        sx={{
                            display: "flex",
                            mb: 2,
                            overflow: "hidden",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            boxShadow: "none",
                            flexDirection: { xs: "column", sm: "row" },
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                width: { xs: "100%", sm: 350 },
                                height: { xs: 200, sm: 180 },
                                objectFit: "cover",
                            }}
                            image={post.image}
                            alt={post.title}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                                width: { xs: "100%", sm: "auto" },
                            }}
                        >
                            <CardContent sx={{ flex: "1 0 auto", pb: 1 }}>
                                <Typography
                                    component="div"
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 500,
                                        mb: 1,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {post.title}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <LocationOn fontSize="small" color="action" sx={{ mr: 0.5, fontSize: 16 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {post.location}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    px: 2,
                                    pb: 1.5,
                                    flexDirection: { xs: "column", md: "row" },
                                    alignItems: { xs: "flex-start", md: "center" },
                                    gap: { xs: 1, md: 0 },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mr: { md: "auto" },
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ fontSize: "1.1rem" }}>
                                        {post.views / 1000}K
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, fontSize: "0.8rem" }}>
                                        views
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        width: { xs: "100%", md: "auto" },
                                        justifyContent: { xs: "space-between", md: "flex-end" },
                                    }}
                                >
                                    <Chip
                                        label={`$ ${post.price.toLocaleString()}`}
                                        color="success"
                                        sx={{
                                            fontWeight: "bold",
                                            height: 32,
                                            borderRadius: 1,
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        sx={{
                                            borderRadius: 1,
                                            textTransform: "none",
                                            px: 2,
                                            height: 32,
                                        }}
                                    >
                                        Stop Add
                                    </Button>
                                </Box>
                            </Box>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    px: 2,
                                    pb: 1.5,
                                    fontSize: "0.7rem",
                                }}
                            >
                                Advertisement spent
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

