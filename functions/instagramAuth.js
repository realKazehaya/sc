const axios = require('axios');

exports.handler = async (event, context) => {
    const code = event.queryStringParameters.code;

    try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', null, {
            params: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.REDIRECT_URI,
                code: code
            }
        });

        const accessToken = response.data.access_token;
        const userResponse = await axios.get(`https://graph.instagram.com/me?fields=id,username,profile_picture_url&access_token=${accessToken}`);

        return {
            statusCode: 200,
            body: JSON.stringify({
                username: userResponse.data.username,
                profile_picture: userResponse.data.profile_picture_url,
                points: 100 // Simulación de puntos, debes implementar la lógica real
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Error al autenticar con Instagram'
        };
    }
};
