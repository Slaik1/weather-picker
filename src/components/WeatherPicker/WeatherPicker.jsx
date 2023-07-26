import React, {useEffect, useState} from 'react';
import cl from './WeatherPicker.module.scss'
import Header from "./Header/Header";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import WeatherService from "../../api/WeatherService";

const WeatherPicker = () => {

    const [userCities, setUserCities] = useLocalStorage('userCities',[])
    const [cityWeatherArr, setCityWeatherArr] = useState([])

    useEffect(() => {
        const GetData = async () => {
            if (userCities !== null)
                setCityWeatherArr(await WeatherService.getAllCitiesWeather(userCities))
        }
        GetData()
    }, [])

    return (
        <div className={cl.form}>
            <Header userCities={userCities} setUserCities={setUserCities} setCityWeatherArr={setCityWeatherArr}/>
            <div className={cl.weatherWrapper}>
                {
                    cityWeatherArr !== undefined && cityWeatherArr.length !== 0
                        ?
                        cityWeatherArr.map(((obj) =>
                                <WeatherPanel key={obj.data.id} weatherObj={obj.data} setUserCities={setUserCities} setCityWeatherArr={setCityWeatherArr} cityWeatherArr={cityWeatherArr}/>
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

// onClick={() => setUserCities((prev) => [...prev,'Moscow'])}