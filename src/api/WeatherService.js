import axios from "axios";

const apiAppId = process.env.REACT_APP_OPENWEATHER_KEY

export default class WeatherService {

    static async getCityWeather(cityId) {
        return await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                id: cityId,
                APPID: apiAppId,
                units: 'metric'
            }
        })
    }

    static async getAllCitiesWeather(citiesArr) {
        const weatherArr = []

        for (const cityId of citiesArr) {
            const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                params: {
                    id: cityId,
                    APPID: apiAppId,
                    units: 'metric'
                }
            })

            weatherArr.push(res)
        }
        return weatherArr
    }
}