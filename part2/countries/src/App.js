import React, { useState , useEffect } from 'react'
import axios from 'axios'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')   
  const [ weather, setWeather] = useState([])
  const [ gotWeather, setGotWeather] = useState(0)

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
    setGotWeather(0)
  }
      
  const handleShow = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  var filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if ((filtered.length === 1) && (!gotWeather)) {
    console.log('getting weather');
    var country = filtered[0]
    console.log("capital:",country.capital);
    const tempkey = process.env.REACT_APP_API_KEY;
    var apirequest = 'http://api.weatherstack.com/current?access_key='+tempkey+'&query='+country.capital
    //console.log(apirequest);
    axios
      .get(apirequest)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
        setGotWeather(1)
    })
  }

  
  console.log('filter:', filter);
  console.log("filtered:", filtered);

  return (
    <div className="App">
      <h3>Countries</h3>
      <Filter filterHandler = {handleFilterChange} />
      <CountryList countries={filtered} handleShow={handleShow} weather={weather}/>
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

const CountryList = ({countries, handleShow, weather}) => {
  if (countries.length > 10) {
    console.log("Mayor a 10");
    return(
      <p>Too many matches, please be more specific.</p>
    )
  } else if (countries.length > 1) {
    console.log("Entre 2 y 10");
    return (
      <ul>
        {countries.map(country =>
          <Country key={country.name} country={country} handleShow={handleShow} />
        )}
      </ul>
    )
  } else if (countries.length === 1) {
    console.log("Uno.");
    return(
      <FullCountry country={countries[0]} weather={weather} />
    )
  } else {
    console.log("No found.");
    return(
      <p>No found.</p>
    )
  }
}

const Country = ({country, handleShow}) => {
  return(
    <li key={country.name}>{country.name} <button value={country.name} type='submit' onClick={handleShow}>show</button></li>
  )
}

const FullCountry = ({country, weather}) => {
  console.log(weather);
  return(
    <div>
      <h2>{country.name}</h2>      
      <div>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Languages:</p>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <p>Currencies:</p>
        <ul>
          {country.currencies.map(currency => <li key={currency.name}>{currency.name}</li>)}
        </ul>
      </div>
      <div><img alt={country.name} width="200px" src={country.flag} /></div>
      <h2>Weather Report from {(typeof weather.location != 'undefined')?weather.location.name:''}:</h2>
      <p>Temp: {(typeof weather.current != 'undefined')?weather.current.temperature:''}</p>
      <p>Feels like: {(typeof weather.current != 'undefined')?weather.current.feelslike:''}</p>
      <p>Humidity: {(typeof weather.current != 'undefined')?weather.current.humidity:''}</p>
      <div><img alt="weather" width="100px" src={(typeof weather.current != 'undefined')?weather.current.weather_icons:''} /></div>
    </div>
  )
}

export default App;