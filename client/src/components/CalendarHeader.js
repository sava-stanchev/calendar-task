export const CalendarHeader = ({value, setValue}) => {
  const currMonthName = () => {
    return value.format('MMMM');
  }

  const currYear = () => {
    return value.format('YYYY');
  }

  const prevMonth = () => {
    return value.clone().subtract(1, 'month');
  }

  const nextMonth = () => {
    return value.clone().add(1, 'month');
  }

  return (
    <div className="header">
      <div className="previous" onClick={() => setValue(prevMonth())}>
        {String.fromCharCode(171)}
      </div>
      <div className="current">{currMonthName()} {currYear()}</div>
      <div className="next" onClick={() => setValue(nextMonth())}>
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}
