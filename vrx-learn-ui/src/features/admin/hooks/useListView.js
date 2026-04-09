import { getTraineeRoster } from '@/services/trainerListView.service';
import { useEffect, useState } from 'react';

export default function useTraineeRoster(courseId) {
  const [rosterData, setRosterData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;
    const fetchTraineeRoster = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getTraineeRoster(courseId);
        setRosterData(response);
      } catch (err) {
        setError(err?.message || 'Failed to fetch trainee roster');
      } finally {
        setLoading(false);
      }
    };

    fetchTraineeRoster();
  }, [courseId]);

  return {
    rosterData,
    error,
    loading,
  };
}