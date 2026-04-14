import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useEffect, useState } from "react";
import { contractIcon, contractIconClass, formatAnalysisTime, redflagsCheckClass, redflagsCheckText } from "../../constants";
import { Eye, Loader, Star } from "lucide-react";
import ViewAnalysisModal from "../../components/Dashboard/ViewAnalysisModal";
import { handleExportPDF } from "../../lib/actions";
import { useDocStore } from "../../store/DocStore";
import NoSavedDocsEmptyState from "../../components/Dashboard/SavedDocEmptyState";

const th = "px-4 py-3 font-semibold text-gray-500 uppercase "
const td = "px-4 py-3"
const btn = "gray py-1 px-2 rounded-lg hover:-translate-y-[1px] transform ease-in-out"

const ITEMS_PER_PAGE = 6

export default function SavedDocs (){
    const navigate = useNavigate()
    const [ activeCategory, setActiveCategory ] = useState("All");
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedAnalysis, setSelectedAnalysis] = useState<any | null>(null);
    const { removeFromSavedDoc , docLoading, documents , fetchDocs} = useDocStore()

    const filteredDocs = documents!.filter(
        (h) => activeCategory === "All" || h.contract_type_short === activeCategory
    );
    const categories = [ 
        {category: "All",  length: documents?.length },
        {category: "NDA", title:"NDA", length: documents?.filter((h) => h.contract_type_short === "NDA").length },
        {category: "ToS", title:"Terms Of Service", length: documents?.filter((h) => h.contract_type_short === "ToS").length },
        {category: "Lease", length: documents?.filter((h) => h.contract_type_short === "Lease").length },
        {category: "EA", title:"Employment Agreement", length: documents?.filter((h) => h.contract_type_short === "EA").length },
        {category: "FSA", title:"Freelance", length: documents?.filter((h) => h.contract_type_short === "FSA").length },
    ]
    // ✅ Pagination logic
    const totalPages = Math.ceil(filteredDocs?.length / ITEMS_PER_PAGE)
    const paginatedDocs = filteredDocs?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    ) 

    useEffect ( () => {
        if ( documents?.length === 0 ){
            fetchDocs()
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
                            <h1 className="text-[1.4rem] font-cabinet font-extrabold tracking-tight text-gray-900">⭐ Saved Docs</h1>
                            <p className="text-gray-400 text-sm font-satoshi pt-1">All your bookmarked breakdowns, kept in one place for quick reference.</p>
                        </span>

                        <button onClick={() => (navigate("/dashboard"))} className="bg-tet w-[40%] text-primary rounded-lg font-semibold text-sm px-5 hover:-translate-y-[1px] transform py-3">+  Analyze New</button>
                        
                    </section>

                    {/* table section */}
                    {docLoading ? (
                        <div className="h-[50vh] flex items-center justify-center ">
                            <Loader className="size-10 animate-spin text-gray-900" />
                        </div>
                    ) : (
                        documents?.length !== 0 ? (
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
                                                <th className={`${th} `}>FLAGS</th>
                                                <th className={`${th} `}>DATE</th>
                                                <th className={`${th}`}> </th>
                                            </tr>
                                        </thead>

                                        { paginatedDocs?.map( (p) => (

                                            <tr key={p.id} className="border-b border-gray-200  transition-all bg-white ">
                                                {/* contract desc */}
                                                <td className={`${td} font-cabinet `}>
                                                    <span className="inline-flex gap-3 items-center">
                                                        <p className={`${contractIconClass(p.contract_type_short)} p-2 rounded-lg flex-shrink-0`}>{contractIcon(p.contract_type_short)}</p>
                                                        <div className="w-[160px] md:w-[220px] lg:w-[350px] flex-1">
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

                                                {/* red flags */}
                                                <td className={`${td} font-satoshi`}>
                                                    <p className={`text-sm ${redflagsCheckClass(p.meta.flag_count)} w-[75px] md:w-none inline-flex font-semibold py-1.5 px-3 rounded-full `}>{redflagsCheckText(p.meta.flag_count)} </p>
                                                </td>

                                                {/* date */}

                                                <td className={`${td} font-satoshi`}>
                                                    <p className={`text-sm  inline-flex truncate font-medium text-gray-500 `}>{formatAnalysisTime(p.updated_at)} </p>
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
                                                                    removeFromSavedDoc(p.id)
                                                                } catch (error) {
                                                                console.error("Failed to remove from docs status", error);
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
                            <NoSavedDocsEmptyState />
                        )
                    ) }
                    

                    {/* ✅ Pagination */}
                    {filteredDocs.length > ITEMS_PER_PAGE && (
                    <div className="flex items-center justify-between py-4 mt-2">
                        <p className="text-xs text-gray-400">
                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredDocs.length)} of {filteredDocs.length} documents
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