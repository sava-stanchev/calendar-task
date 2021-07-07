import {useEffect, useState} from "react";
import {range} from "../helpers/range-array";
import {AlertModal} from "./AlertModal";

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
  const [alertMsg, setAlertMsg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

    if (!fromDateError.validFromDate || !toDateError.validToDate) {
      setAlertMsg('You have chosen unavailable dates!');
      setIsOpen(true);
    } else {
      if (newBooking.from > newBooking.to && newBooking.to < newBooking.from) {
        setAlertMsg('Invalid booking period!');
        setIsOpen(true);
      } else {
        const validFromDateIndex = calendarInfo.findIndex((el) => el.date === newBooking.from);
        const validToDateIndex = calendarInfo.findIndex((el) => el.date === newBooking.to);
        const inBetweenIndexes = range(validFromDateIndex, validToDateIndex);
        const checkInterval = calendarInfo.some((el, i) => inBetweenIndexes.includes(i) && el.status === 'booked');
        if (checkInterval) {
          setAlertMsg('Unavailable booking period!');
          setIsOpen(true); 
        } else {
          const newCalendarInfo = calendarInfo
          .map((el, i) => inBetweenIndexes.includes(i) ? el = {...el, status: 'booked'} : el);
      
          setCalendarInfo(newCalendarInfo);
        }
      }
    }
  };

  return (
    <form className="booking-form">
      <AlertModal open={isOpen} onClose={() => setIsOpen(false)} alertMsg={alertMsg} />
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
      </div>
      <div className="input-group" name="to" value={newBooking.to}
      onChange={e => createBooking('to', e.target.value)}>
        <label>To:</label>
        <input type="date"/>
      </div>
      <div className="input-group">
        <button
        className="btn"
        onClick={(e) => updateCalendarInfo(e)}
        >Book!</button>
      </div>
    </form>
  );
}
