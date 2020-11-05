import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.findIndex(person => person.name === newName) !== -1) {
      console.log("FOUND");
      alert (`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      console.log('button clicked', event.target)
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
      <Persons persons={persons} filter={filter} />
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

const Persons = ({persons, filter}) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <Person key={person.name} person={person} />
      )}
    </ul>
  )
}

const Person = ({person}) => {
  return(
    <li key={person.name}>{person.name}: {person.number}</li>
  )
}

export default App