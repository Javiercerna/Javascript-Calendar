
var date_shown = new Date(); // Initialize to today date
renderDate(date_shown);

/*****************************************************************************
****************************** HELPER FUNCTIONS ******************************
*****************************************************************************/

function fillCalendarWeeks(calendar_table,date)
{
  var today = new Date();

  var first_day_of_month = new Date(date.getFullYear(),date.getMonth(),1).getDay();
  var day = 1 - first_day_of_month; // Account for blank spaces
  var calendar_ind = 0; // Index including blank spaces
  var total_days = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
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

    // Add calendar-today if today date is reached
    if (today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() && today.getDate() === day)
    {
      calendar_day.classList.add('calendar-today');
    }
    calendar_week.appendChild(calendar_day);

    if (day === total_days)
    {
      calendar_table.appendChild(calendar_week);
      break;
    }

    calendar_ind++;
    day++;
  }
}

function renderDate(date)
{
  const WEEKDAYS = ['DO','LU','MA','MI','JU','VI','SA'];
  const MONTHS_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio',
                        'Agosto','Setiembre','Octubre','Noviembre','Diciembre'];

  // Empty table
  var calendar_table = document.querySelector('.calendar-content table');
  calendar_table.innerHTML = '';

  // Fill calendar header
  document.querySelector('.calendar-title').textContent =
    MONTHS_NAMES[date.getMonth()] + ' ' + date.getFullYear();

  // Fill calendar weekdays
  var calendar_weekdays = document.createElement('tr');
  calendar_weekdays.classList.add('calendar-weekdays');

  WEEKDAYS.forEach(function(day_name) {
    var calendar_day = document.createElement('th');
    calendar_day.textContent = day_name;
    calendar_weekdays.appendChild(calendar_day);
  });

  calendar_table.appendChild(calendar_weekdays);

  // Fill calendar weeks
  fillCalendarWeeks(calendar_table,date);
}

function updateDateShown(date_modifier)
{
  if (date_modifier === 'prev-month')
  {
    date_shown.setMonth(date_shown.getMonth() - 1);
  }
  else if (date_modifier === 'next-month')
  {
    date_shown.setMonth(date_shown.getMonth() + 1);
  }

  renderDate(date_shown);
}
