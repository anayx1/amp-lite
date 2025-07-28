"use client"

// Your existing Amazon products data
const productsAmazon = [
    {
        id: "439",
        title: "Voltas 1 Ph Rot. SAC C2-N Venture I-Cassette AC (2 Ton White)",
        price: "96000",
        original_price: "NA",
        star_rating: "3.9",
        num_rating: "15",
        url: "https://www.amazon.in/dp/B00LWRR1Q6",
        asin: "B00LWRR1Q6",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/31uXFF2wVNL._AC_UY500_FMwebp_QL65_.jpg",
        min_offer_price: "3",
        is_best_seller: "96000",
        is_amazon_choice: "false",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "NA",
        date: "NA",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
    {
        id: "455",
        title: "Daikin 1.5 Ton 3 Star Inverter Split AC (F/A/DTKL50U) White",
        price: "39490",
        original_price: "58400",
        star_rating: "4.0",
        num_rating: "7",
        url: "https://www.amazon.in/dp/B09W8Y843M",
        asin: "B09W8Y843M",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/1160t+f9yDL._AC_UY466_FMwebp_QL65_.jpg",
        min_offer_price: "1",
        is_best_seller: "38899",
        is_amazon_choice: "false",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "NA",
        date: "NA",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
    {
        id: "359",
        title:
            "Voltas 1.5 Ton 3 Star, Inverter Split AC(Copper, 4 in 1 Adjustable Cooling, Anti-dust Filter, 183V Vectra Platina, White)",
        price: "33599",
        original_price: "64990",
        star_rating: "3.6",
        num_rating: "313",
        url: "https://www.amazon.in/dp/B0BBFW3G8M",
        asin: "B0BBFW3G8M",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/41TuyxwZ9mL._AC_UY654_FMwebp_QL65_.jpg",
        min_offer_price: "7",
        is_best_seller: "32590",
        is_amazon_choice: "false",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "NA",
        date: "NA",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
    {
        id: "311",
        title:
            "Lloyd 1.5 Ton 3 Star Inverter Split AC (5 in 1 Convertible, Copper, Anti-Viral + PM 2.5 Filter, White with Chrome Deco Strip, GLS18I3FWAGC)",
        price: "34490",
        original_price: "58990",
        star_rating: "4.0",
        num_rating: "3885",
        url: "https://www.amazon.in/dp/B0CCY3HLCV",
        asin: "B0CCY3HLCV",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/41D8PibHJjL._AC_UY654_FMwebp_QL65_.jpg",
        min_offer_price: "1",
        is_best_seller: "34490",
        is_amazon_choice: "false",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "1K+ bought in past month",
        date: "FREE delivery as soon as Sat, 12 Jul, 7 am - 9 pm",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
    {
        id: "312",
        title:
            "Voltas 1.5 ton 3 Star, Inverter Split AC (Copper, 4-in-1 Adjustable Mode, Anti-dust Filter,183V Vectra CAW, White)",
        price: "33990",
        original_price: "62990",
        star_rating: "3.9",
        num_rating: "3903",
        url: "https://www.amazon.in/dp/B0CWVDXYX1",
        asin: "B0CWVDXYX1",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/51hjt2Tw54L._AC_UY654_FMwebp_QL65_.jpg",
        min_offer_price: "1",
        is_best_seller: "33990",
        is_amazon_choice: "false",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "400+ bought in past month",
        date: "NA",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
    {
        id: "313",
        title:
            "Carrier 1.5 Ton 3 Star Wi-Fi Smart Flexicool Inverter Split AC (Copper, Convertible 6-in-1 Cooling,Smart Energy Display, HD & PM 2.5 Filter, ESTER EDGE FXi (Wi-Fi), CAI18EE3R35W0,White)",
        price: "35989",
        original_price: "68790",
        star_rating: "4.0",
        num_rating: "2897",
        url: "https://www.amazon.in/dp/B0DSWR3DJ3",
        asin: "B0DSWR3DJ3",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/61rlTv+QEoL._AC_UY654_FMwebp_QL65_.jpg",
        min_offer_price: "1",
        is_best_seller: "35989",
        is_amazon_choice: "false",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "1K+ bought in past month",
        date: "FREE delivery as soon as Sat, 12 Jul, 7 am - 9 pm",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
    {
        id: "314",
        title:
            "Godrej 1.5 Ton 3 Star, 5 Years Comprehensive Warranty, 5-In-1 Convertible Cooling, Inverter Split AC (Copper, 2025 Model, Heavy duty cooling at 52 °C, AC1.5T EI 18P3T WZT 3S, White)",
        price: "31990",
        original_price: "45900",
        star_rating: "3.5",
        num_rating: "1036",
        url: "https://www.amazon.in/dp/B0DR327PJK",
        asin: "B0DR327PJK",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/517x4fXJwfL._AC_UY654_FMwebp_QL65_.jpg",
        min_offer_price: "3",
        is_best_seller: "31700",
        is_amazon_choice: "true",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "1K+ bought in past month",
        date: "FREE delivery as soon as Sat, 12 Jul, 7 am - 9 pm",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
    {
        id: "315",
        title:
            "Whirlpool 1.5 Ton 3 Star, Magicool Inverter Split AC (MAGICOOL 15T 3S INV CNV S5K2PP0, Copper, Convertible 4-in-1 Cooling Mode, HD Filter White)",
        price: "32490",
        original_price: "62000",
        star_rating: "3.3",
        num_rating: "4117",
        url: "https://www.amazon.in/dp/B0DSJ9FQLD",
        asin: "B0DSJ9FQLD",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/51-qnqtzUKL._AC_UY654_FMwebp_QL65_.jpg",
        min_offer_price: "1",
        is_best_seller: "32490",
        is_amazon_choice: "false",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "1K+ bought in past month",
        date: "FREE delivery as soon as Sat, 12 Jul, 7 am - 9 pm",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
    {
        id: "316",
        title:
            "Cruise 1 Ton 3 Star Inverter Split AC with 7-Stage Air Filtration (100% Copper, Convertible 4-in-1, PM 2.5 Filter, CWCVBL-VQ1W123, White)",
        price: "25590",
        original_price: "45900",
        star_rating: "4.1",
        num_rating: "1512",
        url: "https://www.amazon.in/dp/B0D17YKRXB",
        asin: "B0D17YKRXB",
        currency: "INR",
        photo_url: "https://m.media-amazon.com/images/I/61uJMLrvuXL._AC_UY654_FMwebp_QL65_.jpg",
        min_offer_price: "1",
        is_best_seller: "25590",
        is_amazon_choice: "false",
        is_prime: "false",
        climate_pledge_friendly: "false",
        delivery: "false",
        has_variations: "300+ bought in past month",
        date: "NA",
        products_since: "false",
        pagecounts: "2025-07-10",
    },
]

// Product Card Component with React Router navigation
function ProductCard({ product, onProductClick }) {
    const handleClick = () => {
        onProductClick(product)
    }

    return (
        <div
            className="rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleClick}
        >
            <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-contain h-full w-full p-5"
                />
            </div>
            <div className="p-3">
                <p className="text-orange-500 text-sm font-semibold mb-2">{product.tag}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.title.split(" ").slice(0, 7).join(" ")}
                    {product.title.split(" ").length > 6 ? "..." : ""}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <button className="inline-flex items-center justify-center px-3 py-1 rounded-3xl text-gray-700 text-sm font-bold border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-200 group">
                    Shop Now
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

// Main Product Listing Component
const Products = () => {
    const mappedProducts = productsAmazon.map((item) => ({
        id: item.id,
        name: item.title,
        tag: item.is_amazon_choice === "true" ? "Amazon's Choice" : "Hot Deal",
        title: item.title,
        description: `${item.star_rating} ⭐ from ${item.num_rating} ratings · ₹${Number.parseInt(item.price).toLocaleString()}`,
        image: item.photo_url || "/placeholder.svg",
        url: item.url,
        // Store original data for product detail page
        originalData: item,
    }))

    const handleProductClick = (product) => {
        // Store the selected product data in localStorage for the product detail page
        localStorage.setItem("selectedProduct", JSON.stringify(product.originalData))

        // Navigate to product detail page using React Router
        window.location.href = "/shop/"
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
                <div className="mb-4 sm:mb-0">
                    <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
                    <p className="text-gray-600 mt-1">Don't miss this opportunity at a special discount just for this week.</p>
                </div>
                <a href="#" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium">
                    View All
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2 h-4 w-4"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mappedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
                ))}
            </div>
        </div>
    )
}

export default Products
