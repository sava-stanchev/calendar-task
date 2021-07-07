import {useEffect, useState} from "react";
import {range} from "../helpers/range-array";

const initialState = {
  name: '',
  from: '',
  to: '',
}

const nameVerificationError = {
  validName: false,
}

const fromDateVerificationError = {
  validFromDate: false,
}

const toDateVerificationError = {
  validToDate: false,
}

export const BookingForm = ({calendarInfo, setCalendarInfo}) => {
  const [newBooking, setNewBooking] = useState(initialState);
  const [nameError, setNameError] = useState(nameVerificationError);
  const [fromDateError, setFromDateError] = useState(fromDateVerificationError);
  const [toDateError, setToDateError] = useState(toDateVerificationError);

  useEffect(() => {}, [newBooking]);

  const createBooking = (name, value) => {
    setNewBooking({
      ...newBooking,
      [name]: value,
    });

    if (name === "name") {
      const validName = (/^(?=.{2,20}$)[a-z]+(?:['_.\s][a-z]+)*$/i).test(value);
      setNameError({...nameError, validName});
    }

    if (name === "from") {
      const checkDate = calendarInfo.filter((el) => el.date === value)[0];
      if (!checkDate) {
        return;
      }
      const validFromDate = checkDate.status === 'bookable';
      setFromDateError({...fromDateError, validFromDate});
    }

    if (name === "to") {
      const checkDate = calendarInfo.filter((el) => el.date === value)[0];
      if (!checkDate) {
        return;
      }
      const validToDate = checkDate.status === 'bookable';
      setToDateError({...toDateError, validToDate});
    }
  };

  const updateCalendarInfo = (e) => {
    e.preventDefault();
    const validFromDateIndex = calendarInfo.findIndex((el) => el.date === newBooking.from);
    const validToDateIndex = calendarInfo.findIndex((el) => el.date === newBooking.to);
    const inBetweenIndexes = range(validFromDateIndex, validToDateIndex);
    const newCalendarInfo = calendarInfo
    .map((el, i) => inBetweenIndexes.includes(i) ? el = {...el, status: 'booked'} : el);

    setCalendarInfo(newCalendarInfo);
  };

  return (
    <form className="booking-form">
      <div className="input-group" name="name" value={newBooking.name}
      onChange={e => createBooking('name', e.target.value)}>
        <label>Name:</label>
        <input type="text"/>
        <p className ="booking-warning" style={nameError.validName ? {color: 'white'} : {color: 'red'}}>
          * Valid name
        </p>
      </div>
      <div className="input-group" name="from" value={newBooking.from}
      onChange={e => createBooking('from', e.target.value)}>
        <label>From:</label>
        <input type="date"/>
        <p className ="booking-warning" style={fromDateError.validFromDate ? {color: 'white'} : {color: 'red'}}>
          * Valid "from" date
        </p>
      </div>
      <div className="input-group" name="to" value={newBooking.to}
      onChange={e => createBooking('to', e.target.value)}>
        <label>To:</label>
        <input type="date"/>
        <p className ="booking-warning" style={toDateError.validToDate ? {color: 'white'} : {color: 'red'}}>
          * Valid "to" date
        </p>
      </div>
      <div className="input-group">
        <button
        className="btn"
        disabled={nameError.validName && fromDateError.validFromDate && toDateError.validToDate ? false : true}
        onClick={(e) => updateCalendarInfo(e)}
        >Book!</button>
      </div>
    </form>
  );
}
