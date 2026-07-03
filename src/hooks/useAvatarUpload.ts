import { useState } from "react";
import api from "../services/api";
import { usePortfolioStore } from "../store/portfolioStore";

export function useAvatarUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const setField = usePortfolioStore((state) => state.setField);

  async function uploadAvatar(file: File) {
    try {
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("avatar", file);

      const { data } = await api.post("/upload/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setField("avatar", data.data.url);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return { uploadAvatar, uploading, error };
}
