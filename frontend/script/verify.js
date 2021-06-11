let accessToken;

window.addEventListener('load', async() => {
  accessToken = sessionStorage.getItem('token');
  if (accessToken === null || hasExpired()) {
    updateStatus('Not logged in');
    window.location.href = '/staff/login.html';
  }
  document.getElementById("verify-button").addEventListener("click", verify);
})

async function verify() {
  const ticketCode = document.getElementById("ticket-code").value;
  const body = {
    code: ticketCode,
  }

  const myRequest = new Request('http://localhost:3000/tickets/verify', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  });

  try {
    const response = await fetch(myRequest);
    if (response.status === 404) {
      updateStatus('Invalid ticket!');
    }
    if (response.status === 401) {
      sessionStorage.setItem('token', null);
      updateStatus('Unauthorized request');
      window.location.href = '/staff/login.html';
      location.replace('/staff/login.html');
    } else if (response.status === 200) {
      const data = await response.json();
      updateStatus(`Verified ticket: ${data.code}!`)
    }

  } catch (e) {
    updateStatus('Error verifying')
  }

}

function updateStatus(text) {
  document.getElementById("status").innerHTML = text;
}

function hasExpired () {
  const jwt = parseJwt();
  const now = Math.floor(new Date().getTime() / 1000);
  return now > jwt.exp;
}

function parseJwt () {
  const base64Url = accessToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
