import { API_CONFIG } from "../api/config";
import { supabase } from "./supabase-client";


export const uploadFileHelper = async (userId: number, file: File | string, type: string = "post") => {
    const bucketName = API_CONFIG.supabase.bucketName

    if (typeof file !== "string") {
        const filePath = `images/users/${userId}/${type}/${Date.now()}/${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

        if (error) {
            console.error("Upload error:", error.message);
            return null;
        }

        const resFullPath = supabase.storage.from(API_CONFIG.supabase.bucketName).getPublicUrl(filePath);

        return resFullPath.data.publicUrl
    } 

    return file

};