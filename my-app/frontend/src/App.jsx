/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import Positive from './components/Positive'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null) //display error only when it occurs
  const [successMessage, setSuccessMessage] = useState(null) //display success only when it occurs

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const showMessage = (message, setMessageFunction) => {
    setMessageFunction(message)
    setTimeout(() => {
      setMessageFunction(null)
    }, 6000)
  }

  const addName = (event) => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') {
      showMessage('Please enter both name and number', setErrorMessage)
      return
    }

    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    const processPerson = (personData) => {
      setPersons((prevPersons) => {
        const updatedPersons = prevPersons.map((person) =>
          person.id === personData.id ? personData : person
        )
        return updatedPersons.some((person) => person.id === personData.id)
          ? prevPersons
          : prevPersons.concat(personData)
      })
      setNewName('')
      setNewNumber('')
      console.log(personData)
    }

    if (existingPerson) {
      const numberReplace = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      )

      if (numberReplace) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber,
        }

        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id === existingPerson.id ? response.data : person
            )
            personService.getAll().then((response) => {
              setPersons(response.data)
              setNewName('')
              setNewNumber('')
              showMessage(`New phone number ${newNumber} for ${newName} has been updated`, setSuccessMessage)
            })
          })
          .catch((error) => {
            console.log('Error updating record:', error)
            showMessage(`Information of ${newName} has already been removed from server`, setErrorMessage)
          })
      }
    } else {
      const newRecord = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newRecord)
        .then((response) => {
          processPerson(response.data)
          showMessage(`New record ${newName} - ${newNumber} has been added to the phonebook`, setSuccessMessage)
        })
        .catch((error) => {
          const errorMessage = error.response.data.error
          console.log(errorMessage)
          showMessage(errorMessage, setErrorMessage)
        })
    }
  }
   
  const deleteRecord = (id, person) => {
    if (window.confirm(`Delete current record with name ${person.name} and number ${person.number}?`)) {
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        showMessage(`Record has been deleted from the phonebook`, setSuccessMessage)      
      })
      .catch(error => {
        console.log('Error deleting record:', error)
        showMessage('Error deleting record', setErrorMessage)
      }) 
    } else {
        return
    }
  }

  const dataToShow = showAll
  ? persons
  : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={errorMessage} />
      <Positive message={successMessage} />

      <Filter
      filter={filter}
      handleFilterChange={handleFilterChange} /> 

      <h2>Add a new</h2>

      <PersonForm 
      addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons dataToShow={dataToShow} deleteRecord={deleteRecord} />
    </div>
  )
}

export default App