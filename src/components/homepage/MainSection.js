"use client"

import { useState } from "react"
import {
    ChevronRight,
    CreditCard,
    CupSoda,
    Droplets,
    GlassWater,
    IceCream2,
    Package,
    Refrigerator,
    Shield,
    Snowflake,
    ThermometerSnowflake,
    Truck,
    Wind
} from "lucide-react"
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    Typography,
    Paper,
    Container,
    useTheme,
    useMediaQuery
} from "@mui/material"
import { Water } from "@mui/icons-material"

const navigationItems = [
    { label: "Air conditioners", icon: <Snowflake className="w-4 h-4" /> },
    { label: "Air coolers", icon: <Droplets className="w-4 h-4" /> },
    { label: "Water purifiers", icon: <Water className="w-4 h-4" /> },
    { label: "Air purifies", icon: <Wind className="w-4 h-4" /> },
    { label: "Fridge", icon: <Refrigerator className="w-4 h-4" /> },
    { label: "Bottom Fridge", icon: <ThermometerSnowflake className="w-4 h-4" /> },
    { label: "Ice Makers", icon: <IceCream2 className="w-4 h-4" /> },
    { label: "Deep Freezers", icon: <ThermometerSnowflake className="w-4 h-4" /> },
    { label: "Water Dispenser", icon: <CupSoda className="w-4 h-4" /> },
    { label: "Top Door Water cooler", icon: <GlassWater className="w-4 h-4" /> },
    { label: "Vertical air conditioners", icon: <ThermometerSnowflake className="w-4 h-4" /> },
]

const features = [
    {
        icon: CreditCard,
        title: "Payment only online",
        description: "Tagliapietra betaendeskapp. Mobile checkout. Vip laminas.",
    },
    {
        icon: Package,
        title: "New stocks and sales",
        description: "Tagliapietra betaendeskapp. Mobile checkout. Vip laminas.",
    },
    {
        icon: Shield,
        title: "Quality assurance",
        description: "Tagliapietra betaendeskapp. Mobile checkout. Vip laminas.",
    },
    {
        icon: Truck,
        title: "Delivery from 1 hour",
        description: "Tagliapietra betaendeskapp. Mobile checkout. Vip laminas.",
    },
]

const promotions = [
    {
        tag: "Only This Week",
        title: "Quality Air at an affordable price",
        description: "Est eos aperiri vix",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        tag: "Only This Week",
        title: "Air that nourishes our mind and body",
        description: "Soluta voluptatibus",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        tag: "Only This Week",
        title: "Unbeatable quality, unbeatable prices.",
        description: "Only this week, Don't miss",
        image: "/placeholder.svg?height=200&width=300",
    },
]

function Sidebar() {
    return (
        <Box sx={{ width: 256, height: '100%', bgcolor: 'white', borderRight: '1px solid #e0e0e0' }}>
            <Box sx={{ p: 2 }}>
                {navigationItems.map((item, index) => (
                    <Paper
                        key={index}
                        elevation={0}
                        sx={{
                            p: 1.5,
                            mb: 1,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            '&:hover': {
                                bgcolor: 'grey.50',
                                '& .chevron-icon': {
                                    color: 'grey.600'
                                }
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box className='flex gap-3'>
                                {item.icon}
                                <Typography variant="body2" sx={{ color: 'grey.700' }}>
                                    {item.label}
                                </Typography>
                            </Box>
                            <ChevronRight
                                className="chevron-icon"
                                style={{ width: 16, height: 16, color: '#9e9e9e' }}
                            />
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    )
}

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const theme = useTheme()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <Box sx={{ bgcolor: 'grey.50', height: "auto" }}>
            <Box sx={{ display: 'flex' }}>
                {/* Desktop Sidebar */}
                {isLargeScreen && (
                    <Box sx={{ width: 256, height: '100%', zIndex: 1000 }}>
                        <Sidebar />
                    </Box>
                )}

                {/* Mobile Menu Button */}
                {/* {!isLargeScreen && (
                    <IconButton
                        onClick={() => setSidebarOpen(true)}
                        sx={{
                            position: 'fixed',
                            top: 16,
                            left: 16,
                            zIndex: 1300,
                            bgcolor: 'white',
                            border: '1px solid #e0e0e0',
                            '&:hover': { bgcolor: 'grey.50' }
                        }}
                    >
                        <Menu />
                    </IconButton>
                )} */}

                {/* Mobile Drawer */}
                {/* <Drawer
                    anchor="left"
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    sx={{ display: { lg: 'none' } }}
                >
                    <Sidebar />
                </Drawer> */}

                {/* Main Content */}
                <Box sx={{ flexGrow: 1, ml: isLargeScreen ? '0px' : 0 }} >
                    {/* Hero Section */}
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #f3e8ff 0%, #dbeafe 100%)',
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src="/Tabpanel.png"
                            alt="Air Conditioning Unit"
                            style={{
                                width: '100%',
                                height: 'auto',
                                // maxWidth: '500px'
                            }}
                        />
                        {/* <Container>
                            <Grid container spacing={4} alignItems="center">
                                <Grid item xs={12} lg={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Chip
                                            label="Weekend Discount"
                                            sx={{
                                                bgcolor: '#dcfce7',
                                                color: '#166534',
                                                alignSelf: 'flex-start'
                                            }}
                                        />

                                        <Typography
                                            variant="h2"
                                            component="h1"
                                            fontWeight="bold"
                                            sx={{
                                                fontSize: { xs: '2rem', lg: '3rem' },
                                                lineHeight: 1.2,
                                                color: 'grey.900'
                                            }}
                                        >
                                            Get the best quality products at the{' '}
                                            <Box component="span" sx={{ color: 'purple.main' }}>
                                                lowest prices
                                            </Box>
                                        </Typography>

                                        <Typography variant="h6" sx={{ color: 'grey.600' }}>
                                            We have prepared special discounts for you on AC products. Don't miss these opportunities...
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                sx={{
                                                    bgcolor: '#7c3aed',
                                                    '&:hover': { bgcolor: '#6d28d9' },
                                                    textTransform: 'none'
                                                }}
                                            >
                                                Shop Now
                                            </Button>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="h4" fontWeight="bold" sx={{ color: 'error.main' }}>
                                                    $27.99
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        color: 'grey.500',
                                                        textDecoration: 'line-through'
                                                    }}
                                                >
                                                    $66.67
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <img
                                            src="/placeholder.svg?height=400&width=600"
                                            alt="Air Conditioning Unit"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxWidth: '500px'
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                        </Container> */}
                    </Box>

                    {/* Features Section */}
                    {/* <Container maxWidth="xl" sx={{ py: 6 }}>
                        <Grid container spacing={3}>
                            {features.map((feature, index) => {
                                const IconComponent = feature.icon
                                return (
                                    <Grid item xs={12} sm={6} lg={3} key={index}>
                                        <Card
                                            elevation={1}
                                            sx={{
                                                textAlign: 'center',
                                                p: 3,
                                                height: '100%',
                                                transition: 'box-shadow 0.3s',
                                                '&:hover': {
                                                    boxShadow: 4
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                <Box
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        bgcolor: '#fff7ed',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mx: 'auto'
                                                    }}
                                                >
                                                    <IconComponent style={{ width: 24, height: 24, color: '#ea580c' }} />
                                                </Box>
                                                <Typography variant="h6" fontWeight="600" sx={{ color: 'grey.900' }}>
                                                    {feature.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'grey.600' }}>
                                                    {feature.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container> */}

                </Box>
            </Box>
        </Box>
    )
}