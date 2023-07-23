import {useEffect, useState} from "react";

export const useUser = () => {
    const [userCities, setUserCities] = useState(JSON.parse(localStorage.getItem('userCities')))

    useEffect(() => {
        if (userCities === null)
            setUserCities([])

        localStorage.setItem('userCities', JSON.stringify(userCities))
    }, [userCities])

    return {
        userCities: userCities,
        setUserCities: setUserCities
    }
}

// if (userCities !== null && userCities.length != 0) {
//     sample = require('../cache/city.list.json')
//     const isLastValid =  sample.some((el => el.name === userCities.at(-1)))
//     if (!isLastValid) {
//         setUserCities(() => [...userCities].pop())
//     }
// }