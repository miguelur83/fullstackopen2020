import React, { useState , useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect (() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log(response.data)
    })
  }, [])
    
  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    console.log('button clicked', event.target)
    if (persons.findIndex(person => person.name === newName) !== -1) {
      console.log("FOUND");
      var theperson = persons.find((person) => person.name === newName)
      if (newNumber != theperson.number){
        if (window.confirm(`${newName} is already added to phonebook. Do you want to update their number?`)) { 
          theperson.number = newNumber
          personService
          .update(theperson.id, theperson)
          .then(response => {
            setPersons(persons.map((person) => (person.id === theperson.id?theperson:person)))
            console.log(response)
          })
        }
      } else {
        alert (`${newName} is already added to phonebook`)
      }
    } else {
      console.log("Saving person");
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleDelete = (event) => {
    var person = persons.find(person => person.id == event.target.id)
    if (window.confirm(`Do you really want to delete ${person.name}?`)) { 
      console.log("Delete ", event.target.id);
      personService
      .erase(event.target.id)
      .then(response => {
        console.log(response);
        setPersons(persons.filter(person => person.id != event.target.id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler = {handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm handleOnSubmit={handleOnSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

const Filter = ({filterHandler}) => {
  return (
    <div>
      filter by name: <input onChange={filterHandler} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleOnSubmit}>
      <div>
        name: <input onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, filter, handleDelete}) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <Person key={person.name} person={person} handleDelete={handleDelete} />
      )}
    </ul>
  )
}

const Person = ({person, handleDelete}) => {
  return(
    <li key={person.name}>{person.name}: {person.number} <button id={person.id} onClick={handleDelete}>delete</button></li>
  )
}

export default App