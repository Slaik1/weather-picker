import axios from "axios";

export default class WeatherService {

    static async getCityWeather(cityId) {
        return await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                id: cityId,
                APPID:'7c63e2d65a5de6fb99a27a67616d72e0',
                units: 'metric'
            }
        })
    }

    static async getAllCitiesWeather(citiesArr) {
        const weatherArr = []
        for (const cityId of citiesArr) {
            weatherArr.push(await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                params: {
                    id: cityId,
                    APPID:'7c63e2d65a5de6fb99a27a67616d72e0',
                    units: 'metric'
                }
            }))
        }
        return weatherArr
    }
}