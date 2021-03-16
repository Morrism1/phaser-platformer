import axios from 'axios';
import { postData, getData } from '../src/api/data';

jest.mock('axios');

test('should post the data of the user', async () => {
  const data = { data: { result: 'LeaderBoard created!' } };
  axios.post.mockResolvedValue(data);
  const res = await postData('morris', 100);
  expect(res).toEqual('LeaderBoard created!');
});

test('should throw an error message when no arguments are passed', async () => {
  const data = { data: { result: 'Provided  valid arguments' } };
  axios.post.mockResolvedValue(data);
  const res = await postData();
  expect(res).toEqual('Provided  valid arguments');
});

test('should fetch the results of the leaderboard', async () => {
  const data = {
    data: {
      result: [
        { user: 'Morris', score: 123 },
        { user: 'Ghosh', score: 234 },
      ],
    },
  };

  axios.get.mockResolvedValue(data);
  const res = await getData();
  expect(res).toBeInstanceOf(Array);
});

test('Get the lenght of the results from fetched data', async () => {
  const data = {
    data: {
      result: [
        { user: 'Morris', score: 123 },
        { user: 'Ghosh', score: 234 },
      ],
    },
  };

  axios.get.mockResolvedValue(data);
  const res = await getData();
  expect(res.length).toEqual(2);
});
