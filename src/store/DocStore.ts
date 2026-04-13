import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

interface Doc {
    id: number;
    auth_id: string;
    contract_type: string;
    contract_type_short: string;
    contract_type_description: string;
    ai_summary: string;
    key_points: { text: string; type: string }[];
    red_flags: { title: string; location: string; severity: string; description: string }[];
    sections: { title: string; status: string; summary: string }[];
    meta: { analysis_time_seconds: number; document_pages: number | null; flag_count: number; tone: string };
    analyzed_at: string;
    updated_at: string;
    is_saved : boolean;
}

interface DocStore {
    documents: Doc[] | null;
    docLoading: boolean;
    error: string | null;
    fetchDocs: () => Promise<void>;
    saveDoc: (id: number) => Promise<void>;
    removeFromSavedDoc: (id: number) => Promise<void>;
}

export const useDocStore = create<DocStore>( (set)=> ({
    documents: [],
    docLoading: false,
    error: null,

    fetchDocs : async () => {
        console.log("📡 fetchHistory starting..")
        set({ docLoading: true, error: null });
        try {
          const res = await axios.get("/documents");
          console.log("✅ fetchDoc success", res.data);
          set({ documents: res.data.userDocs, docLoading: false });
        } catch (err: any) {
          console.error("🔴 fetchDoc : failed", {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message,
          });
          set({ error: err.message, docLoading: false });
          toast.error("No Internet Connection.");
        }
    },

    saveDoc: async (id) => {
        set({ docLoading: true, error: null });
        try {
            const res = await axios.patch(`/documents/${id}/save`);
            console.log(res)
            
            set((state) => ({
                documents: state.documents?.map((d) => d.id === id ? { ...d, is_saved: true } : d),
                docLoading: false
            }));
            toast.success("Document saved.");
        } catch (err: any) {
            set({ error: err.message, docLoading: false });
            toast.error("No Internet Connection.");
        }
    },
    
    removeFromSavedDoc: async (id) => {
        set({ docLoading: true, error: null });
        try {
            const res = await axios.patch(`/documents/${id}/unsave`);
            console.log(res)
            set((state) => ({
                documents: state.documents?.map((d) => d.id === id ? { ...d, is_saved: false } : d),
                docLoading: false
            }));
            toast.success("Removed from saved documents.");
        } catch (err: any) {
            set({ error: err.message, docLoading: false });
            toast.error("No Internet Connection.");
        }
    },


}))