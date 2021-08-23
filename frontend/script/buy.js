let event;

window.addEventListener('load', async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  event = await loadEvent(id);
  renderEvent();
})

async function loadEvent(param) {
  const myRequest = new Request(`http://localhost:3000/events/getOne?id=${param}`, {
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
  let placeText = document.createTextNode('@ ' + event.place);
  place.appendChild(placeText);

  let price = document.createElement('div');
  price.classList.add('price')
  let priceText = document.createTextNode(event.price + ' sek');
  price.appendChild(priceText);

  let buyButton = document.createElement('button');
  buyButton.classList.add('button')
  buyButton.textContent = 'Beställ';
  buyButton.addEventListener("click", buy)

  section.appendChild(artist);
  section.appendChild(date);
  section.appendChild(place);
  section.appendChild(price);
  section.appendChild(buyButton);

  return section;
}


async function buy() {
  const ticketBody = {
    event: event.id
  }

  const body = JSON.stringify(ticketBody);

  const myRequest = new Request('http://localhost:3000/tickets/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  });

  try {
    const response = await fetch(myRequest);
    const data = await response.json();
    if (data.error) {
      console.log('Could not fetch location at given time, please try again');
    } else {
      window.location.href = `ticket.html?ticket=${data.code}`;
    }

  } catch (e) {
    console.log('error', e.message);
  }

}

