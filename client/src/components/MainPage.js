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
        <div className="day-names">
          {['s', 'm', 't', 'w', 't', 'f', 's'].map((d, dni) => (
              <div key={dni} className="week">{d}</div>
          ))}
        </div>
        {calendar.map((week, wi) => (
          <div key={wi}>
            {week.map((day, di) => (
              <div key={di} className="day" onClick={() => setValue(day)}>
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
