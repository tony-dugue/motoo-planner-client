import React from 'react';
import {useSelector} from "react-redux";
import {selectInformations} from 'features/roadbook/roadbookSlice';
import {InformationItem} from "features/information/InformationItem";
import {InformationAdd} from "features/information/InformationAdd";

export function InformationContainer() {

    const informationTodo = useSelector(selectInformations)

    return (
        <div className="information__todo-container">

            <InformationAdd />

            {informationTodo.map(item => (
                <InformationItem key={item.id}
                                 id={item.id}
                                 name={item.name}
                                 phone={item.phone}
                                 email={item.email}
                                 description={item.description}
                />
            ))}

        </div>
    );
}
