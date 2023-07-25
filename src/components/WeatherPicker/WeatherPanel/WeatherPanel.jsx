import React from 'react'
import cl from './WeatherPanel.module.scss'
import {ReactComponent as Wind} from "../../../assets/svg/wind.svg"
import {ReactComponent as Clouds} from "../../../assets/svg/cloud.svg"
import {ReactComponent as WaterDrop} from "../../../assets/svg/water-drop.svg";
import {ReactComponent as Equals} from "../../../assets/svg/equals.svg";
import {ReactComponent as Visibility} from "../../../assets/svg/visibility.svg";
import {ReactComponent as Pressure} from "../../../assets/svg/pressure.svg";
import {ReactComponent as Remove} from "../../../assets/svg/remove.svg"

const WeatherPanel = ({weatherObj, userCities, setUserCities}) => {
    console.log(weatherObj)
    const status = weatherObj.weather[0].description

    const getWindDirection = (degrees) => {
        const worldSides = {
            0: 'N',
            1: 'N-E',
            2: 'E',
            3: 'S-E',
            4: 'S',
            5: 'S-W',
            6: 'W',
            7: 'N-W',
            8: 'N',
        }
        return worldSides[Math.floor((degrees + 22.5) / 45) % 8]
    }

    const isDay = () => {
        return (weatherObj.sys.sunrise < weatherObj.dt) &&
            (weatherObj.dt < weatherObj.sys.sunset)
    }

    const removePanel = (cityName) => {
        setUserCities((prev) => prev.filter((city) => city !== cityName))
    }

    return (
        <div className={`${cl.form} ${isDay() ? cl.day : cl.night}`}>
            <p className={cl.city} onClick={() => setUserCities((prev) => [...prev, 'Anapa'])}>{weatherObj.name} </p>
            <div className={cl.title__wrapper}>
                <div className={cl.img__wrapper}>
                    <img src={require(`../../../assets/img/weatherState/${weatherObj.weather[0].icon}.png`)} alt=""/>
                </div>
                <div className={cl.temperature__wrapper}>
                    <h2 className={cl.temperature}>{Math.round(weatherObj.main.temp)}°</h2>
                    <p className={cl.weather__about}>{status}</p>
                </div>
            </div>
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
            <div className={cl.remove} onClick={() => removePanel(weatherObj.name)}>
                <Remove/>
            </div>
        </div>
    );
};

export default WeatherPanel;