import React from 'react';
import cl from './DropPanel.module.scss'
const DropPanel = ({limit, sortedObj, ...props}) => {

    const addCity = (obj) => {
        console.log(obj)
    }


    return (
        <div className={cl.form} {...props} >
            {
                Object.keys(sortedObj).slice(0, limit).map((item) =>
                    <div key={sortedObj[item].id} className={cl.item} onClick={() => addCity(sortedObj[item])}>
                        <p className={cl.text}>{sortedObj[item].name}</p>
                        <p>{sortedObj[item].country}</p>
                    </div>
                )
            }
        </div>
    );
};

export default DropPanel;