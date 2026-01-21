// Islamic month names
const hijriMonths = [
  "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
  "Jumada al-Ula", "Jumada al-Akhirah", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

// Islamic holidays for the specified period - corrected to match actual Hijri calendar
const islamicHolidays = new Map([
  // Ramadan 1447 (Feb-Mar 2026)
  ['1/9/1447', 'First Day of Ramadan'],
  ['29/9/1447', 'Last Day of Ramadan'],
  // Shawwal 1447 (Mar-Apr 2026)
  ['1/10/1447', 'Eid ul Fitr'],
  ['2/10/1447', 'Eid al-Fitr Holiday'],
  ['3/10/1447', 'Eid al-Fitr Holiday'],
  // Dhu al-Qi'dah 1447 (Apr-May 2026)
  ['8/11/1447', 'Start of Hajj period'],
  // Dhu al-Hijjah 1447 (May-Jun 2026)
  ['9/12/1447', 'Arafat Day'],
  ['10/12/1447', 'Eid al-Adha'],
  ['11/12/1447', 'Eid al-Adha Holiday'],
  ['12/12/1447', 'Eid al-Adha Holiday'],
  // Muharram 1448 (Jun-Jul 2026)
  ['1/1/1448', 'Islamic New Year'],
  ['10/1/1448', 'Day of Ashura'],
  // Rabi' al-Awwal 1448 (Aug-Sep 2026)
  ['12/3/1448', 'Mawlid al-Nabi'],
]);

// Hijri to Gregorian conversion function calibrated to match the specific requirement
// where 1-Ramadan-1447 = February 19, 2026
function hijriToGregorian(hijriYear, hijriMonth, hijriDay) {
  // Known reference point: 1-Ramadan-1447 = February 19, 2026
  const referenceHijri = { year: 1447, month: 9, day: 1 }; // 9 = Ramadan
  const referenceGregorian = new Date(2026, 1, 19); // February 19, 2026 (month 1 = February)

  // Calculate difference in days from the reference point
  const hijriDayCount = getTotalHijriDays(hijriYear, hijriMonth, hijriDay);
  const referenceHijriDayCount = getTotalHijriDays(referenceHijri.year, referenceHijri.month, referenceHijri.day);

  const dayDifference = hijriDayCount - referenceHijriDayCount;

  // Create new date based on reference
  const resultDate = new Date(referenceGregorian);
  resultDate.setDate(resultDate.getDate() + dayDifference);

  return resultDate;
}

// Helper function to calculate total Hijri days since a fixed epoch
function getTotalHijriDays(year, month, day) {
  let totalDays = 0;

  // Calculate days contributed by full years (before current year)
  for (let y = 1; y < year; y++) {
    // Standard Hijri year has 354 days
    totalDays += 354;

    // Add leap day for leap years (11 leap years in a 30-year cycle)
    if ((y % 30) === 2 || (y % 30) === 5 || (y % 30) === 7 || (y % 30) === 10 ||
        (y % 30) === 13 || (y % 30) === 16 || (y % 30) === 18 || (y % 30) === 21 ||
        (y % 30) === 24 || (y % 30) === 26 || (y % 30) === 29) {
      totalDays += 1;
    }
  }

  // Calculate days contributed by full months in the current year
  for (let m = 1; m < month; m++) {
    // Hijri months alternate: odd months have 30 days, even months have 29 days
    if (m % 2 === 1) {
      totalDays += 30;
    } else {
      totalDays += 29;
    }
  }

  // Add the days in the current month
  totalDays += day;

  return totalDays;
}

// Helper function to get Gregorian date string
function getGregorianDateString(date) {
  return date.getDate().toString();
}

// Generate month data for the specified range
function generateMonthData() {
  const months = [];

  // Month configuration for Feb-Dec 2026
  const hijriMonthsOrder = [
    { month: 9, year: 1447, name: "Ramadan", greg: "Feb-Mar 2026" },
    { month: 10, year: 1447, name: "Shawwal", greg: "Mar-Apr 2026" },
    { month: 11, year: 1447, name: "Dhu al-Qi'dah", greg: "Apr-May 2026" },
    { month: 12, year: 1447, name: "Dhu al-Hijjah", greg: "May-Jun 2026" },
    { month: 1, year: 1448, name: "Muharram", greg: "Jun-Jul 2026" },
    { month: 2, year: 1448, name: "Safar", greg: "Jul-Aug 2026" },
    { month: 3, year: 1448, name: "Rabi' al-Awwal", greg: "Aug-Sep 2026" },
    { month: 4, year: 1448, name: "Rabi' al-Thani", greg: "Sep-Oct 2026" },
    { month: 5, year: 1448, name: "Jumada al-Ula", greg: "Oct-Nov 2026" },
    { month: 6, year: 1448, name: "Jumada al-Akhirah", greg: "Nov-Dec 2026" },
    { month: 7, year: 1448, name: "Rajab", greg: "Dec 2026 - Jan 2027" }
  ];

  for (let i = 0; i < hijriMonthsOrder.length; i++) {
    const monthInfo = hijriMonthsOrder[i];
    const currentHijriMonth = monthInfo.month;
    const currentHijriYear = monthInfo.year;
    const hijriMonthName = monthInfo.name;
    const gregorianMonths = monthInfo.greg;

    // Calculate number of days in this Hijri month (alternating 30 and 29)
    const daysInMonth = (currentHijriMonth % 2 === 1) ? 30 : 29;

    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const hijriDateStr = `${day}/${currentHijriMonth}/${currentHijriYear}`;
      const gregorianDate = hijriToGregorian(currentHijriYear, currentHijriMonth, day);

      // Check if this date is a holiday
      const isHoliday = islamicHolidays.has(hijriDateStr);
      const holidayName = isHoliday ? islamicHolidays.get(hijriDateStr) : undefined;

      days.push({
        hijriDate: day.toString(),
        gregorianDate: getGregorianDateString(gregorianDate),
        fullGregorianDate: gregorianDate,
        isHoliday,
        holidayName
      });
    }

    months.push({
      hijriMonth: hijriMonthName,
      hijriYear: currentHijriYear,
      gregorianMonths,
      days
    });
  }

  return months;
}

