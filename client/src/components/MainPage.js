import {useState, useEffect} from 'react';
import moment from 'moment';
import {buildCalendar} from './Calendar';

const MainPage = () => {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));  
  }, [value])

  const currMonthName = () => {
    return value.format('MMMM');
  }

  const currYear = () => {
    return value.format('YYYY');
  }

  return(
    <div className="calendar">
      <div className="header">
        <div className="previous">{String.fromCharCode(171)}</div>
        <div className="current">{currMonthName()} {currYear()}</div>
        <div className="next">{String.fromCharCode(187)}</div>
      </div>
      <div className="body">
        {calendar.map((week) => (
          <div>
            {week.map((day) => (
              <div className="day" onClick={() => setValue(day)}>
                  {day.format("D").toString()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
};

export default MainPage;
