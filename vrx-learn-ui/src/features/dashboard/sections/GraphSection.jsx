import React from 'react';
import Graph from '@/components/ui/graph/Graph';
import { IconContainer } from "@/components/ui";


function GraphSection() {

    // const learningData = {
    //     "totalHours": 12.5,
    //     "weeklyStats": [
    //         { "day": "Sun", "hours": 1.5 },
    //         { "day": "Mon", "hours": 2 },
    //         { "day": "Tue", "hours": 1 },
    //         { "day": "Wed", "hours": 1.5 },
    //         { "day": "Thu", "hours": 2 },
    //         { "day": "Fri", "hours": 2.5 },
    //         { "day": "Sat", "hours": 2 }
    //     ]
    // };

    const learningData = false


    const renderGraph = () => {

        if (!learningData) {
            return (
                <div className='flex flex-col gap-4 items-center text-main justify-center'>
                    <IconContainer icon="uil:statistics" />
                    <h4 className='text-h4'>Analytics Preview</h4>
                    <p className='text-body text-muted text-center'>Start learning to unlock insights and track your progress. Advanced analytics coming soon.</p>
                </div>
            )
        }

        return (
            <>
                <div className="flex justify-between items-center text-main">
                    <div>
                        <h3 className="text-h4">Learning Statistics</h3>
                        <span className="text-ll">Hours This Week</span>
                    </div>
                    <p className="text-h3">{learningData?.totalHours} hrs</p>
                </div>

                <div className="relative block w-full h-40 mt-4 overflow-hidden">
                    <Graph data={learningData} />
                </div>
            </>
        )
    }

    return (
        <div className="relative bg-primary-16 noise-overlay rounded-lg p-4 w-full">
            {renderGraph()}
        </div>
    );
}

export default GraphSection;