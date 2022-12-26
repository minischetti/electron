import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';

export const Calendar = ({ files }) => {
    const [date, setDate] = useState(dayjs());
    const [options, setOptions] = useState({
        dayNameStyle: [['short', 'dd'], ['medium', 'ddd'], ['long', 'dddd']],
    });
    const generateDays = () => {
        return Array.from({ length: date.daysInMonth() }, (_, i) => {
            const day = date.startOf('month').add(i, 'day');
            console.log(day);
            return (
            <div key={i}>
                <div className="calendar__day   calendar__item">{i + 1}</div>
                <div className="calendar__notes">
                    {files.map((file) => {
                        // console.log(dayjs(file.stats.birthtime).isSame(_, 'day'));
                         
                        if (dayjs(file.stats.birthtime).isSame(day, 'day')) {
                            return (
                                <div key={file.id} className="calendar__note">
                                    {file.name}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            )
        });
    };
    const [days, setDays] = useState([]);


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

    useEffect(() => {
        setDays(generateDays);
    }, [date]);

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
                    {days}
                </div>
            </div>
        </div>
    );
};