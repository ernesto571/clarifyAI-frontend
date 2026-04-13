import { ArrowRight, FileText, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NoAnalysisEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="bg-white mt-7 mb-8 border border-gray-200 rounded-3xl font-satoshi flex flex-col items-center justify-center py-20 px-6 text-center shadow-sm">
      {/* Visual Icon Stack */}
      <div className="relative mb-6">
        {/* The 'Empty Document' look */}
        <div className="w-20 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 bg-gray-50/50 relative overflow-hidden">
          {/* Skeleton lines representing empty content */}
          <div className="w-8 h-1 bg-gray-100 rounded-full opacity-60"></div>
          <div className="w-12 h-1 bg-gray-100 rounded-full opacity-60"></div>
          <div className="w-9 h-1 bg-gray-100 rounded-full opacity-60"></div>
          <div className="w-10 h-1 bg-gray-100 rounded-full opacity-60"></div>
          
          {/* Faded background icon */}
          <FileText className="absolute size-14 text-gray-100 -bottom-3 -left-3 rotate-12" />
        </div>

        {/* The Action Badge (Search/Analyze) */}
        <div className="absolute -bottom-3 -right-3 w-9 h-9 bg-tet rounded-full flex items-center justify-center shadow-md border-2 border-white">
          <Search className="size-4.5 text-primary" strokeWidth={3} />
        </div>
      </div>

      {/* Text Content */}
      <h2 className="font-cabinet font-extrabold text-gray-900 text-[1.25rem] tracking-tight mt-3">
        No documents analyzed yet
      </h2>
      
      <p className="text-gray-500 text-sm mt-2 max-w-sm leading-relaxed" >
        Your analysis history is currently empty. Analyze your first document to see its plain English summary, red flags, and key takeaways appear here.
      </p>

      {/* Primary Action Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-8 flex gap-2 items-center px-6 py-3 text-sm rounded-xl font-semibold transition-all duration-300 bg-tet text-primary hover:-translate-y-[1px] transform active:scale-[0.98] shadow-sm hover:shadow-md"
      >
        <span>Get Your First Breakdown</span>
        <ArrowRight className="size-4" strokeWidth={2.5} />
      </button>

      {/* Subtle Divider (Optional) */}
      <div className="w-full max-w-lg h-px bg-gray-100 mt-12 mb-6"></div>

      {/* Common examples (Tailored to analysis) */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium text-gray-400">Common analyses you can run:</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {["NDA", "Lease Agreement", "Employment Offer", "Terms of Service", "Freelance Contract"].map((tag) => (
            <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-100 border border-gray-100/50 rounded-full px-3.5 py-1.5 hover:bg-gray-200 hover:border-gray-200 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}