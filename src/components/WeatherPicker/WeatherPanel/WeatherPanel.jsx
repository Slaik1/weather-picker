import React from 'react'
import cl from './WeatherPanel.module.scss'
import { WORLD_SIDES } from '../../../constants/constants';
import {ReactComponent as Wind} from "../../../assets/svg/wind.svg"
import {ReactComponent as Clouds} from "../../../assets/svg/cloud.svg"
import {ReactComponent as WaterDrop} from "../../../assets/svg/water-drop.svg";
import {ReactComponent as Equals} from "../../../assets/svg/equals.svg";
import {ReactComponent as Visibility} from "../../../assets/svg/visibility.svg";
import {ReactComponent as Pressure} from "../../../assets/svg/pressure.svg";
import {ReactComponent as Remove} from "../../../assets/svg/remove.svg"


const WeatherPanel = ({weatherObj, setUserCities, setCityWeatherArr}) => {
    const status = weatherObj.weather[0].description

    const getWindDirection = (degrees) => {
        const index = Math.floor((degrees + 22.5) / 45) % 8
        
        return WORLD_SIDES[index]
    }

    const isDay = () => {
        const isAfterSunrise = weatherObj.sys.sunrise < weatherObj.dt
        const isBeforeSunset = weatherObj.dt < weatherObj.sys.sunset

        return isAfterSunrise && isBeforeSunset
    }

    const removePanel = (cityId) => {
        setUserCities((prev) => prev.filter((city) => city !== cityId))

        setCityWeatherArr((prev) => prev.filter(obj => obj.data.id !== cityId))
    }

    const dayState = isDay() ? cl.day : cl.night

    const imageSrc = require(`../../../assets/img/weatherState/${weatherObj.weather[0].icon}.png`)

    return (
        <div className={`${cl.form} ${dayState}`}>
            <p className={cl.city}>{weatherObj.name} </p>
            <div className={cl.title__wrapper}>
                <div className={cl.img__wrapper}>
                    <img src={imageSrc} alt=""/>
                </div>
                <div className={cl.temperature__wrapper}>
                    <h2 className={cl.temperature}>{Math.round(weatherObj.main.temp)}°</h2>
                    <p className={cl.weather__about}>{status}</p>
                </div>
            </div>
            {/* Я бы вынес статистику в отдельный компонент */}
            <div className={cl.stat}>
                <div title='Feels like'>
                    <Equals/>
                    <p className={cl.indicator}>{Math.round(weatherObj.main.feels_like)}°</p>
                </div>
                <div title='Clouds'>
                    <Clouds/>
                    <p className={cl.indicator}>{weatherObj.clouds.all}%</p>
                </div>
                <div title='Humidity'>
                    <WaterDrop/>
                    <p className={cl.indicator}>{weatherObj.main.humidity}%</p>
                </div>
                <div title='Wind'>
                    <Wind/>
                    <p className={cl.indicator}>{Math.round(weatherObj.wind.speed)} m/s {getWindDirection(weatherObj.wind.deg)}</p>
                </div>
                <div title='Visibility'>
                    <Visibility/>
                    <p className={cl.indicator}>{Math.round(weatherObj.visibility / 100)}%</p>
                </div>
                <div title='Pressure'>
                    <Pressure/>
                    <p className={cl.indicator}>{weatherObj.main.pressure} Pa</p>
                </div>
            </div>
            <div className={cl.remove} onClick={() => removePanel(weatherObj.id)}>
                <Remove/>
            </div>
        </div>
    );
};

export default WeatherPanel;