import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const GetRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [farms, setFarms] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(null);
  const [selectedFarmIndex, setSelectedFarmIndex] = useState(null);
  const [selectedShopsIndex, setSelectedShopsIndex] = useState(null);
  const coordinates = { lat: 42.9467, lon: -76.4294 };

  const loadRestaurants = () => {
    // Reset all selected indices and data arrays
    setSelectedRestaurantIndex(null);
    setSelectedFarmIndex(null);
    setSelectedShopsIndex(null);
    setRestaurants([]);
    setFarms([]);
    setShops([]);
    console.log('Restaurants loading');
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
  
          for (let i = mergedData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mergedData[i], mergedData[j]] = [mergedData[j], mergedData[i]];
          }
  
          setRestaurants(mergedData);
          setSelectedRestaurantIndex(Math.floor(Math.random() * mergedData.length));
        });
    }).catch(function (error) {
      console.error(error);
    });
  };
  
  const loadFarms = () => {
    // Reset all selected indices and data arrays
    setSelectedRestaurantIndex(null);
    setSelectedFarmIndex(null);
    setSelectedShopsIndex(null);
    setRestaurants([]);
    setFarms([]);
    setShops([]);
    console.log('Farms loading');
    fetch(process.env.PUBLIC_URL + '/farms.json')
      .then(response => response.json())
      .then(data => {
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
  
        setFarms(data);
        setSelectedFarmIndex(Math.floor(Math.random() * data.length));
      }).catch(function (error) {
        console.error(error);
      });
  };
  
  const loadShops = () => {
    // Reset all selected indices and data arrays
    setSelectedRestaurantIndex(null);
    setSelectedFarmIndex(null);
    setSelectedShopsIndex(null);
    setRestaurants([]);
    setFarms([]);
    setShops([]);
    console.log('Shops loading');
    fetch(process.env.PUBLIC_URL + '/shops.json')
      .then(response => response.json())
      .then(data => {
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
  
        setShops(data);
        setSelectedShopsIndex(Math.floor(Math.random() * data.length));
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
        <button
            href="#"
            className="p-3 px-6 pt-2 text-brightRed bg-white rounded-full shadow-2xl baseline hover:bg-mint hover:text-white mb-10"
            onClick={loadFarms}
        >
            I'm Feeling Farmy
        </button>
        <button
            href="#"
            className="p-3 px-6 pt-2 text-brightRed bg-white rounded-full shadow-2xl baseline hover:bg-mint hover:text-white mb-10"
            onClick={loadShops}
        >
            I'm Feeling Shoppy
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
        {selectedFarmIndex !== null && (
          <motion.div 
            key={selectedFarmIndex} 
            className="farm bg-white p-4 rounded-lg shadow-lg border-2 border-red-500 mb-10 w-full"
            initial = "hidden"
            animate = "visible"
            variants = {cardVariant}
            transition = {{duration: 2.0}}
          >
            <h3 className="font-bold">{farms[selectedFarmIndex].name}</h3>
            <p>
            <span className="text-slate-500">Address:</span>
            <span className="float-right">{farms[selectedFarmIndex].address}</span>
            </p>
            <p>
            <span className="text-slate-500">Phone:</span> 
            <a href={`tel:${farms[selectedFarmIndex].phone}`} className=" float-right text-blue-400">{farms[selectedFarmIndex].phone}</a>
            </p>
            <p>
            <span className="text-slate-500">Rating:</span> 
            <span className="float-right">{farms[selectedFarmIndex].rating}</span>
            </p>
            <p> 
            <a href={`${farms[selectedFarmIndex].website}`} className="text-blue-400">Website</a>
            </p> 
          </motion.div>
        )}
        {selectedShopsIndex !== null && (
          <motion.div 
            key={selectedShopsIndex} 
            className="shop bg-white p-4 rounded-lg shadow-lg border-2 border-red-500 mb-10 w-full"
            initial = "hidden"
            animate = "visible"
            variants = {cardVariant}
            transition = {{duration: 2.0}}
          >
            <h3 className="font-bold">{shops[selectedShopsIndex].name}</h3>
            <p>
            <span className="text-slate-500">Address:</span>
            <span className="float-right">{shops[selectedShopsIndex].address}</span>
            </p>
            <p>
            <span className="text-slate-500">Phone:</span> 
            <a href={`tel:${shops[selectedShopsIndex].phone}`} className=" float-right text-blue-400">{shops[selectedShopsIndex].phone}</a>
            </p>
            <p>
            <span className="text-slate-500">Rating:</span> 
            <span className="float-right">{shops[selectedShopsIndex].rating}</span>
            </p>
            <p> 
            <a href={`${shops[selectedShopsIndex].website}`} className="text-blue-400">Website</a>
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
        {farms.map((farm, index) => (
            index !== selectedFarmIndex && (
              <motion.div 
                key={index} 
                className="farm bg-white p-4 rounded-lg shadow-lg"
                initial = "hidden"
                animate = "visible"
                variants = {cardVariant}
                transition = {{duration: 2.0}}
              >
                <h3 className="font-bold">{farm.name}</h3>
                <p>
                <span className="text-slate-500">Address:</span>
                <span className="float-right">{farm.address}</span>
                </p>
                <p>
                <span className="text-slate-500">Phone:</span> 
                <a href={`tel:${farm.phone}`} className=" float-right text-blue-400">{farm.phone}</a>
                </p>
                <p>
                <span className="text-slate-500">Rating:</span> 
                <span className="float-right">{farm.rating}</span>
                </p>
                <p> 
                <a href={`${farm.website}`} className="text-blue-400">Website</a>
                </p> 
              </motion.div>
            )
        ))}
        {shops.map((shops, index) => (
            index !== selectedShopsIndex && (
              <motion.div 
                key={index} 
                className="shops bg-white p-4 rounded-lg shadow-lg"
                initial = "hidden"
                animate = "visible"
                variants = {cardVariant}
                transition = {{duration: 2.0}}
              >
                <h3 className="font-bold">{shops.name}</h3>
                <p>
                <span className="text-slate-500">Address:</span>
                <span className="float-right">{shops.address}</span>
                </p>
                <p>
                <span className="text-slate-500">Phone:</span> 
                <a href={`tel:${shops.phone}`} className=" float-right text-blue-400">{shops.phone}</a>
                </p>
                <p>
                <span className="text-slate-500">Rating:</span> 
                <span className="float-right">{shops.rating}</span>
                </p>
                <p> 
                <a href={`${shops.website}`} className="text-blue-400">Website</a>
                </p> 
              </motion.div>
            )
        ))}
        </div>
    </div>
  );
};

export default GetRestaurants;
