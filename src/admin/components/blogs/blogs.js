"use client"

import { useState, useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Search } from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"

// Mock data for blog posts
const blogData = [
    {
        id: 1,
        title: "How grocers are approaching delivery as the market evolves",
        excerpt:
            "As food retailers look to make delivery more cost-effective, partnerships are often a focus. From fulfillment to micro-fulfillment to dark stores, food retailers are exploring a range of options.",
        author: "John Smith",
        date: "November 3, 2023",
        category: "Delivery",
        tags: ["grocers", "food delivery", "market trends"],
        image: "/test2.jpg",
        content:
            "As food retailers look to make delivery more cost-effective, partnerships are often a focus. From fulfillment to micro-fulfillment to dark stores, food retailers are exploring a range of options. Many are finding that third-party partnerships can help them scale quickly. Others are investing in their own infrastructure to maintain control over the customer experience and data.",
    },
    {
        id: 2,
        title: "The Friday Checkout: Food insecurity keeps retailers off balance",
        excerpt: "Retailers are facing challenges with food insecurity and supply chain disruptions.",
        author: "Jane Doe",
        date: "November 2, 2023",
        category: "Retail",
        tags: ["food insecurity", "retail", "supply chain"],
        image: "/test2.jpg",
        content:
            "Retailers are navigating complex challenges related to food insecurity and supply chain disruptions. With increasing costs and unpredictable availability of certain products, many are having to adapt their strategies quickly. This has led to new approaches in inventory management and customer communication.",
    },
    {
        id: 3,
        title: "Consumer meat prices to rise as feed costs increase",
        excerpt: "Rising feed costs are expected to impact consumer meat prices in the coming months.",
        author: "Michael Johnson",
        date: "October 28, 2023",
        category: "Pricing",
        tags: ["meat prices", "feed costs", "consumer impact"],
        image: "/test2.jpg",
        content:
            "Rising feed costs are putting pressure on meat producers, which is expected to result in higher consumer prices. Industry analysts predict that beef, pork, and poultry prices could increase by as much as 10% in some markets. Factors contributing to the rising feed costs include weather events, supply chain disruptions, and increased global demand.",
    },
    {
        id: 4,
        title: "How can the grocery and food service industries collaborate to grow?",
        excerpt: "Exploring potential synergies between grocery retailers and food service providers.",
        author: "Sarah Williams",
        date: "October 25, 2023",
        category: "Industry",
        tags: ["grocery", "food service", "collaboration"],
        image: "/test2.jpg",
        content:
            "There are growing opportunities for collaboration between grocery retailers and food service providers. From shared distribution networks to co-branded products, these partnerships can create value for both sectors. Consumers are increasingly looking for convenient meal solutions that bridge the gap between restaurant dining and home cooking, creating a natural intersection for these industries.",
    },
    {
        id: 5,
        title: "Grocery shopping in VR/AR experiences set to grow in 2024",
        excerpt: "Virtual and augmented reality shopping experiences are gaining traction in the grocery sector.",
        author: "David Chen",
        date: "October 20, 2023",
        category: "Technology",
        tags: ["VR", "AR", "grocery shopping", "technology"],
        image: "/test2.jpg",
        content:
            "Virtual and augmented reality shopping experiences are expected to become more mainstream in the grocery sector by 2024. Several major retailers are already testing these technologies, which allow customers to browse virtual store shelves, view product information, and make purchases from home. Early adopters report increased engagement and basket sizes compared to traditional online shopping.",
    },
]

export default function Blogs() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredBlogs, setFilteredBlogs] = useState(blogData)

    useEffect(() => {
        const results = blogData.filter(
            (blog) =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        setFilteredBlogs(results)
    }, [searchTerm])

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Blog Posts</h1>

                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            className="p-2 pl-10 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Modified to show all blogs in single column */}
                    <div className="lg:col-span-2 space-y-12">
                        {filteredBlogs.map((blog, index) => (
                            <div key={blog.id} className="blog-post">
                                <div className="relative h-[400px] mb-4 rounded-lg overflow-hidden">
                                    <img
                                        src={blog.image || "/placeholder.svg?height=400&width=800"}
                                        alt={blog.title}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-sm font-medium rounded-full">
                                        {blog.category}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">
                                    <Link href={`/blog/${blog.id}`} className="hover:text-gray-700">
                                        {blog.title}
                                    </Link>
                                </h2>
                                <div className="text-sm text-gray-500 mb-3">
                                    {blog.date} • {blog.author}
                                </div>
                                <p className="text-gray-700 mb-4">{blog.excerpt}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {blog.tags.map((tag, idx) => (
                                        <span key={idx} className="bg-gray-100 px-3 py-1 text-xs rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={`/blog/${blog.id}`}
                                    className="inline-block bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    Read More
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar - Unchanged */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Recent Posts */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-6 pb-2 border-b">Recent Posts</h3>
                            <div className="space-y-4">
                                {filteredBlogs.slice(0, 5).map((blog) => (
                                    <div key={blog.id} className="flex items-start gap-3">
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                                            <img
                                                src={blog.image || "/placeholder.svg?height=80&width=80"}
                                                alt={blog.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm hover:text-gray-700 line-clamp-2">
                                                <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Media Widget */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-6 pb-2 border-b">Social Media Widget</h3>
                            <div className="space-y-3">
                                <a
                                    href="#"
                                    className="flex items-center justify-center bg-[#1877F2] text-white p-2.5 rounded-md hover:bg-opacity-90 transition-colors"
                                >
                                    <Facebook className="w-5 h-5 mr-2" />
                                    Facebook
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center bg-[#1DA1F2] text-white p-2.5 rounded-md hover:bg-opacity-90 transition-colors"
                                >
                                    <Twitter className="w-5 h-5 mr-2" />
                                    Twitter
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center bg-[#E4405F] text-white p-2.5 rounded-md hover:bg-opacity-90 transition-colors"
                                >
                                    <Instagram className="w-5 h-5 mr-2" />
                                    Instagram
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center bg-[#0A66C2] text-white p-2.5 rounded-md hover:bg-opacity-90 transition-colors"
                                >
                                    <Linkedin className="w-5 h-5 mr-2" />
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
                            <p className="text-gray-600 mb-4">Stay updated with our latest news and articles</p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

// Export the blog data for use in other components
export { blogData }