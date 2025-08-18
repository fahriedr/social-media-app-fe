import { API_CONFIG } from "../api/config";
import { supabase } from "./supabase-client";


export const uploadFile = async (bucketName: string, file: File, fileName: string) => {

    const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

    if (error) {
        console.error("Upload error:", error.message);
        return null;
    }

    const resFullPath = supabase.storage.from(API_CONFIG.supabase.bucketName).getPublicUrl(fileName);

    return resFullPath.data.publicUrl;
};