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
    <section className="main-section">
      <div className="calendar">
        <CalendarHeader value={value} setValue={setValue}/>
        <div className="the-body">
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
                        {calendarInfo
                        .filter((el) => el.date === day.format('').slice(0, 10))[0].status === 'bookable' ?
                        <div className="bookable">
                          Bookable
                        </div>
                        :
                          calendarInfo
                          .filter((el) => el.date === day.format('').slice(0, 10))[0].status === 'blocked' ?
                          <div className="blocked">
                            Blocked
                          </div>
                          :
                          <div className="Booked">
                            Booked
                          </div>
                        }
                      <div className="price">
                        &euro; {calendarInfo.filter((el) => el.date === day.format('').slice(0, 10))[0].price.toFixed(2)}
                      </div>
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
      <form className="booking-form">
        <div className="input-group">
          <label>Name:</label>
          <input type="text"/>
        </div>
        <div className="input-group">
          <label>From:</label>
          <input type="date"/>
        </div>
        <div className="input-group">
          <label>To:</label>
          <input type="date"/>
        </div>
        <div className="input-group">
          <button disabled={true} className="btn">Book!</button>
        </div>
      </form>
    </section>
  )
};

export default MainPage;
