import React from 'react'
import Graph from '@/components/ui/graph/Graph'
import useGraphData from '../hook/useGraphData';

function GraphSection() {
    const { data, error, loading } = useGraphData();

    return (
        <div className="bg-surface rounded-lg min-h-55 h-60 2xl:h-79 p-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-xs lg:text-xl">
                        Learning Statistics
                    </h3>
                    <span className="text-sm text-muted-foreground">
                        Hours This Week
                    </span>
                </div>
                <p className="text-2xl font-semibold">
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
