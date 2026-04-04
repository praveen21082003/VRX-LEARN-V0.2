import { useEffect, useState } from "react";
import { getAdminKpis } from "@/services/dashboard.service";

export default function useAdminKpis() {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchKpis() {
      try {
        const kpisData = await getAdminKpis();
        setKpis(kpisData);
      } catch (err) {
        console.warn(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchKpis();
  }, []);

  return { kpis, loading, error };
}
