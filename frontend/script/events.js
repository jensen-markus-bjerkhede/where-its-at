let events;

window.addEventListener('load', async() => {
  events = await loadEvents();
  renderEvents();
})

async function loadEvents() {
  const myRequest = new Request('http://localhost:3000/events/get', {
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

function renderEvents() {
  let pictureListSection = document.getElementById("eventList");
  events.forEach(event => pictureListSection.appendChild(createSection(event)));
}

function createSection(event) {
  let row = document.createElement('tr');

  let firstColumn = document.createElement('td');
  let dateText = document.createTextNode(getMonthAndDate(event.date));
  firstColumn.appendChild(dateText);

  let secondColumn = document.createElement('td');
  let eventText = document.createTextNode(event.artist);
  secondColumn.appendChild(eventText);

  let locationText = document.createTextNode(event.place);
  secondColumn.appendChild(locationText);

  let timeText = document.createTextNode(getTime(event.date, event.duration));
  secondColumn.appendChild(timeText);

  let priceText = document.createTextNode(event.price + ' sek');
  secondColumn.appendChild(priceText);

  row.appendChild(firstColumn);
  row.appendChild(secondColumn);

  row.addEventListener("click", order);
  return row;
}

function order(event) {
  const listItem = event.target.closest('tr');
  const eventElementList = Array.from( listItem.closest('table').children );
  window.location.href = `buy.html?id=${events[eventElementList.indexOf(listItem)].id}`;
}
