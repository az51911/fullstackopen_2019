import React from "react";

const Persons = ({ persons_info, search_string, DeletePersonButton }) => {
    let showAll = search_string === "";

    const Person = ({id,name,number}) => {
        console.log(id)
        console.log(name)
        console.log(number)
        return (
            <div>
                {name} {number}  <button onClick={() => { DeletePersonButton(id)}}> delete </button>
            </div>
        );
    };

    const PeopleToShow = showAll
        ? persons_info
        : persons_info.filter(person =>
            person.name.toUpperCase().includes(search_string.toUpperCase())
        );

    const entries = () => 
        PeopleToShow.map(person => 
            (
                <Person key={person.id} id={person.id} name={person.name} number={person.number} /> 
            )
    );
    

    return <div>{entries()}</div>;
};

export default Persons;
