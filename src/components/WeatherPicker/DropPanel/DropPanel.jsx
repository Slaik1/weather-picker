import React from 'react';
import cl from './DropPanel.module.scss'
import WeatherService from "../../../api/WeatherService";

const DropPanel = (props) => {
    const {
        limit,
        sortedArr,
        setUserCities,
        setCityWeatherArr,
        userCities
    } = props

    const addCity = async (cityId) => {
        if (userCities.includes(cityId)) return

        setUserCities((prev) => [...prev, cityId])

        const newCity = await WeatherService.getCityWeather(cityId)
        
        setCityWeatherArr((prev) => [...prev, newCity])
    }

    return (
        <div className={cl.form} {...props} >
            {
                Object.keys(sortedArr)
                    .slice(0, limit)
                    .map((item) => {
                        const el = sortedArr[item]

                        const {
                            id,
                            name,
                            country
                        } = el

                        return (
                            <div 
                                key={id} 
                                className={cl.item} 
                                onClick={() => addCity(id)}
                            >
                                <p className={cl.text}>{name}</p>
                                <p>{country}</p>
                            </div>
                        )
                    }
                )
            }
        </div>
    );
};

export default DropPanel;