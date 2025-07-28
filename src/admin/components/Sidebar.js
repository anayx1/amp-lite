import { Link, useLocation } from "react-router-dom"
import {
    LayoutDashboard, Inbox, ListOrdered, Users,
    TableIcon, Settings, LogOut, X
} from 'lucide-react'

const navItems = [
    { title: "Dashboard", href: "/admin/Dashboard", icon: LayoutDashboard },
    { title: "Inbox", href: "#", icon: Inbox },
    { title: "Dealer Lists", href: "/admin/DealerList", icon: ListOrdered },
    { title: "PAGES", type: "label" },
    { title: "Team", href: "/admin/Teams", icon: Users },
    { title: "Table", href: "#", icon: TableIcon },
    { title: "Settings", href: "/admin/settings", icon: Settings },
    { title: "Logout", href: "#", icon: LogOut },
]

export function Sidebar({ isOpen, toggleSidebar }) {
    const location = useLocation()

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-white transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-16 items-center px-4">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
                        AMP
                    </Link>
                    <button
                        className="ml-auto rounded-md p-1 hover:bg-gray-100 md:hidden"
                        onClick={toggleSidebar}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-col h-[calc(100vh-4rem)]">
                    <nav className="flex flex-col">
                        {navItems.map((item, index) => {
                            if (item.type === "label") {
                                return (
                                    <div
                                        key={index}
                                        className="px-4 py-3 text-xs font-medium text-gray-500 border-t border-b"
                                    >
                                        {item.title}
                                    </div>
                                )
                            }

                            const isActive = location.pathname === item.href

                            return (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${isActive
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.title}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        </>
    )
}