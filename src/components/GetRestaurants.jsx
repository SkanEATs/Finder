import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const GetRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(null);
  const coordinates = { lat: 42.9467, lon: -76.4294 };

  const loadRestaurants = () => {
    console.log('Button clicked');
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

    axios.request(options).then(function (response) {
      const filteredData = response.data.data.filter((restaurant) => restaurant.name);
      fetch(process.env.PUBLIC_URL + '/restaurants.json')
        .then(response => response.json())
        .then(data => {
          const mergedData = [...filteredData, ...data];
          setRestaurants(mergedData);
          setSelectedRestaurantIndex(Math.floor(Math.random() * mergedData.length));
        });
    }).catch(function (error) {
      console.error(error);
    });
  };

  const cardVariant = {
    hidden: {opacity:0},
    visible: {opacity:1},
  }

  return (
    <div className="p-16 bg-blue-100 flex flex-col items-center">
        <button
            href="#"
            className="p-3 px-6 pt-2 text-brightRed bg-white rounded-full shadow-2xl baseline hover:bg-mint hover:text-white mb-10"
            onClick={loadRestaurants}
        >
            I'm Feeling Hungry
        </button>
        {selectedRestaurantIndex !== null && (
          <motion.div 
            key={selectedRestaurantIndex} 
            className="restaurant bg-white p-4 rounded-lg shadow-lg border-2 border-red-500 mb-10 w-full"
            initial = "hidden"
            animate = "visible"
            variants = {cardVariant}
            transition = {{duration: 2.0}}
          >
            {/* Rendering selected restaurant data here */}
            <h3 className="font-bold">{restaurants[selectedRestaurantIndex].name}</h3>
            <p>
            <span className="text-slate-500">Address:</span>
            <span className="float-right">{restaurants[selectedRestaurantIndex].address}</span>
            </p>
            <p>
            <span className="text-slate-500">Phone:</span> 
            <a href={`tel:${restaurants[selectedRestaurantIndex].phone}`} className=" float-right text-blue-400">{restaurants[selectedRestaurantIndex].phone}</a>
            </p>
            <p>
            <span className="text-slate-500">Rating:</span> 
            <span className="float-right">{restaurants[selectedRestaurantIndex].rating}</span>
            </p>
            <p> 
            <a href={`${restaurants[selectedRestaurantIndex].website}`} className="text-blue-400">Website</a>
            </p> 
          </motion.div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {restaurants.map((restaurant, index) => (
            index !== selectedRestaurantIndex && (
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
            )
        ))}
        </div>
    </div>
  );
};

export default GetRestaurants;
