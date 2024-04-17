import React, { useState } from 'react';
import axios from 'axios';
import secrets from "../api/secret";
import HotelCard from './HotelCard';

function HotelForm() {
  const [city, setCity] = useState('');
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [hotels, setHotels] = useState([]);
  const [dates, setDates] = useState({arr_date: "", dept_date: ""});

  const headers = {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
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
      headers: headers
    };
    
    try {
      console.log("Choice:", selectedChoice);
      const response = (await axios.request(options)).data;
      console.log(response.data);
      setHotels(response.data.hotels);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
     <div className="HotelForm">
      <div className="container col-md-8 offset-md-2 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Search Hotels</h2>
        <div className="card">
          <div className="card-body">
          <form onSubmit={handleSubmit}>
          <label>
            City:
            <input type="text" value={city} onChange={handleCityChange} />
          </label>
          <button type="button"
           className='btn btn-primary ml-2 fw-normal'
            onClick={fetchChoices}>
            Fetch Choices
          </button>
          <ChoiceList choices={choices} setSelectedChoice={setSelectedChoice} />
          <div className='mt-3'>
            <label htmlFor='arr_date'>Arrival Date </label>
            <input 
            type='date'
            name='arr_date'
            id='arr_date'
            value={dates.arr_date}
            onChange={handleDateChange}
            />
          </div>
          <div className='mt-3 mb-3'>
          <label htmlFor='dept_date'>Departure Date </label>
          <input 
          type='date'
          name='dept_date'
          id='dept_date'
          value={dates.dept_date}
          onChange={handleDateChange}
          />
        </div>
      <SubmitButton />
    </form>
          </div>
        </div>
      </div>
    </div>
    <div className='mt-4 col-md-8 offset-md-2'>
    {hotels && hotels.map((hotel) => (
      <HotelCard
        key={hotel.hotel_id}
        name={hotel.property.name}
        description={hotel.accessibilityLabel}
      />
    ))}
    </div>
    
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
           <label className='ml-2'>
          <input
            type="radio"
            name="choice"
            value={choice.dest_id}
            onChange={handleChoiceChange}
            className='ml-2'
          />
          {choice.name}, {choice.country}
        </label>
        </div>
       
      ))}
    </div>
  );
}

function SubmitButton() {
  return <button type="submit" className='btn btn-success'>Submit</button>;
}

export default HotelForm;
