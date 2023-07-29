import React from 'react'
import cl from './WeatherPanel.module.scss'
// Задание: Сделать компонет svg принимающий в себя пропс src(название) без полного пути и расширения
import {ReactComponent as Wind} from "../../../assets/svg/wind.svg"
import {ReactComponent as Clouds} from "../../../assets/svg/cloud.svg"
import {ReactComponent as WaterDrop} from "../../../assets/svg/water-drop.svg";
import {ReactComponent as Equals} from "../../../assets/svg/equals.svg";
import {ReactComponent as Visibility} from "../../../assets/svg/visibility.svg";
import {ReactComponent as Pressure} from "../../../assets/svg/pressure.svg";
import {ReactComponent as Remove} from "../../../assets/svg/remove.svg"
import { WORLD_SIDES } from '../../../constants/constants';

const WeatherPanel = ({weatherObj, setUserCities, setCityWeatherArr, cityWeatherArr}) => {
    const status = weatherObj.weather[0].description

    const getWindDirection = (degrees) => {
        const index = Math.floor((degrees + 22.5) / 45) % 8
        
        return WORLD_SIDES[index]
    }

    const isDay = () => {
        const isAfterSunrise = weatherObj.sys.sunrise < weatherObj.dt
        const isBeforeSunset = weatherObj.dt < weatherObj.sys.sunset

        const isDay = isAfterSunrise && isBeforeSunset

        return isDay
    }

    const removePanel = (cityId) => {
        const filtredCityes = cityWeatherArr.filter((city) => city !== cityId)

        setUserCities(filtredCityes)


        setCityWeatherArr((prev) => prev.filter(obj => obj.data.id !== cityId))
    }

    const dayState = isDay() ? cl.day : cl.night

    const classes = [
        cl.form,
        dayState
    ]

    const imageSrc = require(`../../../assets/img/weatherState/${weatherObj.weather[0].icon}.png`)

    return (
        <div className={classes.join(' ')} title='Dick'>
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
                <div>
                    <Equals></Equals>
                    <p className={cl.indicator}>{Math.round(weatherObj.main.feels_like)}°</p>
                </div>
                <div>
                    <Clouds></Clouds>
                    <p className={cl.indicator}>{weatherObj.clouds.all}%</p>
                </div>
                <div>
                    <WaterDrop></WaterDrop>
                    <p className={cl.indicator}>{weatherObj.main.humidity}%</p>
                </div>
                <div>
                    <Wind></Wind>
                    <p className={cl.indicator}>{Math.round(weatherObj.wind.speed)} m/s {getWindDirection(weatherObj.wind.deg)}</p>
                </div>

                <div>
                    <Visibility></Visibility>
                    <p className={cl.indicator}>{Math.round(weatherObj.visibility / 100)}%</p>
                </div>
                <div>
                    <Pressure></Pressure>
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