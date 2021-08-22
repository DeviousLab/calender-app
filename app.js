let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.querySelector('#calendar');
const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function load() {
    const date = new Date();
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDay = new Date(year, month, 1);
    const dateString = firstDay.toLocaleDateString('en-uk', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'long'
    });
    const previousDays = weekdays.indexOf(dateString.split(', ')[0]);
    
    for(let i = 1; i <= previousDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i > previousDays) {
            daySquare.innerText = i - previousDays;
            daySquare.addEventListener('click', (e) => {

            });
        } else {
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);
    }
}

load();