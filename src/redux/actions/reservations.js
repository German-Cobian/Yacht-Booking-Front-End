import { GET_MY_RESERVATIONS } from '../../constants';
import { getToken } from './auth';

const getReservations = () => async (dispatch) => {
  const response = await fetch('http://localhost:3001/v1/reservations', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  });
  if (response.ok) {
    const data = await response.json();
    const reservations = data.map((reservation) => reservation.attributes);
    dispatch({ type: GET_MY_RESERVATIONS, payload: reservations });
  } else {
    dispatch({ type: GET_MY_RESERVATIONS, payload: [] });
  }
};

export const cancelReservation = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/v1/reservations/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  });
  if (response.ok) {
    dispatch(getReservations());
  }
};

export default getReservations;
