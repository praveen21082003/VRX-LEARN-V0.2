import React from 'react'
import Graph from '@/components/ui/graph/Graph'
import useGraphData from '../hook/useGraphData';

function GraphSection() {
    const { data, error, loading } = useGraphData();

    return (
       <div className="relative bg-primary-16 noise-overlay rounded-lg min-h-55 h-60 2xl:h-79 p-4">
            <div className="flex justify-between items-center text-main">
                <div>
                    <h3 className="text-h4">
                        Learning Statistics
                    </h3>
                    <span className="text-ll">
                        Hours This Week
                    </span>
                </div>
                <p className="text-h3">
                    {data?.totalHours} hrs
                </p>
            </div>

            <div className="flex-1 min-h-0">
                <Graph data={data} />
            </div>
        </div>

    )
}

export default GraphSection
