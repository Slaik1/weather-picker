import React, {useEffect, useState} from 'react';
import cl from './WeatherPicker.module.scss'
import Header from "./Header/Header";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import {useUser} from "../../hooks/useUser";
import WeatherService from "../../api/WeatherService";

const WeatherPicker = () => {

    const pickedCities = useUser({})
    const [cityWeatherArr, setCityWeatherArr] = useState([])

    useEffect(() => {
        const GetData = async () => {
            if (pickedCities.userCities !== null)
                setCityWeatherArr(await WeatherService.getAllCitiesWeather(pickedCities.userCities))
        }
        GetData()
    }, [])


    return (
        <div className={cl.form}>
            <Header/>
            <div className={cl.weatherWrapper}>
                {
                    cityWeatherArr !== undefined && cityWeatherArr.length !== 0
                        ?
                        cityWeatherArr.map(((obj) =>
                                <WeatherPanel key={obj.data.id} weatherObj={obj.data} pickedCities={pickedCities}/>
                        ))
                        :
                        ''
                }
            </div>
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