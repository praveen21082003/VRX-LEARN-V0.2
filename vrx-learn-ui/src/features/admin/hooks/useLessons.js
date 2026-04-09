import { createLesson as createLessonService, getLessonsById } from '@/services/lessons.service'
import { useCallback, useState } from 'react'
import { uploadToS3 } from "@/services/upload.service";
import { updateMediaStatus } from '@/services/media.service';

export const useLessons = () => {
    const [lessons, setLessons] = useState(null);
    const [lessonLoading, setLessonLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [lessonsError, setLessonsError] = useState(null);
    
    const [uploadProgress, setUploadProgress] = useState(0);
    const [mediaStatus, setMediaStatus] = useState(null);
    const [loadedData, setLoadedData] = useState(0);

    const createLesson = useCallback(async (payload, file = null) => {
        setIsCreating(true);
        setLessonsError(null);
        setUploadProgress(0);


        try {
            const response = await createLessonService(payload);
            console.log(response);

            const lessonId = response?.lessonId
            const uploadUrl = response?.uploadUrl;
            const mediaId = response?.mediaId;


            if (!uploadUrl || !mediaId) {
                throw new Error("Upload URL or Media ID missing");
            }

            if (file) {
                try {
                    const uploadRes = await uploadToS3(uploadUrl, file, (percent, loaded) => {
                        setUploadProgress(percent);
                        setLoadedData(loaded);
                    });

                    if (uploadRes.status !== 200) {
                        throw new Error("File upload failed");
                    }

                    const mediaRes = await updateMediaStatus(mediaId);

                    const mediaData = mediaRes?.data || mediaRes;

                    setMediaStatus(mediaData?.status);

                    // console.log("Media status:", mediaData);

                } catch (uploadError) {
                    setLessonsError(uploadError);
                    throw uploadError;
                }
            }

            return {
                success: true,
                lessonId: response?.lessonId,
                mediaId: response?.mediaId,
            };

        } catch (err) {
            setLessonsError(err);
            console.error("Error in lesson creation flow:", err);
            throw err;
        } finally {
            setIsCreating(false);
        }
    }, []);





    const fecthLesssons = useCallback(async (moduleId) => {
        if (!moduleId) return;

        setLessonLoading(true);

        
        try {

            const response = await getLessonsById(moduleId);
            setLessons(response);
            setLessonsError(null);
        }
        catch (error) {
            setLessonsError(error);
            throw error;
        }
        finally {
            setLessonLoading(false);
        }
    }, []);




    return {
        lessons,
        isCreating,
        uploadProgress,
        lessonsError,
        createLesson,

        mediaStatus,
        loadedData,
        lessonLoading,
        fecthLesssons,
    };
};