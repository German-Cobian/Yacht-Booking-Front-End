import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getToken } from '../../redux/actions/auth';
import { cancelReservation } from '../../redux/actions/reservations';
import './reservations.css';

function SingleReservation({
  id, city, cost, startDate, daysNumber, yachtId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [yachtName, setYachtName] = useState('');
  const [yachtDescription, setYachtDescription] = useState('');
  const [yachtImage, setYachtImage] = useState('');

  function addDays(originalDate, days) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/v1/yachts/${yachtId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getToken(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setYachtName(data.name);
        setYachtDescription(data.description);
        setYachtImage(data.image_url);
      }
    })();
  }, []);

  const deleteReservation = () => {
    dispatch(cancelReservation(id));
    toast.success('Reservation canceled successfully');
    navigate('/');
  };

  return (
    <>
      <div className="border border-dark rounded my-3 mx-5">
        <div className="my-3 mx-5">
          <h1>{yachtName}</h1>
          <br />
          <span className="hint-star star">
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star" aria-hidden="true" />
            <i className="fa fa-star-o" aria-hidden="true" />
          </span>
          <div className="my-3">
            <img src={yachtImage} width="100" height="100" alt="yacht-img" />
          </div>
          <div>
            <p>{`" ${yachtDescription} "`}</p>
            <p>
              <strong>Price per day: $ </strong>
              {cost / daysNumber}
            </p>
            <p>
              <strong>From: </strong>
              {' '}
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(new Date(startDate))}
              {' '}
            </p>
            <p>
              <strong>To: </strong>
              {' '}
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).format(new Date(addDays(startDate, daysNumber)))}
            </p>
            <p>
              <strong>City: </strong>
              {' '}
              {city}
            </p>
          </div>
          <div>
            <button onClick={deleteReservation} type="button" className="btn-cancel">
              <span className="price">
                $
                {cost}
              </span>
              <span className="remove">
                <i className="fa fa-trash-o" aria-hidden="true" />
              </span>
              <span className="cancel">Cancel?</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

SingleReservation.propTypes = {
  id: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  daysNumber: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  yachtId: PropTypes.number.isRequired,
};

export default SingleReservation;
