import React, { useState , useEffect } from 'react'
import axios from 'axios'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ filter, setFilter ] = useState('')   
  const [ country, setCountry ] = useState('') 

  useEffect (() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    var found = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
    setFiltered(found)
  }

  return (
    <div className="App">
      <h3>Countries</h3>
      <Filter filterHandler = {handleFilterChange} />
      <Countries countries={filtered} country={country} />
    </div>
  );
}

const Filter = ({filterHandler}) => {
  return (
    <div>
      find countries: <input onChange={filterHandler} />
    </div>
  )
}

const Countries = ({countries, country}) => {
  if (countries.length > 10) {
    console.log("Mayor a 10");
    return(
      <p>Too many matches, please be more specific.</p>
    );
  } else if (countries.length > 1) {
    console.log("Entre 2 y 10");
    return (
      <ul>
        {countries.map(country =>
          <Country key={country.name} country={country} />
        )}
      </ul>
    )
  } else if (countries.length === 1) {
    console.log("Uno.");
    return(
      <FullCountry country={country} />
    );
  } else {
    console.log("No found.");
    return(
      <p>No found.</p>
    );
  }
}

const Country = ({country}) => {
  return(
    <li key={country.name}>{country.name}</li>
  )
}

const FullCountry = ({country}) => {
  return(
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div><img src="{country.flag}" /></div>
    </div>
  )
}

export default App;