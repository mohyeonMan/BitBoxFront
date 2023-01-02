import React, { useState } from 'react';
import HourList from "./HourList";

function Hours() {
    const [hours, setHours] = useState(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']);
    const [page, setPage] = useState(0);


    const handleClick = (hour) => {
        alert(`${hour}:00`);
    };

    return (
        <div className='hour-wrap'>

            <button className="previous" onClick={() => {
                if(!page<1)
                setPage(page - 1)
            }}>{'<'}</button>
            <div className='hour-wrap-2'>
            <HourList hours={hours.slice(page * 7, (page + 1) * 7)} onClick={handleClick} />
            </div>
            <button className="next" onClick={() => {
                if(page<3)
                setPage(page + 1)
            }}>{'>'}</button>
        </div>
    );
}
export default Hours;