"use client"

import { useState, useEffect } from "react"
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
    Rating,
    CircularProgress,
    Alert,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import {
    Menu as MenuIcon,
    ArrowForward as ArrowForwardIcon,
    ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material"

const navigationItems = [
    "Air conditioners",
    "Air coolers",
    "Water purifiers",
    "Air purifies",
    "Fridge",
    "Bottom Fridge",
    "Ice Makers",
    "Deep Freezers",
    "Water Dispenser",
    "Top Door Water cooler",
    "Vertical air conditioners",
]

// Function to truncate title to 10 words
const truncateTitle = (title, wordLimit = 10) => {
    const words = title.split(" ")
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "..."
    }
    return title
}

// Function to get current date in yyyy-mm-dd format
const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

// Function to format price in Indian currency
const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price)
}

// Product Card Component
const ProductCard = ({ product }) => {
    const theme = useTheme()

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                },
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.photo_url}
                    alt={product.title}
                    sx={{ objectFit: "contain", p: 2 }}
                />
                <Chip
                    label="Only This Week"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        backgroundColor: "#ff6b35",
                        color: "white",
                        fontWeight: "bold",
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: "bold",
                        mb: 1,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        lineHeight: 1.3,
                    }}
                >
                    {truncateTitle(product.title)}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    A different kind of AC store
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating value={product.star_rating} readOnly precision={0.1} size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            ({product.num_ratings})
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                color: "#d32f2f",
                            }}
                        >
                            {formatPrice(product.price)}
                        </Typography>
                        {product.original_price > product.price && (
                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                    textDecoration: "line-through",
                                    color: "text.secondary",
                                }}
                            >
                                {formatPrice(product.original_price)}
                            </Typography>
                        )}
                    </Box>

                    {product.original_price > product.price && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#2e7d32",
                                fontWeight: "bold",
                            }}
                        >
                            Save {formatPrice(product.original_price - product.price)}
                        </Typography>
                    )}
                </Box>

                <Button
                    variant="outlined"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        mt: "auto",
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        "&:hover": {
                            backgroundColor: "#1976d2",
                            color: "white",
                        },
                    }}
                    onClick={() => window.open(product.url, "_blank")}
                >
                    Shop Now
                </Button>
            </CardContent>
        </Card>
    )
}

// Sidebar Component
const Sidebar = ({ open, onClose }) => {
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    width: 280,
                    boxSizing: "border-box",
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    Categories
                </Typography>
                <List>
                    {navigationItems.map((item, index) => (
                        <ListItem
                            button
                            key={index}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                },
                            }}
                        >
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

// Main App Component
export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://springboot-anf-production.up.railway.app/amazon/get-by?date=2025-06-05', {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Check if the response is JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    throw new Error(`Expected JSON, got ${contentType}. Response: ${text.substring(0, 200)}...`);
                }

                const data = await response.json();
                console.log('Products:', data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts()
    }, [])

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: "#f5f5f5",}}>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 2 }}>
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
                            New Arrivals
                        </Typography>
                        <Button variant="text" endIcon={<ArrowForwardIcon />} sx={{ display: { xs: "none", sm: "flex" } }}>
                            View All
                        </Button>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Don't miss this opportunity at a special discount just for this week.
                    </Typography>
                </Box>

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                        <CircularProgress size={60} />
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        Error loading products: {error}
                    </Alert>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Empty State */}
                {!loading && !error && products.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                            No products found for today's date.
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    )
}
