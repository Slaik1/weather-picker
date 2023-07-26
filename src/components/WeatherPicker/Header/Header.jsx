import React, {useEffect, useMemo, useState} from 'react';
import cl from './Header.module.scss'
import DropPanel from "../DropPanel/DropPanel";
import useOutsideClick from "../../../hooks/useOutsideClick";
import {compareByNameSimilarity} from "../../../utils/sort";
import {useDebounce} from "../../../hooks/useDebounce";

const Header = ({userCities, setUserCities, setCityWeatherArr}) => {

    const [panelRef, isPanelActive, setIsPanelActive] = useOutsideClick(false)
    const [citiesObj, setCitiesObj] = useState({})
    const [citiesSortedObj, setCitiesSortedObj] = useState({})
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        setCitiesObj(require('../../../cache/city.list.json'))
    }, [])

    const sortByName = () => {
        if (inputValue && isPanelActive) {
            setCitiesSortedObj(citiesObj.sort((a, b) => compareByNameSimilarity(a, b, inputValue, 'name')))
            return
        }
        setCitiesSortedObj({})
    }

    useDebounce(sortByName, 250, inputValue)

    return (
        <div className={cl.header}>
            <p className={cl.tile}>weather picker</p>
            <input className={cl.input} type="text" placeholder='Добавить...' value={inputValue} ref={panelRef}
                   onClick={() => setIsPanelActive(true)}
                   onChange={e => {setInputValue(e.target.value)}}/>
            {
                isPanelActive &&
                <DropPanel style={{position: 'absolute', top: 55, right: 0, width: '270px'}}
                           limit={5} sortedObj={citiesSortedObj} setUserCities={setUserCities} setCityWeatherArr={setCityWeatherArr} userCities={userCities}/>
            }
        </div>
    );
};

export default Header;