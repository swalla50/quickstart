import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragnDrop.css'
import { faGears, faBuilding, faUser, faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function DragnDrop() {
    const dragcomponents = [
        {
            id: 'settings',
            name: 'Settings',
            icon: faGears
        },
        {
            id: 'myCompany',
            name: 'Company',
            icon: faBuilding
        },
        {
            id: 'newEmployee',
            name: 'Add A New Employee',
            icon: faUser
        },
        {
            id: 'Reports',
            name: 'Reports',
            icon: faChartColumn
        }
    ]
    const [characters, updateCharacters] = useState(dragcomponents);

    function handleOnDragEnd(result) {
        console.log(result)
        if (!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);

    }

    return (
        <div className='draggable-container'>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {characters.map(({ id, name, icon }, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <li className='list-drag-comp' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                <FontAwesomeIcon icon={icon} size='5x' />
                                                <h3 className='draggable-header'>
                                                    {name}
                                                </h3>
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default DragnDrop