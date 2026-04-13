import { useEffect, useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useAnalyzeStore } from "../../store/AnalyzeStore";
import toast from "react-hot-toast";
import AnalysisLoader from "../../components/Dashboard/AnalysisLoader";
import { Check, FileText, Loader, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { handleCopy, handleExportPDF } from "../../lib/actions";
import { useHistoryStore } from "../../store/HistoryStore";
import { contractIcon, contractIconClass, formatAnalysisTime, redflagsCheckClass, redflagsCheckText, statusColor, statusIcon, tips } from "../../constants";
import { useAuthStore } from "../../store/AuthStore";

const btn = "text-[0.75rem] py-1 px-3 rounded-xl font-semibold cursor-pointer transition-all"
const title = "text-gray-400 font-semibold tracking-wide text-[0.7rem]"
const metaTitle = "font-extrabold "
const metaSubtitle = "small"

export default function Dashboard(){
    const [tone, setTone] = useState("Simple");
    const [activeTab, setActiveTab] = useState("paste");
    const [text, setText] = useState("");
    const [droppedFile, setDroppedFile] = useState<File | null>(null);
    const { history, historyLoading, fetchHistory } = useHistoryStore()

    const { user } = useAuthStore()

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024,
        onDrop: (accepted, rejected) => {
            if (rejected.length > 0) return toast.error("File too large or unsupported format.");
            if (accepted[0]) {
                setDroppedFile(accepted[0]);
                setFormData({ file: accepted[0] });
            }
        },
    });

    const tabs = [
        {id: "paste", label: "Paste Text", icon: "✏️"},
        {id: "upload", label: "Upload PDF", icon: "📄"},
    ];

    const tones = [
        {id: "Simple", label: "Simple", desc: "Plain English, no jargon"},
        {id: "Detailed", label: "Detailed", desc: "Professional legal analysis"},
        {id: "ELI5", label: "ELI5", desc: "Explain like I'm 5"},
    ];


    const actionBtn = [
        { id: "1", label: "📋 Copy", act: () => handleCopy(analysis!) },
        { id: "2", label: "💾 Save", act: () => {} },
        { id: "3", label: "🔥 Export", act: () => handleExportPDF(analysis!) },
    ]

    const {formData, setFormData, analysisLoading, analyzeDoc, analysis} = useAnalyzeStore();


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
        setFormData({ [e.target.name]: e.target.value });
    };

    const handleToneChange = (id: string) => {
        setTone(id)
        setFormData({ tone: id })
    }

    const handleSubmit = async () => {
        if (activeTab === "paste" && !formData.text) return toast.error("Document text is required.");
        if (activeTab === "upload" && !droppedFile) return toast.error("Please upload a file.");
        try {
            await analyzeDoc(formData);
        } catch (err) {
            console.error("Error in handleSubmit", err);
        }
    };

    useEffect (() => {
        fetchHistory()
    }, [] )

    return(
        <section>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 h-[92vh]">
                <div className="hidden lg:grid sidebar">
                    <Sidebar />
                </div>
                <div className=" md:col-span-2 lg:col-span-4 gray flex-1 overflow-y-auto">
                    <section className="my-6 w-[94%] mx-auto">
                        <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-2">
                                <h1 className="text-[1.4rem] font-cabinet font-extrabold tracking-tight">Analyze a Document</h1>
                                <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775841962/sparkles-svgrepo-com_ygevhe.svg" alt="sparkles" className="w-[25px]"/>
                            </span>
                            <p className="text-gray-400 text-sm font-satoshi">Paste text or upload a PDF — get a plain English breakdown instantly.</p>
                        </div>

                        <div className="bg-white rounded-xl mt-5 border border-gray-200 font-cabinet">
                            <span className="px-6 py-3 flex justify-between items-center font-cabinet">
                                <p className="text-gray-900 text-sm font-semibold">Your Document</p>
                                <div className="flex gap-2">
                                    {tones.map((t) => (
                                        <button name={t.label} value={t.id} key={t.id} aria-pressed={tone === t.id} onClick={() => handleToneChange(t.id)} className={`${btn} ${tone === t.id ? "bg-tet text-primary" : "border-gray-300 text-gray-600 border"}`}>{t.label}</button>
                                    ))}
                                </div>
                            </span>

                            <div className="border-y border-gray-200">
                                <div className="flex">
                                    {tabs.map((t) => (
                                        <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold cursor-pointer transition-all border-b-[3px] -mb-[2px] ${activeTab === t.id ? "border-yellow-400 text-gray-900" : "border-transparent text-gray-400"}`}>
                                            <span>{t.icon}</span>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {activeTab === "paste" && (
                                <textarea value={formData.text && text} name="text" onChange={handleChange} maxLength={12000} className="w-full p-4 text-sm font-medium text-gray-500 resize-none outline-none min-h-[120px]" placeholder="Paste your contract, legal document, terms of service, lease, or any text here..."/>
                            )}

                            {activeTab === "upload" && (
                                <div className="p-5">
                                    <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${isDragActive ? "border-tet bg-yellow-50" : droppedFile ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}>
                                        <input {...getInputProps()} />
                                        {droppedFile ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                    <FileText size={22} className="text-green-600" />
                                                </div>
                                                <p className="text-sm font-semibold text-gray-800 mt-1">{droppedFile.name}</p>
                                                <p className="text-xs text-gray-400">{(droppedFile.size / 1024).toFixed(0)} KB</p>
                                                <button onClick={(e) => { e.stopPropagation(); setDroppedFile(null); setFormData({ file: null }); }} className="flex items-center gap-1 text-xs text-red cursor-pointer font-semibold mt-1 bg-red rounded-full px-3 py-1">
                                                    <X size={11}/> Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 text-gray-400">
                                                <div className="w-12 h-12 bg-tet rounded-xl flex items-center justify-center">
                                                    <Upload size={20} className="text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">{isDragActive ? "Drop it here!" : "Drag & drop your document"}</p>
                                                    <p className="text-xs mt-1 text-gray-400">or <span className="text-primary font-semibold underline cursor-pointer">browse files</span></p>
                                                </div>
                                                <p className="text-xs text-gray-300">PDF, DOCX · max 5MB</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <span className="flex px-3 md:px-6 justify-between py-3 items-center border-t border-gray-200">
                                {activeTab === "paste" ? (
                                    <p className={`text-sm font-medium ${text.length > 11000 ? "text-red-400" : "text-gray-400"}`}>{text.length} / 12,000 characters</p>
                                ) : (
                                    <p className="text-sm font-medium text-gray-400">{droppedFile ? "1 file ready" : "No file selected"}</p>
                                )}
                                <button type="button" disabled={analysisLoading} onClick={handleSubmit} className="text-primary bg-tet px-4 py-2 font-semibold rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                                    {analysisLoading ? "✦ Analyzing..." : "✦ Analyze Document"}
                                </button>
                            </span>
                        </div>

                        {analysisLoading ? (
                            <AnalysisLoader />
                        ) : (
                            analysis ? (
                                <div className="pt-5 bg-white mt-3 mb-8 border border-gray-200 rounded-xl font-satoshi">
                                    <div className="flex justify-between items-center font-cabinet px-5">
                                        <span className="flex items-center gap-3 tracking-tight font-semibold">
                                            <h1 className="text-gray-900">✦ Analysis Results</h1>
                                            <p className="green text-green rounded-xl p-1 px-2 text-sm">● Complete</p>
                                        </span>

                                        <span className=" flex gap-3 text-[0.75rem] font-semibold text-gray-900">
                                            
                                            { actionBtn.slice(0,2).map( (a) => (
                                                <button key={a.id} onClick={a.act} className="px-3 py-2 rounded-md border border-gray-200 transform ease-in-out hover:-translate-y-[1px]">
                                                    {a.label}
                                                </button>
                                            )) }

                                            { actionBtn.slice(2).map( (a) => (
                                                <button key={a.id} onClick={a.act} className="px-3 py-2 bg-tet rounded-md text-primary transform ease-in-out hover:-translate-y-[1px]">
                                                    {a.label}
                                                </button>
                                            )) }
                                        </span>
                                    </div>

                                    <div className="border-y border-gray-200 py-4 mt-4">
                                        <span className="flex gap-2 text-[0.7rem] px-5">
                                            <p className="text-primary">●</p>
                                            <p className="text-gray-400 font-semibold tracking-wide">AI SUMMARY</p>
                                        </span>
                                        <p className="mt-1 leading-6 text-[0.8rem] text-gray-600 px-5" dangerouslySetInnerHTML={{ __html: analysis.ai_summary }} />
                                    </div>

                                    <div className="grid grid-cols-2 px-5 py-2">
                                        <section className="border-r border-gray-200 py-2">
                                            <span className="flex gap-2 text-green items-center">
                                                <p>●</p>
                                                <p className={`${title}`}>KEY POINTS</p>
                                            </span>
                                            <div className="mt-2 grid gap-2">
                                                {analysis.key_points.map((k) => (
                                                    <span key={k.text}>
                                                        <p className="flex gap-2.5 small items-center pr-4"><Check className="text-green size-4" /> {k.text}</p>
                                                    </span>
                                                ))}
                                            </div>
                                        </section>

                                        <section className="pl-5 py-2">
                                            <span className="flex gap-2 text-red items-center">
                                                <p>●</p>
                                                <p className={`${title}`}>RED FLAGS</p>
                                            </span>
                                            <div className="mt-2 grid gap-3">
                                                {analysis.red_flags.map((r) => (
                                                    <span key={r.title} className="bg-red small py-2 rounded-xl px-4">
                                                        <p className="text-red text-[0.8rem] font-semibold py-1">⚑ {r.title} [s.{r.location.split(" ")[1]}]</p>
                                                        <p className="small">{r.description}</p>
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    <section className="px-5 py-5 border-y border-gray-200">
                                        <p className={`${title}`}>📑 SECTION BREAKDOWN</p>
                                        <div className="mt-2 flex flex-col gap-2">
                                            {analysis.sections.map((s) => (
                                                <span key={s.title} className="small border border-gray-200 rounded-xl">
                                                    <span className="flex justify-between items-center text-gray-900 text-[0.8rem] font-semibold py-2 gray border-b border-gray-200 px-4">
                                                        <p>{s.title}</p>
                                                        <p className={`${statusColor(s.status)} tracking-tight rounded-xl p-1 px-2 text-[0.75rem]`}>{statusIcon(s.status)}</p>
                                                    </span>
                                                    <p className="text-[0.8rem] py-3 pl-4">{s.summary}</p>
                                                </span>
                                            ))}
                                        </div>
                                    </section>

                                    <div className="grid grid-cols-3">
                                        <section className="flex gap-4 items-center py-3 pl-5 border-r border-gray-200">
                                            <p className="text-[1.8rem] text-gray-900">⏱</p>
                                            <span>
                                                <h5 className={`${metaTitle} text-gray-900`}>{analysis.meta.analysis_time_seconds}s</h5>
                                                <p className={`${metaSubtitle}`}>Analysis time</p>
                                            </span>
                                        </section>
                                        <section className="flex gap-4 items-center py-3 pl-5 border-r border-gray-200">
                                            <p className="text-[1.3rem] text-gray-900">🎚️</p>
                                            <span>
                                                <h5 className={`${metaTitle} text-gray-900`}>{analysis.meta.tone}</h5>
                                                <p className={`${metaSubtitle}`}>Tone</p>
                                            </span>
                                        </section>
                                        <section className="flex gap-4 items-center py-3 pl-5">
                                            <p className="text-[1.3rem] text-gray-900">⚠️</p>
                                            <span>
                                                <h5 className={`${metaTitle} text-red`}>{analysis.meta.flag_count} flags</h5>
                                                <p className={`${metaSubtitle}`}>Items to review</p>
                                            </span>
                                        </section>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white mt-5 mb-8 border border-gray-200 rounded-xl font-satoshi flex flex-col items-center justify-center py-16 px-6 text-center">
                                    <div className="relative mb-5">
                                        <div className="w-20 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 bg-gray-50">
                                            <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
                                            <div className="w-10 h-1.5 bg-gray-200 rounded-full"></div>
                                            <div className="w-6 h-1.5 bg-gray-200 rounded-full"></div>
                                            <div className="w-9 h-1.5 bg-gray-200 rounded-full"></div>
                                            <div className="w-7 h-1.5 bg-gray-200 rounded-full"></div>
                                        </div>
                                        <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-tet rounded-full flex items-center justify-center">
                                            <span className="text-sm">✦</span>
                                        </div>
                                    </div>
                                    <h2 className="font-cabinet font-extrabold text-gray-900 text-[1.1rem] tracking-tight mt-3">Drop your contract here</h2>
                                    <p className="text-gray-400 text-sm mt-1.5 max-w-xs leading-relaxed">Let AI do the heavy lifting — paste any legal document above and get a plain English breakdown instantly.</p>
                                    <div className="flex gap-2 mt-5 flex-wrap justify-center">
                                        {["NDA", "Lease", "Employment", "Terms of Service", "Freelance"].map((tag) => (
                                            <span key={tag} className="text-xs font-semibold text-gray-400 bg-gray-100 rounded-full px-3 py-1">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                </div>

                <div className="hidden md:grid md:col-span-1 px-3 shadow-sm">
                    {/* recent doc */}
                    { user ? (
                        historyLoading ? (
                            <div className="my-12 flex items-center justify-center">
                                <Loader className="size-10 animate-spin text-gray-900" />
                            </div>
                        ) : (
                            <div className="mt-4 font-cabinet">
                                <h1 className="text-gray-500 font-semibold text-[0.83rem]">RECENT DOCUMENTS</h1>
                                <div className=" mt-2">
                                    {history?.slice(0,4).map((h) => (
                                        <span className="flex gap-2  justify-between py-2 border-b border-gray-300 items-center" key={h.id}>
                                            <p className={`${contractIconClass(h?.contract_type_short)} py-1 px-1.5 rounded-lg`}>{contractIcon(h?.contract_type_short)} </p>

                                            <div className=" flex flex-col ">
                                                <h6 className="text-gray-900 font-semibold text-[0.8rem] whitespace-nowrap overflow-hidden w-[100px] text-ellipsis">{h.contract_type}</h6>
                                                <p className="small pt-1">{formatAnalysisTime(h.analyzed_at) }</p>
                                            </div>

                                            <p className={`${redflagsCheckClass(h.meta.flag_count)} whitespace-nowrap text-[0.75rem] font-semibold rounded-xl px-2 py-1`}>{redflagsCheckText(h.meta.flag_count) } </p>
                                        </span>
                                    )) }
                                </div>
                            </div> 
                        )
                    ) : "" }
                     
                    
                    {/* tips */}
                    <div className="mt-4 font-cabinet">
                        <h1 className="text-gray-500 font-semibold text-[0.83rem]">💡 TIPS</h1>

                        <div className="flex-col flex gap-3 items-center font-satoshi mt-3">
                            { tips.map( (t) => (
                                <p className="text-[0.8rem] text-gray-700  p-2 gray rounded-lg" key={t.id}>{t.text} </p>
                            )) }
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}