import { NavLink, useNavigate } from "react-router-dom";
import { accountLinks, toolLinks } from "../../constants";
import { useAuthStore } from "../../store/AuthStore";

export default function Sidebar (){

    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = async() => {
       try {
            await logout()
       } catch (error) {
            console.error(error)
       } finally {
        navigate("/")
       }
    }

    const firstNameInitials = user?.name.split(" ")[0].slice(0,1)
    const lastNameInitials = user?.name.split(" ")[1].slice(0,1)
    const firstName = user?.name.split(" ")[0] 

    return(
        <aside >
            <main className="flex flex-col h-[92vh] w-full border-r border-gray-200 pt-4 shadow-sm justify-between">
                <div>

                
                <h3 className="text-[0.75rem] text-gray-400 font-cabinet pl-3 font-semibold">TOOLS</h3>
                <div className="my-2 flex flex-col gap-2">
                    { toolLinks.map( (t) => (
                        <NavLink to={t.to} end={t.end} key={t.id} className={({ isActive }) => `flex gap-2 w-full   py-2  text-[0.85rem]
                        ${isActive ? "text-gray-800 font-bold border-l-[5px] bg-[#fff9d6] border-[#ffd600] px-4  " : "text-gray-500 font-semibold px-5 hover:bg-gray-50 hover:text-gray-900"}`}>
                            <img src={t.icon} alt="icon" className="w-[17px] "/>
                            <p> {t.label}</p>
                        </NavLink>
                    )) }
                </div>

                <div className="mt-6">
                    <h3 className="text-[0.75rem] text-gray-400 font-cabinet pl-3 font-semibold">ACCOUNT</h3>
                    <div className="my-2 flex flex-col gap-1.5">
                        { accountLinks.map( (t) => (
                            <NavLink to={t.to} key={t.id} end={t.end} className={({ isActive }) => `flex gap-2 w-full py-2  text-[0.85rem]
                            ${isActive ? "text-gray-800 font-bold border-l-[5px] bg-[#fff9d6] border-[#ffd600] px-4  " : "text-gray-500 font-semibold px-5 hover:bg-gray-50 hover:text-gray-900"}`}>
                                <img src={t.icon} alt="icon" className="w-[17px] "/>
                                <p> {t.label}</p>
                            </NavLink>
                        )) }

                        { user ? (
                           <button onClick={handleLogout} className="py-2  text-[0.85rem] text-gray-500 font-semibold px-5 inline-flex gap-2 hover:text-gray-900">🚪 Log Out</button>
                        ) :  ""}
                    </div>
                </div>
                </div>

                <div className="flex items-end  border-t border-gray-200 py-3 pl-3">
                    { user ? (
                        <span className="flex gap-3 items-center">
                            <p className="rounded-full bg-tet  px-2 py-1.5 text-primary font-bold text-[0.8rem]">{firstNameInitials}{lastNameInitials} </p>
                            <span>
                                <p className="text-sm text-gray-800 font-cabinet font-semibold">{firstName} </p>
                                <p className="text-[0.75rem] text-gray-400 font-cabinet ">Free Plan</p>
                            </span>
                        </span>
                    ) : (
                        <span className="flex gap-3 items-center">
                            <p className="rounded-full bg-tet  px-2 py-1.5 text-primary font-bold text-[0.8rem]">GU </p>
                            <span>
                                <p className="text-sm text-gray-800 font-cabinet font-semibold">Guest </p>
                                <p className="text-[0.75rem] text-gray-400 font-cabinet ">Free Plan</p>
                            </span>
                        </span>
                    ) }

                </div>
            </main>
        </aside>
    )
}