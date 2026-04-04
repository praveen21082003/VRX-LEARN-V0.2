import React, { useMemo, useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts';
import { useTheme } from '@/context/ThemeProvider';

function Graph({ data }) {
  const { darkMode } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Force a re-render after mount to ensure the DOM is ready
  useEffect(() => {
    setIsClient(true);
  }, []);

  const textColor = useMemo(() => {
    if (typeof window === "undefined" || !isClient) return "#888";
    const style = getComputedStyle(document.documentElement);
    return darkMode
      ? style.getPropertyValue("--color-text-main-dark").trim()
      : style.getPropertyValue("--color-text-main").trim();
  }, [darkMode, isClient]);

  // If we aren't on the client yet or data is missing, show a placeholder
  // This keeps the height consistent so the chart doesn't freak out
  if (!isClient || !data?.weeklyStats) {
    return <div className="w-full h-[160px] md:h-[180px] bg-transparent" />;
  }


  return (
    <div className="w-full h-full min-h-[160px]">
      <ResponsiveContainer width="99%" height={160}>
        {/* Using 99% and a fixed height number often solves the -1 error */}
        <BarChart data={data.weeklyStats} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
          <Bar
            dataKey="hours"
            fill="#840227"
            radius={[4, 4, 4, 4]}
            barSize={32}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: textColor || "#888" }}
            tickFormatter={(str) => str?.charAt(0) || ''}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;