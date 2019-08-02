import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import PersonService from './services/PersonService'
import Notification from './components/Notification' 

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [searchString, setSearch] = useState("")
    const [PersonsChange, setPersonsChange] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmationMessage, setConfirmationMessage] = useState(null)
    const [messageValue, setMessageValue] = useState(null)

    useEffect(() => {
        console.log("use effect now")
        console.log("PersonChange is: ", PersonsChange)
        PersonService
            .getAll()
            .then(initialPeople => {
                setPersons(initialPeople)
        })
    }, [PersonsChange])

    const handleSearchChange = event => {
        //console.log(event.target.value)
        setSearch(event.target.value)
    };

    const handlePersonChange = event => {
        //console.log(event.target.value)
        setNewName(event.target.value)
    };

    const handleNumberChange = event => {
        //console.log(event.target.value)
        setNewNumber(event.target.value)
    };

    const addPerson = event => {
        event.preventDefault();
        let person_already_there_flag = 0;
        const PersonObject = {
            id: persons.length + 1,
            name: newName,
            number: newNumber
        };

        persons.forEach(element => {
            if (element.name === PersonObject.name) {
                let person_to_update = element.name
                let result = window.confirm(`${person_to_update} is already added to the phonebook, replace the old number with a new one?`);
                PersonObject.id = element.id
                person_already_there_flag = 1
                if(result){
                    PersonService.update(element.id, PersonObject)
                        .then(data => {
                            console.log("response is: ",data)
                            setPersonsChange(!PersonsChange)
                            
                            setConfirmationMessage(
                                `${PersonObject.name}'s number was updated`
                            )
                            setTimeout(() => {
                                setConfirmationMessage(null)
                            }, 3000)
                        })
                        .catch(error => {
                            setConfirmationMessage(
                                `Information of ${PersonObject.name} was already removed from server`
                            )
                            setTimeout(() => {
                                setConfirmationMessage(null)
                            }, 3000)
                            setMessageValue("error")
                            setPersons(persons.filter(n => n.id !== PersonObject.id))
                            console.log(persons)
                            setPersonsChange(!PersonsChange)
                        })

                    }
                }
        });
        if (!person_already_there_flag) {
            console.log("adding person")
            PersonService
                .create(PersonObject)
                .then(data => {
                    console.log("person added")
                    setPersonsChange(!PersonsChange)
                    setPersons(persons.concat(data))
                })
            setConfirmationMessage(
                `${PersonObject.name} added`
            )
            setTimeout(() => {
                setConfirmationMessage(null)
            }, 3000)
            setMessageValue("addition")
            console.log(persons)
        }

    };


    const DeletePerson = (props) => {
        let id = props
        let person_to_delete = persons.filter(person =>
            person.id === id)
        let person_to_delete_name = person_to_delete[0].name
        console.log(id)
        console.log(person_to_delete_name)
        let result = window.confirm(`delete ${person_to_delete_name}?`)
        if(result)
        {
            PersonService.delete_person(id)
                .then(data => {
                    setPersonsChange(!PersonsChange)
                })
                .catch(error => {
                    setConfirmationMessage(
                        `Information of ${person_to_delete_name} was already removed from server`
                    )
                    setTimeout(() => {
                        setConfirmationMessage(null)
                    }, 3000)
                    setMessageValue("error")
                    setPersonsChange(!PersonsChange)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={confirmationMessage} messageId={messageValue} />
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
            <Persons persons_info={persons} search_string={searchString} DeletePersonButton={DeletePerson}/> 
        </div>
    );
};

export default App;
