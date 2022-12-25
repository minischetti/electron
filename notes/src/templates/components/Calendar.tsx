import dayjs from 'dayjs';
import React, { useState } from 'react';

export const Calendar = () => {
    const [date, setDate] = useState(dayjs());
    const [options, setOptions] = useState({
        dayNameStyle: [['short', 'dd'], ['medium', 'ddd'], ['long', 'dddd']],
    });

    const handlePrev = () => {
        setDate(date.subtract(1, 'month').startOf('month'));
    };

    const handleNext = () => {
        setDate(date.add(1, 'month').startOf('month'));
    };

    const handleToday = () => {
        setDate(dayjs());
    };

    const dateIsToday = () => {
        return date.isSame(dayjs(), 'day');
    };


    return (
        <div>
            <div className="calendar__header">
                <button type="button" onClick={handlePrev}>Prev</button>
                <button type="button" onClick={handleToday}>Today</button>
                <button type="button" onClick={handleNext}>Next</button>
            </div>
            <div className="calendar__title">
                <h3>{date.format('dddd')}</h3>
                <h2>{date.format('MMMM D YYYY')}</h2>
            </div>
            <div className="calendar__body">
                <div className="calendar__weekdays">
                    {Array.from({ length: 7 }, (_, i) => (
                        <div key={i} className="calendar__weekday calendar__item">{date.day(i).format('dd')}</div>
                    ))}
                </div>
                <div className="calendar__days">
                    {Array.from({ length: date.daysInMonth() }, (_, i) => (
                        <div key={i} className="calendar__day calendar__item">{i + 1}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};