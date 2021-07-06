import {useState, useEffect} from 'react';
import moment from 'moment';
import {buildCalendar} from './Calendar';

const MainPage = () => {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));  
  }, [value])

  return(
    <div className="calendar">
      {calendar.map((week) => (
        <div>
          {week.map((day) => (
            <div className="day" onClick={() => setValue(day)}>
              <div className={value.isSame(day, 'day') ? 'selected' : ''}>
                {day.format("D").toString()}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

export default MainPage;
