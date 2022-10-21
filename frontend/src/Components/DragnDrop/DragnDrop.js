import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragnDrop.css'
import { faGears, faBuilding, faUser, faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import UserModal from '../Settings/UserModal';
function DragnDrop() {
    const dragcomponents = [
        {
            id: 'settings',
            name: 'Settings',
            icon: faGears,
            route: '/settings'
        },
        {
            id: 'myCompany',
            name: 'Company',
            icon: faBuilding,
            route:'/company'
        },
        {
            id: 'newEmployee',
            name: 'Add A New Employee',
            icon: faUser,
            route:'/adduser'
        },
        {
            id: 'Reports',
            name: 'Reports',
            icon: faChartColumn,
            route:'/reports'
            
        }
    ]
    const [characters, updateCharacters] = useState(dragcomponents);
    const [userModal, setUserModal] = useState(false);

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
                            {characters.map(({ id, name, icon, route }, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <Link to={route}className='list-drag-comp' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                <FontAwesomeIcon icon={icon} size='5x' />
                                                <h3 className='draggable-header'>
                                                    {name}
                                                </h3>
                                            </Link>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <UserModal id="user-modal-modal"
                show={userModal}
                onHide={setUserModal}
            />
        </div>
    )
}

export default DragnDrop