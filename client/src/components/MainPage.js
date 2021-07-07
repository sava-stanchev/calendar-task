import {useState, useEffect} from 'react';
import moment from 'moment';
import {CalendarHeader} from './CalendarHeader';
import {BookingForm} from './BookingForm';
import {buildCalendar} from '../helpers/calendar-builder';
import {calendarData} from '../data/calendar-data';

const MainPage = () => {
  const [value, setValue] = useState(moment());
  const [calendar, setCalendar] = useState([]);
  const [calendarInfo, setCalendarInfo] = useState(calendarData);

  useEffect(() => {
    setCalendar(buildCalendar(value));  
  }, [value])

  return(
    <section className="main-section">
      <div className="calendar">
        <CalendarHeader value={value} setValue={setValue} />
        <div className="the-body">
          <div className="day-names">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, dayNameI) => (
              <div key={dayNameI} className="week"><b>{d}</b></div>
            ))}
          </div>
          {calendar.map((week, wi) => (
            <div key={wi}>
              {week.map((day, di) => (
                <div key={di} className="day">
                  {calendarInfo.some((el) => el.date === day.format('').slice(0, 10)) ? 
                    <div>
                      <b>{day.format('D').toString()}</b>
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
                          <div className="booked">
                            Booked
                          </div>
                        }
                      <div className="price">
                        &euro; {calendarInfo
                        .filter((el) => el.date === day.format('').slice(0, 10))[0].price.toFixed(2)}
                      </div>
                    </div>
                  :
                    <div className="no-data">
                      <b>{day.format('D').toString()}</b>
                    </div>
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <BookingForm calendarInfo={calendarInfo} setCalendarInfo={setCalendarInfo} />
    </section>
  )
};

export default MainPage;
