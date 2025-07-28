"use client"

import { useState } from "react"
import {
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"
import { FilterAlt, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers"
import { format } from "date-fns"

// Sample data - replace with your API call
const sampleDealers = [
    {
        id: "00001",
        name: "Christine Brooks",
        address: "089 Kutch Green Apt. 448",
        date: "04 Sep 2019",
        type: "Electric",
        status: "Completed",
    },
    {
        id: "00002",
        name: "Rosie Pearson",
        address: "979 Immanuel Ferry Suite 526",
        date: "28 May 2019",
        type: "Book",
        status: "Processing",
    },
    {
        id: "00003",
        name: "Darrell Caldwell",
        address: "8587 Frida Ports",
        date: "23 Nov 2019",
        type: "Medicine",
        status: "Rejected",
    },
    {
        id: "00004",
        name: "Gilbert Johnston",
        address: "768 Destiny Lake Suite 600",
        date: "05 Feb 2019",
        type: "Mobile",
        status: "Completed",
    },
    {
        id: "00005",
        name: "Alan Cain",
        address: "042 Mylene Throughway",
        date: "29 Jul 2019",
        type: "Watch",
        status: "Processing",
    },
    {
        id: "00006",
        name: "Alfred Murray",
        address: "543 Weimann Mountain",
        date: "15 Aug 2019",
        type: "Medicine",
        status: "Completed",
    },
    {
        id: "00007",
        name: "Maggie Sullivan",
        address: "New Scotteberg",
        date: "21 Dec 2019",
        type: "Watch",
        status: "Processing",
    },
    {
        id: "00008",
        name: "Rosie Todd",
        address: "New Jon",
        date: "30 Apr 2019",
        type: "Medicine",
        status: "On Hold",
    },
    {
        id: "00009",
        name: "Dollie Hines",
        address: "124 Lyla Forge Suite 975",
        date: "09 Jan 2019",
        type: "Book",
        status: "In Transit",
    },
    {
        id: "00008",
        name: "Rosie Todd",
        address: "New Jon",
        date: "30 Apr 2019",
        type: "Medicine",
        status: "On Hold",
    },
    {
        id: "00009",
        name: "Dollie Hines",
        address: "124 Lyla Forge Suite 975",
        date: "09 Jan 2019",
        type: "Book",
        status: "In Transit",
    },
    {
        id: "00008",
        name: "Rosie Todd",
        address: "New Jon",
        date: "30 Apr 2019",
        type: "Medicine",
        status: "On Hold",
    },
    {
        id: "00009",
        name: "Dollie Hines",
        address: "124 Lyla Forge Suite 975",
        date: "09 Jan 2019",
        type: "Book",
        status: "In Transit",
    },
]

// State options
const stateOptions = ["Guj", "MH", "Delhi", "Rj", "Mp", "Up", "J & K", "Odisha"]

// City options (example)
const cityOptions = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Pune"]

export default function DealerList() {
    const [dealers, setDealers] = useState(sampleDealers)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [date, setDate] = useState(new Date("2019-02-14"))

    // Popover states
    const [dateAnchorEl, setDateAnchorEl] = useState(null)
    const [stateAnchorEl, setStateAnchorEl] = useState(null)
    const [cityAnchorEl, setCityAnchorEl] = useState(null)

    const [selectedStates, setSelectedStates] = useState([])
    const [selectedCities, setSelectedCities] = useState([])

    // Popover open states
    const isDateOpen = Boolean(dateAnchorEl)
    const isStateOpen = Boolean(stateAnchorEl)
    const isCityOpen = Boolean(cityAnchorEl)

    // Popover handlers
    const handleDateClick = (event) => {
        setDateAnchorEl(event.currentTarget)
    }

    const handleStateClick = (event) => {
        setStateAnchorEl(event.currentTarget)
    }

    const handleCityClick = (event) => {
        setCityAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setDateAnchorEl(null)
        setStateAnchorEl(null)
        setCityAnchorEl(null)
    }

    // Function to render status chip with appropriate color
    // Function to render status chip with appropriate color
    // Function to render status chip with appropriate color
    const renderStatusChip = (status) => {
        // Default styles
        let primaryColor = "#00B69B" // Default success green
        let textColor = "#00B69B" // Default text white
        const variant = "filled"

        // Set custom colors based on status
        if (status === "Processing") {
            primaryColor = "#6226EF" // Custom purple color
        } else if (status === "Rejected") {
            primaryColor = "#EF3826" // Custom red color
        } else if (status === "On Hold") {
            primaryColor = "#FFA756" // Custom orange color
            textColor = "#000" // Black text for better contrast on orange
        } else if (status === "In Transit") {
            primaryColor = "#BA29FF" // Custom blue color
        }

        // Convert hex to rgba for background with 40% opacity
        const hexToRgba = (hex, alpha = 1) => {
            // Remove # if present
            hex = hex.replace('#', '');

            // Parse the hex values
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            // Return rgba string
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        const bgColor = hexToRgba(primaryColor, 0.3); // 40% opacity

        return (
            <Chip
                label={status}
                size="small"
                variant={variant}
                sx={{
                    borderRadius: "5px",
                    paddingX: "8px",
                    fontWeight: 'bold',
                    bgcolor: bgColor,
                    color: primaryColor, // Text uses the full opacity primary color
                    '& .MuiChip-label': {
                        color: primaryColor
                    }
                }}
            />
        )
    }

    // Toggle state selection
    const toggleState = (state) => {
        if (selectedStates.includes(state)) {
            setSelectedStates(selectedStates.filter((s) => s !== state))
        } else {
            setSelectedStates([...selectedStates, state])
        }
    }

    // Toggle city selection
    const toggleCity = (city) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(selectedCities.filter((c) => c !== city))
        } else {
            setSelectedCities([...selectedCities, city])
        }
    }

    // Reset filters
    const resetFilters = () => {
        setDate(new Date("2019-02-14"))
        setSelectedStates([])
        setSelectedCities([])
    }

    // Apply filters
    const applyFilters = () => {
        handleClose()
        // Here you would typically call an API with the filter values
        console.log("Applied filters:", { date, selectedStates, selectedCities })
    }

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dealers.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(dealers.length / itemsPerPage)

    return (
        <Box sx={{ py: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dealer Lists
            </Typography>

            {/* Filter Section */}
            <Paper
                variant="outlined"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    borderRadius: 1,
                    mb: 3,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRight: 1,
                        borderColor: "divider",
                    }}
                >
                    <FilterAlt sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2" fontWeight="medium">
                        Filter By
                    </Typography>
                </Box>

                {/* Date Filter */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRight: 1,
                        borderColor: "divider",
                        minWidth: 180,
                        cursor: "pointer",
                    }}
                    onClick={handleDateClick}
                >
                    <Typography variant="body2" fontWeight="medium">
                        {format(date, "dd MMM yyyy")}
                    </Typography>
                    <KeyboardArrowDown sx={{ fontSize: 20 }} />
                </Box>

                <Popover
                    open={isDateOpen}
                    anchorEl={dateAnchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <Box sx={{ p: 2, width: 320 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                                {format(date, "MMMM yyyy")}
                            </Typography>
                            <Box>
                                <IconButton size="small">
                                    <KeyboardArrowLeft fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                    <KeyboardArrowRight fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} sx={{ width: "100%" }} />
                        </LocalizationProvider>

                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                            *You can choose multiple date
                        </Typography>

                        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={applyFilters}>
                            Apply Now
                        </Button>
                    </Box>
                </Popover>

                {/* State Filter */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRight: 1,
                        borderColor: "divider",
                        minWidth: 180,
                        cursor: "pointer",
                    }}
                    onClick={handleStateClick}
                >
                    <Typography variant="body2" fontWeight="medium">
                        State
                    </Typography>
                    <KeyboardArrowDown sx={{ fontSize: 20 }} />
                </Box>

                <Popover
                    open={isStateOpen}
                    anchorEl={stateAnchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <Box sx={{ p: 2, width: 320 }}>
                        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
                            Select Dealer's State
                        </Typography>

                        <Grid container spacing={1}>
                            {stateOptions.map((state) => (
                                <Grid item xs={6} key={state}>
                                    <Button
                                        variant={selectedStates.includes(state) ? "contained" : "outlined"}
                                        color={selectedStates.includes(state) ? "primary" : "inherit"}
                                        onClick={() => toggleState(state)}
                                        fullWidth
                                        sx={{
                                            borderRadius: 20,
                                            textTransform: "none",
                                        }}
                                    >
                                        {state}
                                    </Button>
                                </Grid>
                            ))}
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    fullWidth
                                    sx={{
                                        borderRadius: 20,
                                        textTransform: "none",
                                    }}
                                >
                                    &gt;
                                </Button>
                            </Grid>
                        </Grid>

                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                            *You can choose multiple States
                        </Typography>

                        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={applyFilters}>
                            Apply Now
                        </Button>
                    </Box>
                </Popover>

                {/* City Filter */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRight: 1,
                        borderColor: "divider",
                        minWidth: 180,
                        cursor: "pointer",
                    }}
                    onClick={handleCityClick}
                >
                    <Typography variant="body2" fontWeight="medium">
                        City
                    </Typography>
                    <KeyboardArrowDown sx={{ fontSize: 20 }} />
                </Box>

                <Popover
                    open={isCityOpen}
                    anchorEl={cityAnchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <Box sx={{ p: 2, width: 320 }}>
                        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
                            Select City
                        </Typography>

                        <Grid container spacing={1}>
                            {cityOptions.map((city) => (
                                <Grid item xs={6} key={city}>
                                    <Button
                                        variant={selectedCities.includes(city) ? "contained" : "outlined"}
                                        color={selectedCities.includes(city) ? "primary" : "inherit"}
                                        onClick={() => toggleCity(city)}
                                        fullWidth
                                        sx={{
                                            borderRadius: 20,
                                            textTransform: "none",
                                        }}
                                    >
                                        {city}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                            *You can choose multiple cities
                        </Typography>

                        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={applyFilters}>
                            Apply Now
                        </Button>
                    </Box>
                </Popover>

                {/* Reset Filter */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        ml: "auto",
                        cursor: "pointer",
                    }}
                    onClick={resetFilters}
                >
                    <Typography variant="body2" fontWeight="medium" color="error">
                        Reset Filter
                    </Typography>
                </Box>
            </Paper>

            {/* Dealers Table */}
            <TableContainer component={Paper} variant="outlined">
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>ADDRESS</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TYPE</TableCell>
                            <TableCell>STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((dealer) => (
                            <TableRow key={dealer.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {dealer.id}
                                </TableCell>
                                <TableCell>{dealer.name}</TableCell>
                                <TableCell>{dealer.address}</TableCell>
                                <TableCell>{dealer.date}</TableCell>
                                <TableCell>{dealer.type}</TableCell>
                                <TableCell>{renderStatusChip(dealer.status)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        borderTop: 1,
                        borderColor: "divider",
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, dealers.length)} of {dealers.length}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                            size="small"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
                        >
                            &lt;
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
                        >
                            &gt;
                        </IconButton>
                    </Box>
                </Box>
            </TableContainer>
        </Box>
    )
}

