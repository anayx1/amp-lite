import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, BarChart3, Users, Package, DollarSign, ChevronDown } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - replace with your API call
const sampleData = {
    stats: [
        {
            id: 1,
            title: "Total User",
            value: "40,689",
            icon: Users,
            iconColor: "bg-blue-100",
            change: 8.5,
            changeText: "Up from yesterday",
            changeType: "increase",
        },
        {
            id: 2,
            title: "Total Dealer",
            value: "10293",
            icon: Package,
            iconColor: "bg-amber-100",
            change: 1.3,
            changeText: "Up from past week",
            changeType: "increase",
        },
        {
            id: 3,
            title: "Total revenue",
            value: "$00,000",
            icon: DollarSign,
            iconColor: "bg-green-100",
            change: 4.3,
            changeText: "Down from last month",
            changeType: "decrease",
        },
        {
            id: 4,
            title: "Total",
            value: "0000",
            icon: BarChart3,
            iconColor: "bg-rose-100",
            change: 1.8,
            changeText: "Up from yesterday",
            changeType: "increase",
        },
    ],
    salesData: [
        { date: "5-oct", value: 20000 },
        { date: "6-oct", value: 32000 },
        { date: "7-oct", value: 45000 },
        { date: "8-oct", value: 35000 },
        { date: "9-oct", value: 64366 },
        { date: "10-oct", value: 45000 },
        { date: "11-oct", value: 25000 },
        { date: "12-oct", value: 45000 },
        { date: "13-oct", value: 55000 },
        { date: "14-oct", value: 45000 },
        { date: "15-oct", value: 40000 },
        { date: "16-oct", value: 45000 },
    ],
    dealsData: [
        {
            id: 1,
            productName: "AC",
            location: "6096 Marjolaine Landing",
            dateTime: "12.09.2019 - 12:53 PM",
            price: 423,
            amount: 34295,
            status: "Delivered",
        },
        {
            id: 2,
            productName: "Refrigerator",
            location: "8237 Schiller Avenue",
            dateTime: "15.10.2019 - 10:27 AM",
            price: 899,
            amount: 12500,
            status: "Pending",
        },
        {
            id: 3,
            productName: "Smart TV",
            location: "4719 Elroy Street",
            dateTime: "22.10.2019 - 03:15 PM",
            price: 1250,
            amount: 28750,
            status: "Delivered",
        },
        {
            id: 4,
            productName: "Washing Machine",
            location: "3852 Wilkinson Road",
            dateTime: "05.11.2019 - 09:45 AM",
            price: 675,
            amount: 8900,
            status: "Cancelled",
        },
        {
            id: 5,
            productName: "Microwave Oven",
            location: "7321 Kuhic Islands",
            dateTime: "18.11.2019 - 02:30 PM",
            price: 320,
            amount: 5600,
            status: "Delivered",
        },
    ],
}

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Replace this with your actual API call
        const fetchData = async () => {
            try {
                // Simulating API call with setTimeout
                setTimeout(() => {
                    setDashboardData(sampleData)
                    setLoading(false)
                }, 1000)

                // Actual API call would look like:
                // const response = await fetch('your-api-endpoint');
                // const data = await response.json();
                // setDashboardData(data);
            } catch (err) {
                setError("Failed to fetch dashboard data")
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Function to render status badge with appropriate color
    const renderStatusBadge = (status) => {
        let bgColor = "bg-green-500"

        if (status === "Pending") {
            bgColor = "bg-yellow-500"
        } else if (status === "Cancelled") {
            bgColor = "bg-red-500"
        }

        return (
            <span className={`inline-flex items-center rounded-full ${bgColor} px-3 py-1 text-xs font-medium text-white`}>
                {status}
            </span>
        )
    }

    if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>
    if (error) return <div className="text-red-500">{error}</div>
    if (!dashboardData) return null

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardData.stats.map((stat) => (
                    <div key={stat.id} className="rounded-lg border bg-white p-6 shadow-sm">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
                            </div>
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconColor}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1">
                            {stat.changeType === "increase" ? (
                                <ArrowUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <ArrowDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>{stat.change}%</span>
                            <span className="text-sm text-gray-500">{stat.changeText}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sales Chart */}
            <div className="rounded-lg border bg-white shadow-sm P-5">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-semibold">Sales Details</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">October</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                </div>
                <div className="p-4">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dashboardData.salesData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value / 1000}k`}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-white p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-gray-500">Value</span>
                                                            <span className="font-bold text-gray-700">{payload[0].value.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    activeDot={{
                                        r: 6,
                                        style: { fill: "#2563eb", opacity: 0.8 },
                                    }}
                                    dot={false}
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Deals Details Table */}
            <div className="rounded-lg border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-lg font-semibold">Deals Details</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">October</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                </div>
                <div className="p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-500">
                                        Product Name
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-500">
                                        Date - Time
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                                    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.dealsData.map((deal) => (
                                    <tr key={deal.id} className="border-b">
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">{deal.productName}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">{deal.location}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">{deal.dateTime}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">${deal.price}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">${deal.amount.toLocaleString()}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">{renderStatusBadge(deal.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}