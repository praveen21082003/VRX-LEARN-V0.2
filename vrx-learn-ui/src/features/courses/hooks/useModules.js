import { useCallback, useState } from "react";
import { getModuleById, updateModuleById } from "@/services/modules.service";

export default function useModules() {
  const [modules, setModules] = useState(null);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [moduleError, setModuleError] = useState(null);


  const fetchModules = useCallback(async (id) => {
    if (!id) return;

    setModuleLoading(true);
    setModuleError(null);

    try {
      const response = await getModuleById(id);
      setModules(response);
      console.log(response);
      return response;
    } catch (err) {
      setModuleError(err);
      console.error("Error fetching modules:", err);
      throw err;
    } finally {
      setModuleLoading(false);
    }
  }, []);


  const updateModule = useCallback(async (id, data) => {
    setIsUpdating(true);
    setModuleError(null); 
    try {
      const response = await updateModuleById(id, data);
      setModules(response.data);
      return response.data;
    } catch (err) {
      setModuleError(err);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    modules,
    moduleLoading,
    isUpdating,
    moduleError,
    updateModule,
    fetchModules
  };
}