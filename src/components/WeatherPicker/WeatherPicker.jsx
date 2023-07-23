import React from 'react';
import cl from './WeatherPicker.module.scss'
import Header from "./Header/Header";
const WeatherPicker = ({pickedCities, cityWeatherArr}) => {



    return (
        <div className={cl.form}>
            <Header/>
        </div>
    );
};

export default WeatherPicker;

// const change = async () => {
//     pickedCities.setUserCities((prev) => [...prev,'Anapa'])
//     console.log('asd')
//     // const a= await WeatherService.getCityWeather('Moscow')
//     // console.log(a)
//     console.log(pickedCities)
//     console.log(cityWeatherArr)
// }