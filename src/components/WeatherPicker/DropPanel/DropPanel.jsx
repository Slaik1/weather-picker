import React from 'react';
import cl from './DropPanel.module.scss'
import WeatherService from "../../../api/WeatherService";
const DropPanel = ({limit, sortedObj, setUserCities, setCityWeatherArr, userCities, ...props}) => {

    const addCity = async (cityId) => {
        if (userCities.includes(cityId))
            return
        setUserCities((prev) => [...prev, cityId])
        const newCity = await WeatherService.getCityWeather(cityId)
        setCityWeatherArr((prev) => [...prev, newCity])
    }

    return (
        <div className={cl.form} {...props} >
            {
                Object.keys(sortedObj).slice(0, limit).map((item) =>
                    <div key={sortedObj[item].id} className={cl.item} onClick={() => addCity(sortedObj[item].id)}>
                        <p className={cl.text}>{sortedObj[item].name}</p>
                        <p>{sortedObj[item].country}</p>
                    </div>
                )
            }
        </div>
    );
};

export default DropPanel;