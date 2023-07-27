import React from 'react';
import cl from './DropPanel.module.scss'
import WeatherService from "../../../api/WeatherService";
const DropPanel = ({limit, sortedArr, setUserCities, setCityWeatherArr, userCities, ...props}) => {

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
                Object.keys(sortedArr).slice(0, limit).map((item) =>
                    <div key={sortedArr[item].id} className={cl.item} onClick={() => addCity(sortedArr[item].id)}>
                        <p className={cl.text}>{sortedArr[item].name}</p>
                        <p>{sortedArr[item].country}</p>
                    </div>
                )
            }
        </div>
    );
};

export default DropPanel;