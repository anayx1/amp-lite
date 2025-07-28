"use client"

// Mock data for best seller products
const bestSellerProducts = [
  {
    id: "1",
    name: "Voltas 1.5 Ton 3 Star Split Inverter AC - White",
    image: "/placeholder.svg?height=150&width=200",
    originalPrice: "$8.15",
    discountedPrice: "$5.00",
    discountPercentage: "10%",
    rating: 4,
    isColdSale: false,
  },
  {
    id: "2",
    name: "Voltas 1.5 Ton 3 Star Split Inverter AC - White",
    image: "/placeholder.svg?height=150&width=200",
    originalPrice: "$2.98",
    discountedPrice: "$1.25",
    discountPercentage: "20%",
    rating: 5,
    isColdSale: false,
  },
  {
    id: "3",
    name: "Voltas 1.5 Ton 3 Star Split Inverter AC - White",
    image: "/placeholder.svg?height=150&width=200",
    originalPrice: "$3.38",
    discountedPrice: "$2.38",
    discountPercentage: "30%",
    rating: 4,
    isColdSale: false,
  },
  {
    id: "4",
    name: "Voltas 1.5 Ton 3 Star Split Inverter AC - White",
    image: "/placeholder.svg?height=150&width=200",
    originalPrice: "$17.89",
    discountedPrice: "$14.89",
    discountPercentage: "17%",
    rating: 5,
    isColdSale: false,
  },
  {
    id: "5",
    name: "Voltas 1.5 Ton 3 Star Split Inverter AC - White",
    image: "/placeholder.svg?height=150&width=200",
    originalPrice: "$8.99",
    discountedPrice: "$8.99",
    discountPercentage: "11%",
    rating: 4,
    isColdSale: true,
  },
  {
    id: "6",
    name: "Voltas 1.5 Ton 3 Star Split Inverter AC - White",
    image: "/placeholder.svg?height=150&width=200",
    originalPrice: "$14.77",
    discountedPrice: "$11.77",
    discountPercentage: "21%",
    rating: 3,
    isColdSale: true,
  },
  {
    id: "7",
    name: "Voltas 1.5 Ton 3 Star Split Inverter AC - White",
    image: "/placeholder.svg?height=150&width=200",
    originalPrice: "$4.50",
    discountedPrice: "$2.50",
    discountPercentage: "44%",
    rating: 4,
    isColdSale: false,
  },
  {
    id: "8",
    name: "Voltas 1.5 Ton 3 Star Split Inverter AC - White",
    image: "/placeholder.svg?height=150&width=200",
    originalPrice: "$2.75",
    discountedPrice: "$1.75",
    discountPercentage: "37%",
    rating: 5,
    isColdSale: false,
  },
]

// Star Rating Component
function StarRating({ rating }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating}</span>
    </div>
  )
}

// Product Card Component
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden relative">
      {/* Discount Badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{product.discountPercentage}</span>
      </div>

      {/* Cold Sale Badge */}
      {product.isColdSale && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            ❄️ COLD SALE
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-32 bg-gray-100 flex items-center justify-center p-5">
        <img
          src={"/ac.png"}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="mb-2">
          <StarRating rating={product.rating} />
        </div>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-red-600">{product.discountedPrice}</span>
          <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-3xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
          Add to cart
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Promotional Section Component
function PromotionalSection({ title, subtitle, description, buttonText, isGrocery = false }) {
  return (
    <div className="bg-[#FFEFEF] rounded-lg p-6 flex flex-col items-left justify-center text-left min-h-[300px]">
      <span className="text-orange-500 text-sm font-semibold mb-2 text-left">{subtitle}</span>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-left">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 text-left">{description}</p>

      {/* AC Unit Image */}
      <div className="mb-4 w-full flex items-center justify-center">
        <img src="/ac.png" alt="AC Unit" className="max-h-20 object-contain" />
      </div>

      <button className="flex w-fit items-center px-4 py-2 border border-gray-300 rounded-3xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
        {buttonText}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

// Main Best Sellers Component
export default function BestSellersSection() {
  return (
    <div className="container mx-auto px-4 pt-8 md:px-6 lg:pt-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Best Sellers</h2>
        <p className="text-gray-600">Some of the new products arriving this week</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* First Row */}
        <ProductCard product={bestSellerProducts[0]} />
        <ProductCard product={bestSellerProducts[1]} />

        {/* Promotional Section 1 - spans 2 columns on larger screens */}
        <div className="md:col-span-2 lg:col-span-1">
          <PromotionalSection
            title="We are always here to help you with your AC"
            subtitle="Only This Week"
            description="A different kind of AC store"
            buttonText="Shop Now"
          />
        </div>

        <ProductCard product={bestSellerProducts[2]} />
        <ProductCard product={bestSellerProducts[3]} />

        {/* Second Row */}
        <ProductCard product={bestSellerProducts[4]} />
        <ProductCard product={bestSellerProducts[5]} />

        {/* Promotional Section 2 - spans 2 columns on larger screens */}
        <div className="md:col-span-2 lg:col-span-1">
          <PromotionalSection
            title="We are always here to help you with your grocery"
            subtitle="Only This Week"
            description="A different kind of grocery store"
            buttonText="Shop Now"
            isGrocery={true}
          />
        </div>

        <ProductCard product={bestSellerProducts[6]} />
        <ProductCard product={bestSellerProducts[7]} />
      </div>
    </div>
  )
}
