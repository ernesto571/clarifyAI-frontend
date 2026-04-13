import { ArrowRight, FileText, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NoSavedDocsEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="bg-white mt-7 mb-8 border border-gray-200 rounded-3xl font-satoshi flex flex-col items-center justify-center py-20 px-6 text-center shadow-sm">
      {/* Visual Icon Stack */}
      <div className="relative mb-6">
        {/* The 'Empty Document' look */}
        <div className="w-20 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 bg-gray-50/50 relative overflow-hidden">
          <div className="w-8 h-1 bg-gray-100 rounded-full opacity-60"></div>
          <div className="w-12 h-1 bg-gray-100 rounded-full opacity-60"></div>
          <div className="w-9 h-1 bg-gray-100 rounded-full opacity-60"></div>
          <div className="w-10 h-1 bg-gray-100 rounded-full opacity-60"></div>
          
          <FileText className="absolute size-14 text-gray-100 -bottom-3 -left-3 rotate-12" />
        </div>

        {/* The Saved/Bookmark Badge */}
        <div className="absolute -bottom-3 -right-3 w-9 h-9 bg-tet rounded-full flex items-center justify-center shadow-md border-2 border-white">
          <Bookmark className="size-4.5 text-primary fill-primary" strokeWidth={3} />
        </div>
      </div>

      {/* Text Content */}
      <h2 className="font-cabinet font-extrabold text-gray-900 text-[1.25rem] tracking-tight mt-3">
        No saved documents yet
      </h2>
      
      <p className="text-gray-500 text-sm mt-2 max-w-sm leading-relaxed">
        You haven't bookmarked any contract breakdowns. Save important analyses to quickly access them whenever you need.
      </p>

      {/* Primary Action Button */}
      <button
        onClick={() => navigate("/history")}
        className="mt-8 flex gap-2 items-center px-6 py-3 text-sm rounded-xl font-semibold transition-all duration-300 bg-tet text-primary hover:-translate-y-[1px] transform active:scale-[0.98] shadow-sm hover:shadow-md"
      >
        <span>View Analysis History</span>
        <ArrowRight className="size-4" strokeWidth={2.5} />
      </button>

      {/* Subtle Divider */}
      <div className="w-full max-w-lg h-px bg-gray-100 mt-12 mb-6"></div>

      {/* Contextual Footer */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium text-gray-400">Common documents users save:</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {["Work Contracts", "Rent Agreements", "Privacy Policies", "NDAs"].map((tag) => (
            <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-100 border border-gray-100/50 rounded-full px-3.5 py-1.5 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}