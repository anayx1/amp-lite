"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

// Function to transform Amazon product data to our format
function transformProductData(amazonProduct) {
  if (!amazonProduct) return null

  const discount =
    amazonProduct.original_price && amazonProduct.original_price !== "NA"
      ? Math.round(
        ((Number.parseInt(amazonProduct.original_price) - Number.parseInt(amazonProduct.price)) /
          Number.parseInt(amazonProduct.original_price)) *
        100,
      )
      : 25 // Default discount

  return {
    name: amazonProduct.title,
    images: [
      amazonProduct.photo_url || "/placeholder.svg?height=400&width=400",
      amazonProduct.photo_url || "/placeholder.svg?height=400&width=400",
      amazonProduct.photo_url || "/placeholder.svg?height=400&width=400",
    ],
    price: Number.parseInt(amazonProduct.price),
    originalPrice:
      amazonProduct.original_price && amazonProduct.original_price !== "NA"
        ? Number.parseInt(amazonProduct.original_price)
        : Number.parseInt(amazonProduct.price) + 10000,
    discount: discount,
    rating: Number.parseFloat(amazonProduct.star_rating),
    reviews: Number.parseInt(amazonProduct.num_rating),
    sku: amazonProduct.asin,
    sellers: [
      { name: "Amazon", price: Number.parseInt(amazonProduct.price), logo: "/amazon.png" },
      { name: "Flipkart", price: Number.parseInt(amazonProduct.price), logo: "/flipkart.png" },
    ],
    description: `${amazonProduct.title}. This high-quality AC unit offers excellent cooling performance with energy-efficient operation. Perfect for residential and commercial use with advanced features and reliable performance.`,
    specifications: {
      warranty: "The Consumer Protection Act does not provide for the return of this product of proper quality.",
    },
    amazonUrl: amazonProduct.url,
    deliveryInfo: amazonProduct.date || "Standard delivery available",
    variations: amazonProduct.has_variations || "Multiple variants available",
  }
}

// Star Rating Component
function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">({reviews} reviews)</span>
    </div>
  )
}

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 8,
    seconds: 50,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-4">
        <span className="text-orange-700 font-semibold">Special Offer:</span>
        <div className="flex items-center gap-2">
          <div className="bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <span>:</span>
          <div className="bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <span>:</span>
          <div className="bg-orange-600 text-white px-2 py-1 rounded text-sm font-bold">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
        </div>
        <span className="text-sm text-gray-600">Remains until the end of the offer</span>
      </div>
    </div>
  )
}

// Enhanced Product Detail Component with Dynamic Data
const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState("description")
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Get the selected product data from localStorage
    const selectedProductData = localStorage.getItem("selectedProduct")
    if (selectedProductData) {
      const amazonProduct = JSON.parse(selectedProductData)
      const transformedProduct = transformProductData(amazonProduct)
      setProduct(transformedProduct)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (!isZoomed) return
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - bounds.left) / bounds.width) * 100
    const y = ((e.clientY - bounds.top) / bounds.height) * 100
    setMousePosition({ x, y })
  }

  // Show loading or fallback if no product is selected
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Product Selected</h2>
            <p className="text-gray-600 mb-4">Please select a product from the homepage to view details.</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="">
          <div className="max-w-7xl mx-auto py-3">
            <nav className="flex text-sm text-gray-500">
              <button onClick={() => (window.location.href = "/")} className="hover:text-gray-700">
                Home
              </button>
              <span className="mx-2">›</span>
              <a href="#" className="hover:text-gray-700">
                AC
              </a>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{product.name.split(" ").slice(0, 4).join(" ")}...</span>
            </nav>
          </div>
        </div>

        <div className="w-[90%] mx-auto py-8 px-2 sm:px-6 lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative">
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">{product.discount}%</span>
                </div>

                <div
                  className="relative overflow-hidden aspect-square rounded-lg border bg-white"
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"
                      }`}
                    style={
                      isZoomed
                        ? {
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        }
                        : undefined
                    }
                  />

                  {/* Zoom Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-20 h-20 border rounded-lg overflow-hidden bg-white ${selectedImage === idx ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                      }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                <div className="mt-3">
                  <StarRating rating={product.rating} reviews={product.reviews} />
                  <p className="text-sm text-gray-600 mt-1">SKU: {product.sku}</p>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                  {product.discount}% OFF
                </span>
              </div>

              {/* Sellers Section */}
              <div className="flex justify-start items-center gap-5 ">
                <div className="bg-white rounded-lg border shadow-sm p-3 w-3/4">
                  <div className="space-y-2">
                    {product.sellers.map((seller, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            <img
                              src={seller.logo || "/placeholder.svg"}
                              alt="logo"
                              className="w-5 h-auto"
                              onError={(e) => {
                                e.target.style.display = "none"
                                e.target.nextSibling.style.display = "inline"
                              }}
                            />
                            <span style={{ display: "none" }}>🛒</span>
                          </span>
                          <span className="font-medium text-gray-900">{seller.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold">₹{seller.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="text-md w-fit flex-inline p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                  Buy Offline
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to wishlist
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share this Product
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Compare
                </button>
              </div>

              {/* Amazon Link */}
              {product.amazonUrl && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Buy on Amazon</h3>
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View on Amazon →
                  </a>
                </div>
              )}

              {/* Specification Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Specification</h3>
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>Warranty:</strong> {product.specifications.warranty}
                  </p>
                  {product.deliveryInfo && (
                    <p className="mt-1">
                      <strong>Delivery:</strong> {product.deliveryInfo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mt-8">
            <CountdownTimer />
          </div>

          {/* Tabs Section */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "description"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "reviews"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  Reviews ({product.reviews})
                </button>
              </nav>
            </div>

            <div className="mt-6">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="text-gray-700">
                  <p>
                    Customer reviews will be displayed here. Currently showing {product.reviews} reviews with an average
                    rating of {product.rating} stars.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductDetail
