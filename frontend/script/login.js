window.addEventListener('load', async() => {
  document.getElementById('login-button').addEventListener('click', login);
  console.log(new Date('1995-12-17T15:24:00').getHours())
})

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const body = {
    email: email,
    password: password
  }

  const myRequest = new Request('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  try {
    const response = await fetch(myRequest);
    const data = await response.json();
    if (data.error) {
      updateStatus('Wrong username or password')
    } else {
      updateStatus('Success!')
      sessionStorage.setItem('token', data.access_token);
      window.location.href = 'verify.html';
    }

  } catch (e) {
    updateStatus('Wrong username or password')
  }

}

function updateStatus(text) {
  document.getElementById("status").innerHTML = text;
}
