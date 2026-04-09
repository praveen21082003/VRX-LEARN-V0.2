import { useState, useCallback } from 'react';
import { uploadToS3 } from "@/services/upload.service";
import { updateMediaStatus } from '@/services/media.service';
import { createAssignment as createAssignmentService, getAssignment, updateAssignmentById, deleteAssignment as deleteAssignmentService } from '@/services/assignments.service';

export default function useAssignment() {
  const [isCreating, setIsCreating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [loadedData, setLoadedData] = useState(0);

  const [assignment, setAssignment] = useState(null);
  const [assignmentLoading, setAssignmentloading] = useState(false);
  const [assignmentError, setAssignmentError] = useState(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const [mediaStatus, setMediaStatus] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);


  const createAssignment = useCallback(async (payload, file) => {
    setIsCreating(true);
    setUploadProgress(0);
    setError(null);

    try {

      const response = await createAssignmentService(payload);

      const uploadUrl = response?.uploadUrl;
      const mediaId = response?.mediaId;

      console.log(response)


      if (file && uploadUrl) {
        const uploadRes = await uploadToS3(uploadUrl, file, (percent, loaded) => {
          setUploadProgress(percent);
          setLoadedData(loaded);
        });

        console.log(uploadRes);

        if (uploadRes.status !== 200) {
          throw new Error("File upload failed");
        }


        if (mediaId) {
          const mediaRes = await updateMediaStatus(mediaId);
          console.log(mediaRes);
          const mediaData = mediaRes?.data || mediaRes;
          setMediaStatus(mediaData?.status);
        }


      }

      return response;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to create assignment";
      setError(msg);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);


  const fetchAssignment = useCallback(async (assignmentId) => {
    setAssignmentloading(true);
    setAssignmentError(null);
    // console.log(assignmentId)

    try {
      const response = await getAssignment(assignmentId);
      console.log(response)
      setAssignment(response);
    } catch (error) {
      setAssignmentError(
        error.response?.data?.message || error.message || "Failed to get assignment"
      );
      setAssignment(null);
    } finally {
      setAssignmentloading(false);
    }
  }, []);

  const updateAssignment = useCallback(async (assignmentId, payload) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const res = await updateAssignmentById(assignmentId, payload);
      return res;
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Update failed";
      setUpdateError(msg);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteAssignment = useCallback(async (id) => {
    setIsDeleting(true);
    try {
      const response = await deleteAssignmentService(id);
      return response;

    } catch (err) {
      throw err;
    } finally {
      setIsDeleting(false);
    }

  })

  return {
    createAssignment,
    isCreating,
    uploadProgress,
    error,
    loadedData,

    assignment,
    assignmentLoading,
    assignmentError,
    fetchAssignment,

    updateAssignment,
    isUpdating,
    updateError,

    deleteAssignment,
    isDeleting,

    mediaStatus
  };

};