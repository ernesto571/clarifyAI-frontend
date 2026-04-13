import { Check, X } from "lucide-react";
import { statusColor, statusIcon } from "../../constants";

interface Analysis {
    contract_type: string;
    contract_type_short: string;
    contract_type_description: string;
    ai_summary: string;
    key_points: { text: string; type: string }[];
    red_flags: { title: string; location: string; severity: string; description: string }[];
    sections: { title: string; status: string; summary: string }[];
    meta: { analysis_time_seconds: number; document_pages: number | null; flag_count: number; tone: string };
}

interface ViewAnalysisModalProps {
    analysis: Analysis;
    onClose: () => void;
}

const title = "text-gray-400 font-semibold tracking-wide text-[0.7rem]"
const metaTitle = "font-extrabold "
const metaSubtitle = "small"

export default function ViewAnalysisModal({ onClose, analysis }: ViewAnalysisModalProps){

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-[95%] md:w-[70%] h-[80%] overflow-y-auto  mx-4  relative animate-modal">

                {/* close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                    <X size={20} />
                </button>

                <div className="flex flex-col gap-y-5 pt-5 pb-10">
                    <span className="flex items-center gap-3 tracking-tight font-semibold px-5">
                        <h1 className="text-gray-900">✦ Analysis Results</h1>
                        <p className="green text-green rounded-xl p-1 px-2 text-sm">● Complete</p>
                    </span>

                    <div className="border-y border-gray-200 py-4 mt-4">
                        <span className="flex gap-2 text-[0.7rem] px-5">
                            <p className="text-primary">●</p>
                            <p className="text-gray-400 font-semibold tracking-wide">AI SUMMARY</p>
                        </span>
                        <p className="mt-1 leading-6 text-[0.8rem] text-gray-600 px-5" dangerouslySetInnerHTML={{ __html: analysis.ai_summary }} />
                    </div>

                    <div className="grid gap-3 px-5 py-2">
                        <section className=" py-2">
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

                        <section className=" py-2">
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
            </div>
            <style>{`
                @keyframes modal-in {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-modal { animation: modal-in 0.2s ease forwards; }
            `}</style>
        </div>
    )
}