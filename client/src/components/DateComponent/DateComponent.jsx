import "./DateComponent.css"
import {useState, useEffect} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateComponent = ({onChange}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [isPastTime, setIsPastTime] = useState(false);
    const currentDate = new Date();

    const timeConstraints = {
        hours: {
            min: currentDate.getHours(),
            max: 23,
            step: 1,
        },
        minutes: {
            min: currentDate.getMinutes(),
            max: 59,
            step: 15,
        },
    };

    const handleDateChange = date => {
        if (date < currentDate) {
            setIsPastTime(true);
            setSelectedDate(currentDate);
        } else {
            setIsPastTime(false);
            setSelectedDate(date);
            onChange(date);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (selectedDate) {
                const currentTime = new Date();
                const difference = selectedDate.getTime() - currentTime.getTime();
                setTimeRemaining(difference);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [selectedDate]);

    const formatTimeRemaining = (time) => {
        if (time < 0) {
            return 'Time has passed';
        }
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    };

    return (
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={currentDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
            />
            {/*<p>Remaining Time: {timeRemaining ? formatTimeRemaining(timeRemaining) : 'Select a date and time'}</p>*/}
            {isPastTime && <div className="error-message">Choose future time please</div>}
        </div>
    );
};

export default DateComponent;