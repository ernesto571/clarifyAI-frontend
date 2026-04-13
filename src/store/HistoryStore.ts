import { create } from "zustand";
import axios from "../lib/axios";

interface History {
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
    is_saved : boolean;
}

interface HistoryStore {
    history: History[] ;
    historyLoading: boolean;
    error: string | null;
    fetchHistory: () => Promise<void>;
}

export const useHistoryStore = create < HistoryStore >((set) => ({
    history: [],
    historyLoading: false,
    error : null,

    fetchHistory : async () => {
        console.log("📡 fetchHistory starting..")
        set({ historyLoading: true, error: null });
        try {
          const res = await axios.get("/history");
          console.log("✅ fetchHistory success", res.data);
          set({ history: res.data.history, historyLoading: false });
        } catch (err: any) {
          console.error("🔴 fetchHistory : failed", {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message,
          });
          set({ error: err.message, historyLoading: false });
          // toast.error(err.message);
        }
    }
}))


