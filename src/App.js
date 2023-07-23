import WeatherPicker from "./components/WeatherPicker/WeatherPicker";
import {useUser} from "./hooks/useUser";
import {useEffect, useState} from "react";
import WeatherService from "./api/WeatherService";
import './style/style.scss'

function App() {
    const pickedCities = useUser()
    const [weatherSubscriptionCity, setWeatherSubscriptionCity] = useState()

    useEffect(() => {
        const GetData = async () => {
            if (pickedCities.userCities !== null)
                setWeatherSubscriptionCity(await WeatherService.getAllCitiesWeather(pickedCities.userCities))
        }
        GetData()
    }, [])


    return (
        <div>
            <WeatherPicker pickedCities={pickedCities} cityWeatherArr={weatherSubscriptionCity}/>
        </div>
    );
}

export default App;
