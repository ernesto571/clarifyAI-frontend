import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

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

interface FormData {
    text?: string;
    tone: string;
    file?: File | null;
}

interface AnalyzeStore {
    analysis: Analysis | null;
    analysisId: number | null;
    formData: FormData;
    analysisLoading: boolean;
    error: string | null;
    analyzeDoc: (data: FormData) => Promise<void>;
    setFormData: (data: Partial<FormData>) => void;
    resetAnalysis: () => void;
}

const initialFormData: FormData = {
    text: "",
    tone: "Simple",
    file: null,
};

export const useAnalyzeStore = create<AnalyzeStore>((set) => ({
    analysis: null,
    analysisId: null,
    formData: initialFormData,
    analysisLoading: false,
    error: null,

    analyzeDoc: async (data) => {
        console.log("📡 analyzeDoc: starting...", data);
        set({ analysisLoading: true, error: null });

        try {
            let res;

            if (data.file) {
                const formPayload = new FormData();
                formPayload.append("file", data.file);
                formPayload.append("tone", data.tone);
                res = await axios.post("/analyze", formPayload, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                res = await axios.post("/analyze", {
                    text: data.text,
                    tone: data.tone,
                });
            }

            console.log("✅ analyzeDoc: success", res.data.analysis);
            set({ analysis: res.data.analysis, analysisId: res.data.id, analysisLoading: false });
        } catch (err: any) {
            console.error("🔴 analyzeDoc: failed", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            set({ error: err.message, analysisLoading: false });
            toast.error(err.response?.data?.message || "No Internet Connection");
        }
    },

    setFormData: (data) => {
        console.log("📝 setFormData:", data);
        set((state) => ({ formData: { ...state.formData, ...data } }));
    },

    resetAnalysis: () => {
        set({ analysis: null, formData: initialFormData });
    },
}));