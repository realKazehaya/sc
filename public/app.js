document.getElementById('loginBtn').addEventListener('click', function() {
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&response_type=code`;
});

function handleLoginResponse(code) {
    fetch(`/auth/instagram/callback?code=${code}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('userInfo').style.display = 'block';
            document.getElementById('username').innerText = data.username;
            document.getElementById('profilePic').src = data.profile_picture;
            document.getElementById('points').innerText = data.points;
        });
}

// Simula la llamada de `handleLoginResponse` para propósitos de demostración
// En la práctica, deberías recibir el código de autorización de Instagram
handleLoginResponse('YOUR_AUTHORIZATION_CODE');
