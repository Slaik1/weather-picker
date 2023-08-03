import React, { useEffect, useState} from 'react';
import cl from './WeatherPicker.module.scss'
import Header from "./Header/Header";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import WeatherService from "../../api/WeatherService";

const WeatherPicker = () => {
    const [userCities, setUserCities] = useLocalStorage('userCities', [])
    const [cityWeatherArr, setCityWeatherArr] = useState([])

    const GetData = async () => {
        if (!userCities) return
        const res = await WeatherService.getAllCitiesWeather(userCities)
        
        setCityWeatherArr(res)
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <div className={cl.form}>
            <Header userCities={userCities} setUserCities={setUserCities} setCityWeatherArr={setCityWeatherArr}/>
            <div className={cl.weatherWrapper}>
                {
                    cityWeatherArr && cityWeatherArr.length
                        ?
                        cityWeatherArr.map(((obj) =>
                                <WeatherPanel 
                                    key={obj.data.id} 
                                    weatherObj={obj.data} 
                                    setUserCities={setUserCities}
                                    setCityWeatherArr={setCityWeatherArr}
                                />
                        ))
                        :
                        null
                }
            </div>
        </div>
    );
};

export default WeatherPicker;