let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.querySelector('#calendar');
const newEventModal = document.querySelector('#newEventModal');
const deleteEventModal = document.querySelector('#deleteEventModal');
const backdrop = document.querySelector('#modalBackDrop');
const eventTitleInput = document.querySelector('#eventTitleInput');
const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

function openModal(date) {
    clicked = date;
    const eventForDay = events.find(e => e.date === clicked);
    if (eventForDay) {
        document.querySelector("#eventText").innerText = eventForDay.title;
		deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block'
    }
	backdrop.style.display = 'block';
}

function load() {
	const date = new Date();

    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }

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

	document.querySelector('#monthDisplay').innerHTML = `${date.toLocaleDateString('en-uk', {
		month: 'long'
	})} ${year}`;
    calendar.innerHTML= '';

	for (let i = 1; i <= previousDays + daysInMonth; i++) {
		const daySquare = document.createElement('div');
		daySquare.classList.add('day');
		const dayString = `${i - previousDays}/${month + 1}/${year}`;

		if (i > previousDays) {
			daySquare.innerText = i - previousDays;
			const eventForDay = events.find(e => e.date === dayString);
			if(i - previousDays === day && nav === 0) {
				daySquare.id = 'currentDay';
			}
			if (eventForDay) {
				const eventDiv = document.createElement('div');
				eventDiv.classList.add('event');
				eventDiv.innerText = eventForDay.title;
				daySquare.appendChild(eventDiv);
			} 
			daySquare.addEventListener('click', () => openModal(dayString));
		} else {
			daySquare.classList.add('padding');
		}
		calendar.appendChild(daySquare);
	}
}

function closeModal() {
	eventTitleInput.classList.remove('error');
	newEventModal.style.display = 'none';
	deleteEventModal.style.display = 'none';
	backdrop.style.display = 'none';
	eventTitleInput.value = '';
	clicked = null;
	load();
}

function saveEvent() {
	if (eventTitleInput.value) {
		eventTitleInput.classList.remove('error');

		events.push({
			date: clicked,
			title: eventTitleInput.value
		});
		localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	} else {
		eventTitleInput.classList.add('error');
	}
}

function deleteEvent() {
	events = events.filter(e => e.date !== clicked);
	localStorage.setItem('events', JSON.stringify(events));
	closeModal();
}

function buttons() {
    document.querySelector('#nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    document.querySelector('#backButton').addEventListener('click', () => {
        nav--;
        load();
    });
	document.querySelector('#saveButton').addEventListener('click', saveEvent);
    document.querySelector('#cancelButton').addEventListener('click', closeModal);
	document.querySelector('#deleteButton').addEventListener('click', saveEvent);
}

load();
buttons();
