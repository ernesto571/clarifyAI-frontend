import { useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useAuthStore } from "../../store/AuthStore";
import { useProfileStore } from "../../store/ProfileStore";
import { useHistoryStore } from "../../store/HistoryStore";
import { useDocStore } from "../../store/DocStore";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatDate = (date: string | undefined) => {
    if (!date) return "—";
    const iso = date.replace(" ", "T");
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const value = "font-extrabold font-satoshi text-[2rem]"
const title = "text-sm text-gray-500"
const bar = " px-2 py-1 text-sm  font-semibold rounded-xl "

export default function ProfilePage (){
    const navigate = useNavigate()
    const { logout } = useAuthStore()
    const { profile, profileLoading, fetchProfile } = useProfileStore()
    const { history, fetchHistory } = useHistoryStore()
    const { documents, fetchDocs } = useDocStore()

    const firstNameInitials = profile?.first_name!.slice(0,1)
    const lastNameInitials = profile?.last_name!.slice(0,1)
    const totalFlags = history?.reduce((acc, h) => acc + h.meta.flag_count, 0);

    const act = [
        {title:"Docs Analyzed", value: history?.length},
        {title:"Saved", value: documents?.length},
        {title:"Flags Found", value: totalFlags}
    ]

    const info = [
        { title:"First Name" , value:profile?.first_name  },
        { title:"Last Name" , value:profile?.last_name  },
        { title:"Email" , value:profile?.email  },
        { title:"Role" , value:profile?.role  },
        { title:"Member Since" , value: formatDate(profile?.created_at)  }
    ]

    const security = [
        { title:"Active Sessions" , value:profile?.active_sessions  },
        { title:"Two-Factor Auth" , value:"Not Enabled"  },
        { title:"Last Login" , value: formatDate(profile?.last_login ) },
        { title:"Sign-in Method" , value:profile?.provider  },
        { title:"Auth Provider" , value:"Better Auth"  }
    ]

    const handleLogout = async() => {
        try {
             await logout()
        } catch (error) {
             console.error(error)
        } finally {
         navigate("/")
        }
    }

    useEffect ( () => {
        if (profile === null){
            fetchProfile()
        }
    }, [])

    useEffect ( () => {
        if (documents?.length === 0){
            fetchDocs()
        }
    }, [])

    useEffect ( () => {
        if (history?.length === 0){
            fetchHistory()
        }
    }, [])

    return(
        <div className="grid lg:grid-cols-6 h-[92vh]">
            <div className="hidden lg:grid  sidebar">
                <Sidebar />
            </div>
            <div className="lg:col-span-5 gray flex-1 overflow-auto">
                { profileLoading ? (
                    <div className="min-h-[92vh] flex items-center justify-center bg-gray-50">
                        <Loader className="size-10 animate-spin textprimary[#9D174D]" />
                    </div>
                ) : (
                    <div className="gray pt-6 pb-10 px-3 md:px-8">
                        {/* heading */}
                        <section className="flex justify-between items-center font-cabinet">
                            <h1 className="text-[1.6rem] font-extrabold text-gray-900">My Profile</h1>
                            <button onClick={handleLogout} className="px-5 py-2 text-[0.9rem] font-semibold text-red bg-red rounded-lg ">🚪 Log Out</button>
                        </section>

                        {/* card */}
                        <section className="bg-white px-3 md:px-6 py-5 font-cabinet flex justify-between mt-6 rounded-xl">
                            <div className="flex  gap-3 items-center">
                                <p className="bg-tet text-primary text-[1.5rem] md:text-[2.5rem] font-extrabold px-6 py-4 rounded-2xl">{firstNameInitials}{lastNameInitials}</p>
                                <span className="flex flex-col ">
                                    <h3 className="text-gray-900 font-semibold text-[1.3rem]">{profile?.first_name} {profile?.last_name} </h3>
                                    <p className="text-gray-500 text-[0.9rem]">{profile?.email}</p>
                                    <span className="hidden md:flex gap-2 pt-2">
                                        <p className={`${bar} text-[#7a6000] border border-[#7a6000] bg-[#fff7cc]  `} >✦ FREE PLAN</p>
                                        <p className={`${bar} gray border border-gray-200 text-gray-500 `}>{profile?.role} </p>
                                        <p className={`${bar} gray border border-gray-200 text-gray-500 `}>JOINED {formatDate(profile?.created_at)} </p>
                                    </span>
                                </span>
                            </div>  

                            <div className="hidden lg:flex gap-6 items-center text-center">
                                { act.slice(0,2).map( (a) => (
                                    <div key={a.title}>
                                        <h2 className={` ${value} text-gray-800`} >{a.value} </h2>
                                        <p className={` ${title} pt-1`} >{a.title} </p>
                                    </div>
                                )) }

                                { act.slice(2).map( (a) => (
                                    <div key={a.title}>
                                        <h2 className={` ${value} text-red`} >{a.value} </h2>
                                        <p className={` ${title} pt-1`} >{a.title} </p>
                                    </div>
                                )) }        
                            </div>   
                        </section>

                        {/* grid */}
                        <section className="mt-10 grid md:grid-cols-2 gap-7  font-cabinet">
                            {/* personal info */}
                            <div className="border border-gray-200 bg-white rounded-2xl">
                                <h4 className="py-4 px-4 flex items-center text-gray-900 font-semibold">👤 Personal Info</h4>

                                { info.map( (i) => (
                                    <div className="border-t border-gray-200  px-4 py-3 flex items-center justify-between" key={i.title}>
                                        <p className="text-sm text-gray-500">{i.title} </p>
                                        <p className="font-semibold text-[0.9rem] text-gray-900">{i.value} </p>
                                    </div>
                                )) }
                                
                            </div>

                            {/* account */}
                            <div className="border border-gray-200 bg-white rounded-2xl">
                                <h4 className="py-4 px-4 flex items-center text-gray-900 font-semibold">🔐 Security</h4>

                                { security.map( (s) => (
                                    <div className="border-t border-gray-200  px-4 py-3 flex items-center justify-between" key={s.title}>
                                        <p className="text-sm text-gray-500">{s.title} </p>
                                        <p className="font-semibold text-[0.9rem] text-gray-900">{s.value} </p>
                                    </div>
                                )) }
                                
                            </div>
                        </section>
                    </div>
                ) }
                
            </div>
            

        </div>
    )
}