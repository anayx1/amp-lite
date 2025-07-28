import AddTeamMember from "./components/AddTeam"
import { Header } from "./components/Header"
import Settings from "./components/Settings"
import { Sidebar } from "./components/Sidebar"
import TeamList from "./components/Teams"
// import { useSidebar } from "./components/SidebarContext"

function SettingPage() {
    // const { isOpen, setIsOpen } = useSidebar()

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-3 md:p-5 bg-gray-100">
                    <Settings />
                </main>
            </div>
        </div>
    )
}

export default SettingPage

