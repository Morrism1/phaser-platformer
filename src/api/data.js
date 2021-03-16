import axios from 'axios';

const gameID = '4exngDUI9ivmz2c86hbt';
const baseUrl = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;

const postUserScores = async (data) => {
  const req = await axios
    .post(baseUrl, data)
    .then((res) => res.data)
    .catch((err) => err);
  return req.result;
};

const getUserScores = async () => {
  const req = await axios
    .get(baseUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data.result)
    .catch((err) => err);
  return req;
};

const getData = async () => {
  const res = await getUserScores();
  return res.sort((a, b) => (a.score > b.score ? -1 : 1)).slice(0, 10);
};

const postData = async (userName, UserScore) => {
  const data = { user: userName, score: UserScore };
  const res = await postUserScores(data);
  return res;
};

export { getData, postData };
