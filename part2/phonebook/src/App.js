import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchString, setSearch] = useState("");

    const handleSearchChange = event => {
        //console.log(event.target.value);
        setSearch(event.target.value);
    };

    const handlePersonChange = event => {
        //console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = event => {
        //console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const addPerson = event => {
        event.preventDefault();
        let person_already_there_flag = 0;
        const PersonObject = {
            name: newName,
            number: newNumber
        };

        persons.forEach(element => {
            if (element.name === PersonObject.name) {
                alert(`${PersonObject.name} is already added to phonebook`);
                person_already_there_flag = 1;
            }
        });
        if (!person_already_there_flag) {
            setPersons(persons.concat(PersonObject));
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                input_string={searchString}
                change_function={handleSearchChange}
            />
            <h3>add a new</h3>
            <PersonForm
                onSubmit={addPerson}
                input_name={newName}
                input_name_onchange={handlePersonChange}
                input_number={newNumber}
                input_number_onchange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons_info={persons} search_string={searchString} />
        </div>
    );
};

export default App;
