import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { blogData } from "./blogs"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"

export default function SingleBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [blog, setBlog] = useState(null)
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        const blogId = id ? parseInt(id) : null

        if (!blogId) {
            navigate("/blogs")
            return
        }

        const foundBlog = blogData.find((post) => post.id === blogId)

        if (!foundBlog) {
            navigate("/blogs")
            return
        }

        setBlog(foundBlog)

        const related = blogData
            .filter(
                (post) =>
                    post.id !== blogId &&
                    (post.category === foundBlog.category ||
                        post.tags.some((tag) => foundBlog.tags.includes(tag)))
            )
            .slice(0, 3)

        setRelatedPosts(related)
    }, [id, navigate])

    if (!blog) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4">Loading blog post...</p>
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <Link to="/blogs" className="text-gray-600 hover:text-black flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blogs
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="mb-4">
                            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 text-sm font-medium rounded-full">
                                {blog.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

                        <div className="flex items-center text-gray-600 mb-6">
                            <div className="mr-4">
                                <span className="font-medium text-black">{blog.author}</span>
                            </div>
                            <div className="text-sm">{blog.date}</div>
                        </div>

                        <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
                            <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="object-cover w-full h-full" />
                        </div>

                        <div className="prose max-w-none">
                            <p className="text-lg mb-4">{blog.excerpt}</p>
                            <p className="mb-4">{blog.content}</p>
                            <h2 className="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
                            <ul className="list-disc pl-6 mb-6">
                                <li className="mb-2">Industry experts predict continued growth in this sector</li>
                                <li className="mb-2">New technologies are driving innovation and efficiency</li>
                                <li className="mb-2">Consumer preferences are shifting toward sustainable options</li>
                                <li className="mb-2">Market competition is intensifying as new players enter</li>
                            </ul>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-100 px-3 py-1 text-sm rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-bold mb-4">Share this article</h3>
                            <div className="flex space-x-2">
                                <button className="bg-[#1877F2] text-white px-4 py-2 rounded">Facebook</button>
                                <button className="bg-[#1DA1F2] text-white px-4 py-2 rounded">Twitter</button>
                                <button className="bg-[#0A66C2] text-white px-4 py-2 rounded">LinkedIn</button>
                                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Copy Link</button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Author Info */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold mb-4">About the Author</h3>
                            <div className="flex items-center mb-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                    <img
                                        src="/placeholder.svg"
                                        alt={blog.author}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold">{blog.author}</h4>
                                    <p className="text-sm text-gray-600">Content Writer</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700">
                                Experienced writer specializing in food retail, market trends, and consumer behavior with over 5 years of
                                industry experience.
                            </p>
                        </div>

                        {/* Related Posts */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold mb-4">Related Posts</h3>
                            <div className="space-y-4">
                                {relatedPosts.map((post) => (
                                    <div key={post.id} className="flex items-start gap-3">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <img
                                                src={post.image || "/placeholder.svg"}
                                                alt={post.title}
                                                className="object-cover rounded-md w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm hover:text-gray-700">
                                                <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                            </h4>
                                            <p className="text-xs text-gray-500">{post.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gray-800 text-white p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h3>
                            <p className="text-gray-300 mb-4">Get the latest industry insights delivered to your inbox.</p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full p-2 rounded text-black"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-white text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-200"
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
