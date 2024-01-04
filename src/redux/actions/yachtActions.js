import axios from 'axios';
import {
  FETCH_YACHTS_SUCCESS, FETCH_SINGLE_YACHT_SUCCESS, DELETE_SINGLE_YACHTS_SUCCESS, ADD_YACHT_SUCCESS,
} from '../../constants';

const baseURL = 'http://localhost:3001';
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});
const fetchYachtsSuccess = (yachts) => ({
  type: FETCH_YACHTS_SUCCESS,
  payload: yachts,
});
export const fetchYachts = () => (dispatch) => {
  request.get(`${baseURL}/v1/yachts`).then((response) => {
    console.log(response.data);
    const yachts = response.data.map((yacht) => yacht.attributes);
    console.log(yachts);
    dispatch(fetchYachtsSuccess(yachts));
  });
};
const fetchSingleYachtSuccess = (yacht) => ({
  type: FETCH_SINGLE_YACHT_SUCCESS,
  payload: yacht,
});
export const fetchSingleYacht = (id) => (dispatch) => {
  request.get(`${baseURL}/v1/yachts/${id}`).then((response) => {
    const yacht = response.data;
    dispatch(fetchSingleYachtSuccess(yacht));
  });
};
export const addYachtSuccess = (yacht) => ({
  type: ADD_YACHT_SUCCESS,
  payload: yacht,
});
export const addYacht = (yacht) => (dispatch) => {
  request.post(`${baseURL}/v1/yachts`, yacht).then((response) => {
    dispatch(addYachtSuccess(response.data.attributes));
  });
};
const deleteSingleYachtSuccess = (yachts) => ({
  type: DELETE_SINGLE_YACHTS_SUCCESS,
  payload: yachts,
});
export const deleteSingleYacht = (id) => (dispatch) => {
  request.delete(`${baseURL}/v1/yachts/${id}`).then((response) => {
    const yachts = response.data.yachts.map((yacht) => yacht.attributes);
    dispatch(deleteSingleYachtSuccess(yachts));
  });
};
