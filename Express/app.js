import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios'; 
import qs from 'qs';
import session from 'express-session';
 

dotenv.config();
const app = express();
const port = 3001;
const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const clientSecret = process.env.CLIENT_SECRET;
const state = process.env.STATE;
let accessToken = '';
const baseUrl = 'https://api.intra.42.fr/v2/cursus_users';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client('906119856622-pa6lcpsgfe052p0r7nhm745577shjg6o.apps.googleusercontent.com');
const googleID = '906119856622-pa6lcpsgfe052p0r7nhm745577shjg6o.apps.googleusercontent.com';
app.use(express.json());

app.use(session({
  secret:  'secret',
  resave: false,
  saveUninitialized: true ,
  cookie: { secure: true }
}));

app.get('/auth/redirect', (req, res) => {
  const authorizeUrl = `https://api.intra.42.fr/oauth/authorize?${new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'public',
    state: state
  }).toString()}`;
  res.redirect(authorizeUrl);
});

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;
  if (state !== process.env.STATE) {
    res.status(403).send('Forbidden');
    return;
  }
  try {
    const tokenResponse = await axios.post('https://api.intra.42.fr/oauth/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    accessToken = tokenResponse.data.access_token;
    res.redirect('/auth/intra');
  } catch (error) {
    console.error('Error exchanging code for access token', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const response = await axios.get('https://api.intra.42.fr/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    res.json(response.data);
    console.log("---------------1--------------")
  } catch (error) {
    console.error('Failed to fetch users data');
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/cursus_users', async (req, res) => {
  console.log("---------------1--------------,",accessToken)
  try {
    const response = await axios.get('https://api.intra.42.fr/v2/campus/:21/users/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log(accessToken)
    res.json(response.data);

    res.status(200).send('OK');
  } catch (error) {
    console.error('Failed to fetch users data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/users', async (req, res) => {
  try {
    const query = req.query;
    const queryString = qs.stringify(query, { indices: true });
    const response = await axios.get(`${baseUrl}?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Failed to fetch users data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/auth/google', async (req, res) => {
  const { id_token } = req.body;
  
  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: googleID, 
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    res.status(200).json({ userId });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ success: false, error: 'Invalid ID token' });
  }
});

app.post('/api/github/', async (req, res) => {
  const { code } = req.body;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ status: false, error: tokenData.error });
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    res.json({ status: true, token: tokenData.access_token, user: userData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
