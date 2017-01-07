function getTodayDate()
{
  var today = new Date();
  return {'day': today.getDate(), 'month': today.getMonth() + 1,
          'year': today.getFullYear()};
}

function getNextMonthDate(date)
{
  var next_month_date = {'day': date['day'], 'month': date['month'],
                          'year': date['year']};

  if (date['month'] === 12)
  {
    next_month_date['year'] = date['year'] + 1;
    next_month_date['month'] = 1;
  }
  else
  {
    next_month_date['month'] = date['month'] + 1;
  }
  return next_month_date;
}

function isLeapYear(year)
{
  return !((year % 4) || ((year % 100 === 0) && (year % 400)));
}

function daysInMonth(date)
{
  return (date['month'] === 2) ? (28 + isLeapYear(date['year'])) :
        (31 - (date['month'] - 1) % 7 % 2);
}

function formatDay(day)
{
  return (day >= 10) ? String(day) : (' ' + String(day));
}

function getMonthName(month_number)
{
  const MONTHS_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio',
                        'Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
  return MONTHS_NAMES[month_number-1];
}

/* Returns 0 - 6 --> Sunday: 0, Saturday: 6 */
function dayOfWeek(year,month,day)
{
  // Explanation: http://blog.hackerearth.com/2016/11/algorithm-on-how-to-find-the-day-of-week.html/
  var helper = [0,3,2,5,0,3,5,1,4,6,2,4];
  year -= (month < 3) ? 1 : 0;
  return (year + parseInt(year/4) - parseInt(year/100) + parseInt(year/400) +
            helper[month-1] + day) % 7;
}

function getCalendarMonth(date)
{
  // Console log header
  console.log('\n' + getMonthName(date['month']) + ' ' + date['year'] + '\n');
  console.log('DO LU MA MI JU VI SA');

  const DAYS_OF_WEEK = 7;
  var first_day_of_month = dayOfWeek(date['year'],date['month'],1);
  var day = 1 - first_day_of_month; // Account for blank spaces
  var calendar_ind = 0; // Index including blank spaces
  var last_day = daysInMonth(date);
  var week_str = '';

  while (true) {
    // Log every calendar week (including blank spaces in first week)
    if (calendar_ind % 7 === 0 && calendar_ind != 0)
    {
      console.log(week_str);
      week_str = '';
    }

    // Add day to week_str (including blank spaces in first week)
    week_str += (day < 1) ? '   ' : (formatDay(day) + ' ');

    if (day === last_day)
    {
      console.log(week_str);
      break;
    }

    calendar_ind++;
    day++;
  }
}
