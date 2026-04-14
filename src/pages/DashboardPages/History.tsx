import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useHistoryStore } from "../../store/HistoryStore";
import { useProfileStore } from "../../store/ProfileStore";
import { useEffect, useState } from "react";
import { contractIcon, contractIconClass, formatAnalysisTime, redflagsCheckClass, redflagsCheckText } from "../../constants";
import { Eye, Loader, Star } from "lucide-react";
import ViewAnalysisModal from "../../components/Dashboard/ViewAnalysisModal";
import { handleExportPDF } from "../../lib/actions";
import { useDocStore } from "../../store/DocStore";
import NoAnalysisEmptyState from "../../components/Dashboard/NoAnalysisEmptyState";

const container = "flex items-center gap-3 border-gray-200 rounded-xl py-2 md:py-3 px-2 md:px-4 border bg-white"
const icon ="py-2 md:text-[1.2rem] px-1.5 md:px-3 rounded-xl"
const title = "font-bold "
const subtitle = "  text-sm md:text-[0.9rem] text-gray-700 font-medium truncate"
const th = "px-4 py-3 font-semibold text-gray-500 uppercase "
const td = "px-4 py-3"
const btn = "gray py-1 px-2 rounded-lg hover:-translate-y-[1px] transform ease-in-out"


const formatDate = (date: string | undefined) => {
    if (!date) return "—";
    const iso = date.replace(" ", "T");
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const ITEMS_PER_PAGE = 6

export default function History () {

    const { history, historyLoading, fetchHistory } = useHistoryStore()
    const { profile, fetchProfile } = useProfileStore()
    const navigate = useNavigate()

    const totalFlags = history?.reduce((acc, h) => acc + h.meta.flag_count, 0);
    const cleanDocs = history?.filter((h) => h.meta.flag_count === 0).length;
    
    const [ activeCategory, setActiveCategory ] = useState("All");
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedAnalysis, setSelectedAnalysis] = useState<any | null>(null);
    const {saveDoc , removeFromSavedDoc} = useDocStore()

    const filteredHistory = history!.filter(
        (h) => activeCategory === "All" || h.contract_type_short === activeCategory
    );
    const categories = [ 
        {category: "All",  length: history?.length },
        {category: "NDA", title:"NDA", length: history?.filter((h) => h.contract_type_short === "NDA").length },
        {category: "ToS", title:"Terms Of Service", length: history?.filter((h) => h.contract_type_short === "ToS").length },
        {category: "Lease", length: history?.filter((h) => h.contract_type_short === "Lease").length },
        {category: "EA", title:"Employment Agreement", length: history?.filter((h) => h.contract_type_short === "EA").length },
        {category: "FSA", title:"Freelance", length: history?.filter((h) => h.contract_type_short === "FSA").length },
    ]

    // ✅ Pagination logic
    const totalPages = Math.ceil(filteredHistory?.length / ITEMS_PER_PAGE)
    const paginatedHistory = filteredHistory?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    ) 

    useEffect( () => {
        fetchProfile()
    }, [] )

    useEffect ( () => {
        if ( history?.length === 0 ){
            fetchHistory()
        }
    }, [])

    return (

        <div className="grid lg:grid-cols-6 h-[92vh]">
            <div className="hidden lg:grid  sidebar">
                <Sidebar />
            </div>

            <div className="lg:col-span-5 gray flex-1 overflow-auto">
                 <div className="gray pt-6 pb-10 px-3 md:px-8">
                    {/* heading */}
                    <section className=" grid gap-y-2 md:flex justify-between items-center font-cabinet">
                        <span>
                            <h1 className="text-[1.4rem] font-cabinet font-extrabold tracking-tight text-gray-900">My History</h1>
                            <p className="text-gray-400 text-sm font-satoshi pt-1">Every document you've analyzed — searchable and sortable.</p>
                        </span>

                        <span className="flex gap-4">
                            <input type="text" className="pl-3  lg:pr-10 py-2 lg:py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-900 transform text-sm text-gray-700" placeholder="🔍  Search documents..." />

                            <button onClick={() => (navigate("/dashboard"))} className="bg-tet text-primary rounded-lg font-semibold text-sm px-3  lg:px-5 hover:-translate-y-[1px] transform truncate">+  Analyze New</button>
                        </span>
                    </section>

                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5 font-cabinet">
                        <div className={`${container}`} >
                            <p className={`${icon}  bg-[#fff8d1]`} >📄</p>
                            <span>
                                <h5 className={`${title}  text-gray-900 text-[1.4rem]`} >{history?.length} </h5>
                                <p className={`${subtitle}`} >Total Analyzed</p>
                            </span>
                        </div>

                        <div className={`${container}`} >
                            <p className={`${icon}  bg-[#ffeaef] `} >⚑</p>
                            <span>
                                <h5 className={`${title} text-red text-[1.4rem]`} >{totalFlags} </h5>
                                <p className={`${subtitle}`} >Red Flags Found</p>
                            </span>
                        </div>

                        <div className={`${container}`} >
                            <p className={`${icon}  bg-[#e0f8f1]`} >📄</p>
                            <span>
                                <h5 className={`${title}  text-gray-900 text-[1.4rem]`} >{cleanDocs} </h5>
                                <p className={`${subtitle}`} >Clean Documents</p>
                            </span>
                        </div>

                        <div className={`${container}`} >
                            <p className={`${icon}  bg-[#e9edff]`} >📅</p>
                            <span>
                                <h5 className={`${title} text-[1.2rem]  text-gray-900`} >{formatDate(profile?.created_at)} </h5>
                                <p className={`${subtitle}`} >Member Since</p>
                            </span>
                        </div>

                    </section>

                    {/* table section */}
                    {historyLoading ? (
                        <div className="h-[50vh] flex items-center justify-center ">
                            <Loader className="size-10 animate-spin text-gray-900" />
                        </div>
                    ) : (
                        history.length !== 0 ? (
                            <section className="mt-6">
                                {/* button */}
                                <span className="flex gap-5 font-satoshi overflow-auto max-w-screen">
                                    { categories.map((c) => (
                                        <button key={c.category} title={c.title} onClick={() => setActiveCategory(c.category)} className={`flex gap-2 items-center
                                        px-4 py-1.5 text-sm  rounded-lg font-semibold transition-all duration-300 capitalize
                                        ${activeCategory === c.category
                                        ? "bg-tet text-primary scale-105"
                                        : "bg-white  text-gray-600 border border-gray-200 "
                                        }
                                    `}>{c.category}
                                            <p className={`flex items-center justify-center text-center px-2  rounded-full ${activeCategory === c.category
                                        ? "bg-[#493f09]  "
                                        : "gray  "
                                        }`}>{c.length}</p>
                                    </button>
                                    )) }
                                </span>

                                {/* table */}
                                <div className="mt-7 rounded-2xl border border-gray-200 overflow-auto ">
                                    <table className="min-w-full overflow-auto table-fixed">
                                        <thead className="sticky top-0 z-10 border-b border-gray-200  text-[0.8rem]">
                                            <tr className="gray  text-left ">
                                                <th className={`${th} w-[30%] lg:w-[37%]`}>DOCUMENT</th>
                                                <th className={`${th}  w-[10%]`}>TYPE</th>
                                                <th className={`${th} w-[10%]`}>TONE USED</th>
                                                <th className={`${th} `}>FLAGS</th>
                                                <th className={`${th} w-[10%]`}>DATE</th>
                                                <th className={`${th}`}> </th>
                                            </tr>
                                        </thead>

                                        { paginatedHistory?.map( (p) => (

                                            <tr key={p.id} className="border-b border-gray-200  transition-all bg-white ">
                                                {/* contract desc */}
                                                <td className={`${td} font-cabinet `}>
                                                    <span className="inline-flex gap-3 items-center">
                                                        <p className={`${contractIconClass(p.contract_type_short)} p-2 rounded-lg flex-shrink-0`}>{contractIcon(p.contract_type_short)}</p>
                                                        <div className="w-[160px] md:w-[220px] lg:w-[300px] flex-1">
                                                            <h5 className="text-gray-900 font-semibold text-[0.95rem] truncate">{p.contract_type_description}</h5>
                                                            <p className="small pt-0.5">{p.meta.analysis_time_seconds}s analysis</p>
                                                        </div>
                                                    </span>
                                                </td>

                                                {/* type */}
                                                <td className={`${td} font-cabinet`}>
                                                    <span className={`${contractIconClass(p.contract_type_short)} py-1 text-sm font-semibold  px-3 justify-center items-center inline-flex gap-1 rounded-lg `}>
                                                        <p>{contractIcon(p.contract_type_short)} </p>
                                                        <p>{p.contract_type_short}</p>
                                                    </span>
                                                </td>

                                                {/* tone */}
                                                <td className={`${td} font-satoshi`}>
                                                    <p className="text-sm bg-[#f5f5f2] text-[#555555dc] inline-flex font-semibold py-1.5 px-3 rounded-full ">{p.meta.tone} </p>
                                                </td>
                                                
                                                {/* red flags */}
                                                <td className={`${td} font-satoshi`}>
                                                    <p className={`text-sm ${redflagsCheckClass(p.meta.flag_count)} w-[75px] md:w-none inline-flex font-semibold py-1.5 px-3 rounded-full `}>{redflagsCheckText(p.meta.flag_count)} </p>
                                                </td>

                                                {/* date */}

                                                <td className={`${td} font-satoshi`}>
                                                    <p className={`text-sm  inline-flex font-medium text-gray-500 truncate`}>{formatAnalysisTime(p.analyzed_at)} </p>
                                                </td>

                                                {/* action btns */}

                                                <td className={`${td} font-satoshi`}>
                                                    <span className="flex gap-3 items-center">
                                                        <button title="View analysis" onClick={() => setSelectedAnalysis(p)} className={`${btn}`}><Eye className="size-5 text-gray-900"/></button>
                                                        <button title="Export as PDF" onClick={() => handleExportPDF(p)} className={`${btn} text-sm`}>📤</button>
                                                        <Star 
                                                            className={`cursor-pointer size-5 transition-colors ${
                                                                p.is_saved ? "text-yellow-500 fill-yellow-500" : "text-gray-400 fill-white"
                                                            }`}
                                                            onClick={async (e) => {
                                                                e.stopPropagation(); // Prevent triggering any row clicks

                                                                try {
                                                                if (p.is_saved) {
                                                                    // 1. Call the API via DocStore
                                                                    await removeFromSavedDoc(p.id);
                                                                    
                                                                    // 2. Manually update HistoryStore so the UI reacts immediately
                                                                    useHistoryStore.setState((state) => ({
                                                                    history: state.history?.map((h) =>
                                                                        h.id === p.id ? { ...h, is_saved: false } : h
                                                                    ),
                                                                    }));
                                                                } else {
                                                                    // 1. Call the API via DocStore
                                                                    await saveDoc(p.id);
                                                                    
                                                                    // 2. Manually update HistoryStore
                                                                    useHistoryStore.setState((state) => ({
                                                                    history: state.history?.map((h) =>
                                                                        h.id === p.id ? { ...h, is_saved: true } : h
                                                                    ),
                                                                    }));
                                                                }
                                                                } catch (error) {
                                                                console.error("Failed to toggle save status", error);
                                                                // useDocStore already handles the error toast, so we just catch it here.
                                                                }
                                                            }}
                                                        />
                                                    </span>
                                                </td>


                                            </tr>
                                        )) }
                                    </table>
                                </div>
                            </section>
                        ) : (
                            <NoAnalysisEmptyState />
                        )
                    ) }
                    

                    {/* ✅ Pagination */}
                    {filteredHistory.length > ITEMS_PER_PAGE && (
                    <div className="flex items-center justify-between py-4 mt-2">
                        <p className="text-xs text-gray-400">
                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredHistory.length)} of {filteredHistory.length} documents
                        </p>
                        <div className="flex items-center gap-1 font-semibold">
                        {/* Prev */}
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 text-xs gray-900 gray disabled:opacity-40 transition-all"
                        >
                            ‹
                        </button>

                        {/* Page numbers */}
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 text-xs rounded-lg transition-all
                                ${currentPage === i + 1
                                ? "bg-text text-primary "
                                : "gray text-gray-900"
                                }`}
                            >
                            {i + 1}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 text-xs  text-gray-900 gray disabled:opacity-40 transition-all"
                        >
                            ›
                        </button>
                        </div>
                    </div>
                    )}


                </div>
                

            </div>
            {selectedAnalysis && (
                <ViewAnalysisModal 
                    onClose={() => setSelectedAnalysis(null)} 
                    analysis={selectedAnalysis} 
                />
            )}
        </div>
    )
}