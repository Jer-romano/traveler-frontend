import React, { useState } from 'react';
import axios from 'axios';

function CityForm() {
  const [city, setCity] = useState('');
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [hotels, setHotels] = useState([]);
  const [dates, setDates] = useState({});

  const headers = {
    'X-RapidAPI-Key': '6cb8181afamsh5437692e02a43efp15980ejsne9ad050cdf8b',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDateChange = (event) => {
    const {name, value} = event.target;
    setDates( data => ({...data, [name]: value}))
  };

  const fetchChoices = () => {
    // Fetch choices based on the city input using Booking-com API
    fetch(`https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${city}`,
    {headers: headers})
      .then((response) => response.json())
      .then((res) => setChoices(res.data))
      .catch((error) => console.error('Error fetching choices:', error));
  };

  const fetchHotels = () => {

  }

   async function handleSubmit(event) {
    event.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
      params: {
        dest_id: selectedChoice,
        search_type: 'CITY',
        arrival_date: dates.arr_date,
        departure_date: dates.dept_date,
        adults: '1',
        children_age: '0,17',
        room_qty: '1',
        page_number: '1',
        languagecode: 'en-us',
        currency_code: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '6cb8181afamsh5437692e02a43efp15980ejsne9ad050cdf8b',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    };
    
    try {
      console.log("Choice:", selectedChoice);
      const response = await axios.request(options);
      console.log(response.data);
      setHotels(response.data.data.hotels);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        City:
        <input type="text" value={city} onChange={handleCityChange} />
      </label>
      <button type="button" onClick={fetchChoices}>
        Fetch Choices
      </button>
      <ChoiceList choices={choices} setSelectedChoice={setSelectedChoice} />
      <div>
        <label htmlFor='arr_date'>Arrival Date (YYYY-MM-DD) </label>
        <input 
         type='text'
         name='arr_date'
         id='arr_date'
         value={dates.arr_date}
         onChange={handleDateChange}
        />
      </div>
      <div>
        <label htmlFor='dept_date'>Departure Date (YYYY-MM-DD) </label>
        <input 
        type='text'
         name='dept_date'
         id='dept_date'
         value={dates.dept_date}
         onChange={handleDateChange}
        />
      </div>
      <SubmitButton />
    </form>
    {hotels && hotels.map((hotel) => (
      <div key={hotel.hotel_id}>
        <p>{hotel.accessibilityLabel}</p>
      </div>
    ))}
    </>
  );
}

function ChoiceList({ choices, setSelectedChoice }) {
  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
    //console.log("Choice:", selectedChoice);
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(choices)}</pre> */}
      {choices.map((choice) => (
        <div key={choice.dest_id}>
           <label>
          <input
            type="radio"
            name="choice"
            value={choice.dest_id}
            onChange={handleChoiceChange}
          />
          {choice.name}, {choice.country}
        </label>
        </div>
       
      ))}
    </div>
  );
}

function SubmitButton() {
  return <button type="submit">Submit</button>;
}

export default CityForm;
