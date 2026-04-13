import { useEffect, useState } from "react";

const steps = [
  { id: "read", label: "Reading your document" },
  { id: "type", label: "Identifying contract type" },
  { id: "flags", label: "Scanning for red flags" },
  { id: "clauses", label: "Analyzing key clauses" },
  { id: "summary", label: "Generating summary" },
];

export default function AnalysisLoader() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) return;
    const timer = setTimeout(() => setCurrent((p) => p + 1), 1800);
    return () => clearTimeout(timer);
  }, [current]);

  const progress = Math.round((current / steps.length) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md mx-auto mt-7 font-cabinet">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
        <span className="text-sm font-medium text-gray-500">Analyzing your document...</span>
      </div>

      <div className="flex flex-col">
        {steps.map((step, i) => {
          const state = i < current ? "done" : i === current ? "active" : "pending";
          return (
            <div key={step.id} className="flex items-center gap-3 py-2.5">
              <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs flex-shrink-0 transition-all duration-300
                ${state === "done" ? "bg-green-50 border-green-200 text-green-600" : ""}
                ${state === "active" ? "bg-yellow-50 border-yellow-300 text-yellow-800" : ""}
                ${state === "pending" ? "bg-gray-50 border-gray-200 text-gray-300" : ""}
              `}>
                {state === "done" && "✓"}
                {state === "active" && <span className="w-3 h-3 border-2 border-yellow-300 border-t-yellow-800 rounded-full animate-spin"></span>}
                {state === "pending" && "·"}
              </div>
              <span className={`text-sm font-medium transition-colors duration-300
                ${state === "done" ? "text-green-600" : ""}
                ${state === "active" ? "text-gray-900" : ""}
                ${state === "pending" ? "text-gray-300" : ""}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-right">{progress}%</p>
      </div>
    </div>
  );
}