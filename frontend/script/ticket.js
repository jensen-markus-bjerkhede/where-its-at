let ticket;
let event;

window.addEventListener('load', async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('ticket');

  if (!code) {
    document.getElementById("errorMsg").innerHTML = 'Event code is mandatory query param';
  } else {
    ticket = await loadTicket(code);
    event = await loadEvent();
    renderEvent();
    JsBarcode("#barcode", ticket.code);
  }
})

async function loadEvent() {
  const myRequest = new Request(`http://localhost:3000/events/getOne?id=${ticket.event}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  });

  try {
    const response = await fetch(myRequest);
    const data = await response.json();
    if (data.error) {
      console.log('Could not fetch location at given time, please try again');
    } else {

      return data;
    }

  } catch (e) {
    console.log('error', e.message);
  }

}

async function loadTicket(param) {
  const ticketRequest = new Request(`http://localhost:3000/tickets/getOne?code=${param}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

  });

  try {
    const response = await fetch(ticketRequest);
    if (response.status === 200) {
      return await response.json();
    }

  } catch (e) {
    console.log('error', e.message);
  }

}

function renderEvent() {
  let section = document.getElementById('event');

  let artist = document.createElement('div');
  artist.classList.add('artist')
  let artistText = document.createTextNode(event.artist);
  artist.appendChild(artistText);

  let date = document.createElement('div');
  date.classList.add('date')
  let dateText = document.createTextNode(getMonthAndDate(event.date) + ' ' + getTime(event.date, event.duration));
  date.appendChild(dateText);

  let place = document.createElement('div');
  place.classList.add('place')
  let placeText = document.createTextNode(event.place);
  place.appendChild(placeText);

  section.appendChild(artist);
  section.appendChild(place);
  section.appendChild(date);

  return section;
}
