/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ToastContainer } from 'react-toastify';
import getReservations from '../../redux/actions/reservations';
import SingleReservation from './SingleReservation';

const Reservations = () => {
  const dispatch = useDispatch();
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  window.addEventListener('resize', () => {
    setWidthScreen(window.innerWidth);
  });

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations);

  if (reservations.length === 0) {
    return (
      <main className="main">
        <div className="cards">
          <div className="alert alert-danger" role="alert">
            No reservation found, you can add a reservation from the
            {' '}
            <Link to="/" class="alert-link">
              Home page
            </Link>
            {' '}
            by opening a specific yacht page
          </div>
        </div>
        <ToastContainer />
      </main>
    );
  }

  return (
    <main className="">
      <Swiper
        slidesPerView={widthScreen > 799 ? 2 : 1}
        spaceBetween={30}
        slidesPerGroup={widthScreen > 799 ? 2 : 1}
        loop
        loopFillGroupWithBlank
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        className="swiper"
      >
        <div className="d-flex flex-row">
          {reservations.map((reservation, id) => (
            <SwiperSlide id={reservation.id}>
              <SingleReservation
                key={id}
                id={reservation.id}
                yachtId={reservation.yacht_id}
                city={reservation.city}
                startDate={reservation.start_date}
                daysNumber={reservation.days_number}
                cost={reservation.cost}
              />
              ;
            </SwiperSlide>
          ))}
        </div>
        <ToastContainer />
      </Swiper>
    </main>
  );
};

export default Reservations;
