
const WEEKDAYS = ['DO','LU','MA','MI','JU','VI','SA'];

var today = getTodayDate();

// Fill calendar header
var calendar_title = document.querySelector('.calendar-title');
calendar_title.textContent = getMonthName(today['month']) + ' ' + today['year'];

// Fill calendar weekdays
var calendar_table = document.querySelector('.calendar-content table');
var calendar_weekdays = document.createElement('tr');
calendar_weekdays.classList.add('calendar-weekdays');

WEEKDAYS.forEach(function(day_name) {
  var calendar_day = document.createElement('th');
  calendar_day.textContent = day_name;
  calendar_weekdays.appendChild(calendar_day);
});

calendar_table.appendChild(calendar_weekdays);

// Fill calendar weeks
fillCalendarWeeks(calendar_table,today);

/*****************************************************************************
****************************** HELPER FUNCTIONS ******************************
*****************************************************************************/

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

function fillCalendarWeeks(calendar_table,date)
{
  const DAYS_OF_WEEKS = 7;
  var today = getTodayDate();

  var first_day_of_month = dayOfWeek(date['year'],date['month'],1);
  var day = 1 - first_day_of_month; // Account for blank spaces
  var calendar_ind = 0; // Index including blank spaces
  var last_day = daysInMonth(date);
  var calendar_week = document.createElement('tr');
  calendar_week.classList.add('calendar-week');

  while (true)
  {
    // Add calendar week to table
    if (calendar_ind % 7 === 0 && calendar_ind != 0)
    {
      calendar_table.appendChild(calendar_week);
      calendar_week = document.createElement('tr');
      calendar_week.classList.add('calendar-week');
    }

    // Add day to calendar_week (including blank spaces in first week)
    var calendar_day = document.createElement('th');
    calendar_day.textContent = (day < 1) ? '' : day;

    // Handle calendar-today
    if (today['year'] === date['year'] && today['month'] === date['month']
          && today['day'] === day)
    {
      calendar_day.classList.add('calendar-today');
    }
    calendar_week.appendChild(calendar_day);

    if (day === last_day)
    {
      calendar_table.appendChild(calendar_week);
      break;
    }

    calendar_ind++;
    day++;
  }
}
