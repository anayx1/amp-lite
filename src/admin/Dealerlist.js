import DealerList from "./components/DealerList"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
// import { useSidebar } from "./components/SidebarContext"

function DealerListPage() {
    // const { isOpen, setIsOpen } = useSidebar()

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-3 md:p-5 bg-gray-100">
                    <DealerList />
                </main>
            </div>
        </div>
    )
}

export default DealerListPage

