import {useState, useEffect} from 'react';
import moment from 'moment';
import {CalendarHeader} from './CalendarHeader';
import {buildCalendar} from '../helpers/calendar-builder';

const MainPage = () => {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));  
  }, [value])

  return(
    <div className="calendar">
      <CalendarHeader value={value} setValue={setValue}/>
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
