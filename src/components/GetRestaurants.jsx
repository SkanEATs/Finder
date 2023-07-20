// Importing required libraries
import React, {useState, useEffect} from "react";
import axios from "axios";
import {motion} from "framer-motion";

// Defining the GetRestaurants functional component
const GetRestaurants = () => {
  // Setting the initial state of restaurants to an empty array
  const [restaurants, setRestaurants] = useState ([])

  // Hard-coded coordinates for Skaneateles, NY
  const coordinates = { lat: 42.9467, lon: -76.4294 }

  // Using the useEffect hook to make an API call using axios and the RapidAPI service
  useEffect (() => {
      const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
        params: {
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          limit: '100',
          distance: '2',
        },
        headers: {
          'X-RapidAPI-Key': '0f936a69d2msh4ec2661c6990d92p130d5djsnebac8ee408f5',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };

      // Making the API call using axios, filtering the reponse data to include only restaurants with a name, and setting the state using setRestaurants
      axios.request(options).then(function (response) {
        // Logging the response data to the console
        console.log(response.data)
        // Setting the state of restaurants to the filtered data
        const filteredData = response.data.data.filter((restaurant) => restaurant.name )
        setRestaurants(filteredData)
        // Logging any errors to the console
      }).catch(function (error) {
        console.error(error);
      });
  }, [])

  // Defining the animation effects using motion variants
  const cardVariant = {
    hidden: {opacity:0},
    visible: {opacity:1},
  }
  
  // Returning the JSX code to display the list of restaurants
  return (
    <div className="p-16 bg-blue-100">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {restaurants.map((restaurant, index) => (
        <motion.div 
          key={index} 
          className="restaurant bg-white p-4 rounded-lg shadow-lg"
          initial = "hidden"
          animate = "visible"
          variants = {cardVariant}
          transition = {{duration: 2.0}}
        >
          <h3 className="font-bold">{restaurant.name}</h3>
          <p>
          <span className="text-slate-500">Address:</span>
          <span className="float-right">{restaurant.address}</span>
        </p>
          <p>
          <span className="text-slate-500">Phone:</span> 
          <a href={`tel:${restaurant.phone}`} className=" float-right text-blue-400">{restaurant.phone}</a>
        </p>
          <p>
          <span className="text-slate-500">Rating:</span> 
          <span className="float-right">{restaurant.rating}</span>
        </p>
          <p> 
          <a href={`${restaurant.website}`} className="text-blue-400">Website</a>
        </p>  
        </motion.div>
      ))}
      </div>
    </div>
  )
}
   export default GetRestaurants