// Render calendar to the DOM
function renderCalendar() {
  const container = document.getElementById('calendar-container');
  if (!container) return;

  // Hide loading skeleton
  const skeleton = document.querySelector('.loading-skeleton');
  if (skeleton) {
    skeleton.classList.add('hidden');
  }

  const months = generateMonthData();

  months.forEach(month => {
    const monthCard = document.createElement('div');
    monthCard.className = 'month-card';

    // Create month header
    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';
    monthHeader.innerHTML = `
      <h2>${month.hijriMonth} ${month.hijriYear}</h2>
      <div class="gregorian">(${month.gregorianMonths})</div>
    `;

    // Create weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdaysDiv = document.createElement('div');
    weekdaysDiv.className = 'calendar-weekdays';
    weekdays.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.className = 'weekday';
      dayElement.textContent = day;
      weekdaysDiv.appendChild(dayElement);
    });

    // Create calendar days
    const daysGrid = document.createElement('div');
    daysGrid.className = 'calendar-days';

    // Get the first day of the month to calculate offset
    const firstDayOfWeek = month.days[0].fullGregorianDate.getDay();

    // Add empty cells for offset
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'date-cell empty';
      daysGrid.appendChild(emptyCell);
    }

    // Add day cells
    month.days.forEach(day => {
      const dayCell = document.createElement('div');
      dayCell.className = 'date-cell';

      if (day.isHoliday) {
        dayCell.classList.add('islamic-holiday');
        dayCell.title = day.holidayName || '';
      }

      // Add Hijri date (main, centered, prominent)
      const hijriEl = document.createElement('div');
      hijriEl.className = 'hijri-date';
      hijriEl.textContent = day.hijriDate;
      dayCell.appendChild(hijriEl);

      // Add Gregorian date (small, bottom-right corner)
      const gregEl = document.createElement('div');
      gregEl.className = 'gregorian-date';
      gregEl.textContent = day.gregorianDate;
      dayCell.appendChild(gregEl);

      daysGrid.appendChild(dayCell);
    });

    // Designer credit at the bottom of each month card
    const designerCredit = document.createElement('div');
    designerCredit.className = 'designer-credit';
    designerCredit.textContent = 'Designed By: Azmat Ali';

    monthCard.appendChild(monthHeader);
    monthCard.appendChild(weekdaysDiv);
    monthCard.appendChild(daysGrid);
    monthCard.appendChild(designerCredit);

    container.appendChild(monthCard);
  });
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  setTimeout(highlightCurrentDate, 100);
});

// Current date highlighting
function highlightCurrentDate() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed

  // Only highlight if we're in 2026 and between Feb and Dec
  if (currentYear === 2026 && currentMonth >= 1 && currentMonth <= 11) {
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();

    // Find all date cells and check if they match today
    const allDateCells = document.querySelectorAll('.date-cell:not(.empty)');
    allDateCells.forEach(cell => {
      const gregorianDateEl = cell.querySelector('.gregorian-date');
      if (gregorianDateEl) {
        const cellDay = parseInt(gregorianDateEl.textContent);
        // Additional logic would be needed to precisely match dates
        // For now, this is a simplified version
      }
    });
  }
}