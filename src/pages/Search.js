"use client"

import { useEffect, useState } from "react"
import "../search-page.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, Slider } from "@mui/material"

const SearchPage = () => {
    // State for price range
    const [minPrice, setMinPrice] = useState("0")
    const [maxPrice, setMaxPrice] = useState("30")
    const [value, setValue] = useState([20, 37]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [expanded, setExpanded] = useState(true);
    // State for selected category
    const [selectedCategory, setSelectedCategory] = useState("fruits-vegetables")
    // State for favorites
    const [favorites, setFavorites] = useState({})
    // State for view mode (grid or list)
    const [viewMode, setViewMode] = useState("grid")
    function valuetext(value) {
        return `${value}°C`;
    }
    // Toggle favorite
    const toggleFavorite = (productId) => {
        setFavorites((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }))
    }

    useEffect(() => {
        const handleResize = () => {
            setExpanded(window.innerWidth >= 768); // Open on desktop, closed on mobile
        };
        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // Clear filters
    const clearFilters = () => {
        setMinPrice("0")
        setMaxPrice("30")
        setSelectedCategory("")
    }

    // Toggle view mode
    const toggleViewMode = (mode) => {
        setViewMode(mode)
    }

    // Mock product data
    const products = Array(6)
        .fill(null)
        .map((_, index) => ({
            id: index + 1,
            title:
                "Godrej 5-in-1 Convertible Cooling 2024 Model 1.5 Ton 3 Star Split Inverter Heavy Duty Cooling at Extreme Temperature AC - White...",
            image: "/test2.jpg",
            discount: index % 3 === 0 ? "75%" : index % 3 === 1 ? "41%" : "43%",
            powerUsage: "966.34 W",
            roomSize: "111 - 150 sqft",
            rating: 3,
            isOrganic: index % 3 === 0,
            timeLeft: {
                hours: index % 3 === 0 ? "84" : index % 3 === 1 ? "68" : "52",
                minutes: "06",
                seconds: "57",
                offerEnd: "08",
            },
        }))

    return (
        <>
            <Navbar />
            <div className="search-page">
                <div className="search-container">
                    {/* Left Sidebar */}
                    <div className="sidebar">
                        {/* Price Filter */}
                        <Accordion defaultExpanded={expanded}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header">
                                <Typography component="span" className="filter-title">
                                    Widget price filter
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="price-inputs">
                                    <div className="price-input-group">
                                        <label className="price-label">Min price</label>
                                        <input
                                            type="text"
                                            className="price-input"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                        />
                                    </div>
                                    <span className="price-separator">-</span>
                                    <div className="price-input-group">
                                        <label className="price-label">Max price</label>
                                        <input
                                            type="text"
                                            className="price-input"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="price-slider">
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={value}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                    />
                                </div>
                                <div className="price-range">
                                    <span>
                                        Price: ${minPrice} — ${maxPrice}
                                    </span>
                                    <button className="filter-button">Filter</button>
                                </div>

                            </AccordionDetails>
                        </Accordion>


                        {/* Product Categories */}
                        <Accordion defaultExpanded={expanded}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header">
                                <Typography component="span" className="filter-title">
                                    Product Categories
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <ul className="category-list">
                                    <li className="category-item selected">
                                        <Checkbox />
                                        <span className="category-name">Fruits & Vegetables</span>
                                    </li>
                                    {Array(9)
                                        .fill(null)
                                        .map((_, index) => (
                                            <li key={index} className="category-item">
                                                <Checkbox />
                                                <span className="category-name">xyz</span>
                                            </li>
                                        ))}
                                </ul>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded={expanded}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" className="filter-title">
                                    Filter by Color
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul className="filter-list">
                                    <li className="filter-item">
                                        <span className="radio-button green checked"></span>
                                        <Checkbox />

                                        <span className="filter-name">Green</span>
                                        <span className="filter-count">(1)</span>
                                    </li>
                                </ul>                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded={expanded}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" className="filter-title">
                                    Filter by Brands
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul className="filter-list">
                                    <li className="filter-item">
                                        <Checkbox />
                                        <span className="filter-name">Fresh</span>
                                        <span className="filter-count">(1)</span>
                                    </li>
                                </ul>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded={expanded}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="span" className="filter-title">
                                    Product Status
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ul className="filter-list">
                                    <li className="filter-item">
                                        <Checkbox />
                                        <span className="filter-name">In Stock</span>
                                    </li>
                                    <li className="filter-item">
                                        <Checkbox />
                                        <span className="filter-name">On Sale</span>
                                    </li>
                                </ul>                            </AccordionDetails>
                        </Accordion>










                    </div>

                    {/* Main Content */}
                    <div className="main-content">
                        {/* Filter Bar */}
                        <div className="filter-bar">
                            <div className="active-filters">
                                <button className="clear-filters" onClick={clearFilters}>
                                    <span className="clear-icon">x</span> Clear filters
                                </button>
                                <span className="filter-tag">
                                    <span className="filter-icon"></span> Fruits & Vegetables
                                </span>
                                <span className="results-count">Showing 1-20 of 34 results</span>
                            </div>

                            <div className="view-options">
                                <div className="sort-option">
                                    <span className="sort-label">Sort:</span>
                                    <select className="sort-select">
                                        <option>Sort by latest</option>
                                        <option>Sort by popularity</option>
                                        <option>Sort by price: low to high</option>
                                        <option>Sort by price: high to low</option>
                                    </select>
                                </div>

                                <div className="display-options">
                                    <span className="display-label">Show:</span>
                                    <select className="display-select">
                                        <option>20 items</option>
                                        <option>40 items</option>
                                        <option>60 items</option>
                                    </select>

                                    <div className="view-mode">
                                        <button
                                            className={`view-button grid ${viewMode === "grid" ? "active" : ""}`}
                                            onClick={() => toggleViewMode("grid")}
                                        >
                                            <svg viewBox="0 0 24 24" width="18" height="18">
                                                <rect x="3" y="3" width="7" height="7" />
                                                <rect x="14" y="3" width="7" height="7" />
                                                <rect x="3" y="14" width="7" height="7" />
                                                <rect x="14" y="14" width="7" height="7" />
                                            </svg>
                                        </button>
                                        <button
                                            className={`view-button list ${viewMode === "list" ? "active" : ""}`}
                                            onClick={() => toggleViewMode("list")}
                                        >
                                            <svg viewBox="0 0 24 24" width="18" height="18">
                                                <rect x="3" y="3" width="18" height="4" />
                                                <rect x="3" y="10" width="18" height="4" />
                                                <rect x="3" y="17" width="18" height="4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid/List */}
                        <div className={`product-${viewMode}`}>
                            {products.map((product) => (
                                <div key={product.id} className="product-card">
                                    <div className="product-discount">{product.discount}</div>
                                    <button
                                        className={`favorite-button ${favorites[product.id] ? "active" : ""}`}
                                        onClick={() => toggleFavorite(product.id)}
                                    >
                                        <svg viewBox="0 0 24 24" width="20" height="20">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>

                                    <div className="product-image">
                                        <img src={product.image || "/placeholder.svg"} alt={product.title} />
                                    </div>

                                    <div className="product-details">
                                        {product.isOrganic && <div className="organic-badge">ORGANIC</div>}

                                        <h3 className="product-title">{product.title}</h3>

                                        <div className="product-specs">
                                            <div className="spec-item">
                                                <span className="spec-bullet">•</span>
                                                <span className="spec-text">Annual Power Usage: {product.powerUsage}</span>
                                            </div>
                                            <div className="spec-item">
                                                <span className="spec-bullet">•</span>
                                                <span className="spec-text">Room Size: {product.roomSize}</span>
                                            </div>
                                        </div>

                                        <div className="product-rating">
                                            <div className="stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`star ${i < product.rating ? "filled" : ""}`}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="rating-value">{product.rating}</span>
                                        </div>

                                        <div className="product-availability">
                                            <div className="timer">
                                                <span className="time-block">{product.timeLeft.hours}</span>
                                                <span className="time-separator">:</span>
                                                <span className="time-block">{product.timeLeft.minutes}</span>
                                                <span className="time-separator">:</span>
                                                <span className="time-block">{product.timeLeft.seconds}</span>
                                                <span className="time-separator">:</span>
                                                <span className="time-block">{product.timeLeft.offerEnd}</span>
                                            </div>
                                            <span className="timer-text">Remains until the end of the offer</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchPage

