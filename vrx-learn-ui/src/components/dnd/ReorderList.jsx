import React, { useState, useEffect } from 'react'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Icon } from '@/components/ui'
import SortableItem from './SortableItem'


function ReorderList({ items }) {
    const [data, setData] = useState(items);
    console.log(data)
    console.log(items)

    useEffect(() => {
        setData(items);
    }, [items]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = data.findIndex(i => i.id === active.id);
        const newIndex = data.findIndex(i => i.id === over.id);

        const newArray = arrayMove(data, oldIndex, newIndex);

        setData(newArray);

        // later you will call parent here
    };




    return (
        <div>
            <DndContext collisionDetection={closestCorners} sensors={sensors} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                        <Icon name="streamline:one-finger-drag-vertical-remix" height="22px" width="22px" />
                        Drag to Reorder
                    </h3>

                    <div className='touch-none border p-3 mt-3 rounded-lg flex flex-col gap-1'>
                        {data.map((item) => (
                            <SortableItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                            />
                        ))}

                    </div>

                </SortableContext>
            </DndContext>
        </div>
    )
}

export default ReorderList
