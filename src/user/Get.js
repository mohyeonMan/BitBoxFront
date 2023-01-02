import React from 'react';
import {useParams} from "react-router-dom";

const Get = () => {
    const { selectedDate, movieName,cityName ,cinemaName ,time,theater,pk} = useParams();
    return (
        <div>
            정보가져가셈<br/><br/>
            {selectedDate}<br/>
            {movieName}<br/>
            {cityName}<br/>
            {cinemaName}<br/>
            {time}<br/>
            {theater}<br/>
            {pk}
        </div>
    );
};

export default Get;