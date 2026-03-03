
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts';
import { useMediaQuery } from 'react-responsive';


function Graph({ data }) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const is2xlDevice = useMediaQuery({ maxWidth: 1380 });

  const barSize = isMobile ? 16 : isTablet ? 20 : is2xlDevice ? 30 : 40;

  if (!data) return <p>Loading...</p>;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={{ width: 400, height: 200 }}
        aspect={isMobile ? 1.5 : 2}
      >

        <BarChart data={data.weeklyStats}>
          <Bar
            dataKey="hours"
            barSize={barSize}
            fill="#840227"
            radius={[4, 4, 4, 4]}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 14,
              fontWeight: 600,
              LineHeight: 24,
              fill: "#000000",
            }}
            tickFormatter={(value) => value.charAt(0)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


export default Graph
