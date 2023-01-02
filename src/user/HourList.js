import React from 'react';


function HourList(props) {
    const hours = props.hours;

    const handleClick = (hour) => {
        window.location.href=`#${hour}`
    };
    return (
        <div>
            {hours.map((hour) => (
                <button
                    className="hour-button"
                    key={hour}
                    onClick={() => {
                                    handleClick(hour)
                                    props.onClick(hour)
                                    }}

                >
                    {hour}
                </button>
            ))}
        </div>
    );
}
export default HourList;