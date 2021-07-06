import {useState, useEffect} from 'react';
import moment from 'moment';
import {CalendarHeader} from './CalendarHeader';
import {buildCalendar} from '../helpers/calendar-builder';
import {calendarData} from '../data/calendar-data';

const MainPage = () => {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);
  const [calendarInfo, setCalendarInfo] = useState(calendarData);
  // console.log(calendarInfo);

  useEffect(() => {
    setCalendar(buildCalendar(value));  
  }, [value])

  return(
    <div className="calendar">
      <CalendarHeader value={value} setValue={setValue}/>
      <div className="body">
        <div className="day-names">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, dayNameI) => (
              <div key={dayNameI} className="week">{d}</div>
          ))}
        </div>
        {calendar.map((week, wi) => (
          <div key={wi}>
            {week.map((day, di) => (
              <div key={di} className="day">
                {calendarInfo.some((el) => el.date === day.format('').slice(0, 10)) ? 
                  <div>
                    {day.format('D').toString()}
                    <p>&euro; {calendarInfo.filter((el) => el.date === day.format('').slice(0, 10))[0].price}</p>
                  </div>
                :
                  <div className="no-data">
                    {day.format('D').toString()}
                  </div>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
};

export default MainPage;
