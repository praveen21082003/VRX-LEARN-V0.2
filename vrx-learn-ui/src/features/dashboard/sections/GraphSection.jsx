import React from 'react'
import Graph from '@/components/ui/graph/Graph'
import useGraphData from '../hook/useGraphData';

function GraphSection() {
    const { data, error, loading } = useGraphData();

    return (
        <div className="bg-surface rounded-lg min-h-55 h-56 2xl:h-62 p-4">
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

            <Graph data={data} />
        </div>

    )
}

export default GraphSection
