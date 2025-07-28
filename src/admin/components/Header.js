import React, { useState } from "react";
import { Bell, ChevronDown, Menu, Search } from 'lucide-react';

export function Header({ toggleSidebar }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-5 md:px-6 justify-between">
            <div className="block md:hidden">
                <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
                    <Menu />
                </button>
            </div>

            <div className="hidden md:flex md:flex-1">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-md border border-gray-200 bg-white py-2 pl-8 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 md:w-[300px] lg:w-[400px]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 md:ml-auto">
                <button className="relative rounded-md p-2 hover:bg-gray-100">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                        2
                    </span>
                </button>

                {/* Profile dropdown */}
                <div className="relative">
                    <button
                        className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vIiohUwFiy6t2NgzmX2AoJc9Zi0LEc.png"
                                alt="User"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="hidden flex-col items-start text-sm md:flex">
                            <span className="font-medium">Moni Roy</span>
                            <span className="text-xs text-gray-500">Admin</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-1 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                            <button className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Profile
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Settings
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}