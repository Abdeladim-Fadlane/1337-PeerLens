
const Google = () => {
    const token = JSON.parse(localStorage.getItem("google_token"));
    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: 'application/json'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("Data", JSON.stringify(data));
      localStorage.setItem("Type", JSON.stringify("google"));
      window.location.href = '/user';
    })
    .catch((err) => console.log(err));
  };

export default Google;