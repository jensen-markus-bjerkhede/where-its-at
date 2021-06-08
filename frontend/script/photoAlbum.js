window.addEventListener('load', async () => {
    let events = await loadEvents();
    // console.log(events)
})

async function loadEvents() {
    const myRequest = new Request('http://localhost:3000/events/get', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        // This API will fail if others are using it at the same time
        const response = await fetch(myRequest);
        console.log(response);
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