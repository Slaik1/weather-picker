import {useEffect, useState} from "react";

export const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState)

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value))
    }, [value, storageKey])

    return [value, setValue]
}

// if (userCities !== null && userCities.length != 0) {
//     sample = require('../cache/city.list.json')
//     const isLastValid =  sample.some((el => el.name === userCities.at(-1)))
//     if (!isLastValid) {
//         setUserCities(() => [...userCities].pop())
//     }
// }