import React from "react";

const Persons = ({ persons_info, search_string }) => {
    let showAll = search_string === "";

    const Person = ({ name, number }) => {
        return (
            <div>
                {name} {number}
            </div>
        );
    };

    const PeopleToShow = showAll
        ? persons_info
        : persons_info.filter(person =>
            person.name.toUpperCase().includes(search_string.toUpperCase())
        );

    const entries = () =>
        PeopleToShow.map(person => (
            <Person key={person.name} name={person.name} number={person.number} />
        ));
    return <div>{entries()}</div>;
};

export default Persons;
