import React, {useEffect, useState} from 'react';
import cl from './Header.module.scss'
import DropPanel from "../DropPanel/DropPanel";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {compareByNameSimilarity} from "../../../utils/sort";
import {useDebounce} from "../../../hooks/useDebounce";

const Header = ({userCities, setUserCities, setCityWeatherArr}) => {
    const [panelRef, isPanelActive, setIsPanelActive] = useOutsideClick(false)
    const [citiesArr, setCitiesArr] = useState([])
    const [citiesSortedArr, setCitiesSortedArr] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        setCitiesArr(require('../../../cache/city.list.json'))
    }, [])

    const sortByName = () => {
        if (inputValue && isPanelActive) {
            setCitiesSortedArr(citiesArr.slice(0).sort((a, b) => compareByNameSimilarity(a, b, inputValue, 'name')))
            return
        }
        setCitiesSortedArr([])
    }

    useDebounce(sortByName, 1000, inputValue)

    return (
        <div className={cl.header}>
            <p className={cl.tile}>weather picker</p>
            <input className={cl.input} type="text" placeholder='Add...'
                   value={inputValue} ref={panelRef}
                   onClick={() => setIsPanelActive(true)}
                   onChange={e => {
                       setInputValue(e.target.value)
                   }}/>
            {
                isPanelActive &&
                <DropPanel 
                    style={{position: 'absolute', top: 55, right: 0, width: '270px'}}
                    limit={10} 
                    sortedArr={citiesSortedArr} 
                    setUserCities={setUserCities}
                    setCityWeatherArr={setCityWeatherArr} 
                    userCities={userCities}
                />
            }
        </div>
    );
};

export default Header;