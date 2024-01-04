/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getToken } from '../../redux/actions/auth';
import './reservation-form.css';
import 'react-toastify/dist/ReactToastify.css';

const ReservationForm = () => {
  const [yachtImage, setYachtImage] = useState('');
  const [yachtName, setYachtName] = useState('');
  const [yachtDescription, setYachtDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/v1/yachts/${id}`, {
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
        setYachtImage(data.image_url);
        setYachtName(data.name);
        setYachtDescription(data.description);
      }
    })();
  }, []);

  const onFormSubmit = async (data) => {
    const response = await fetch('http://localhost:3001/v1/reservations', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify({
        reservation: {
          yacht_id: parseInt(id, 10),
          city: data.city,
          start_date: data.start_date,
          days_number: data.days_number.split(' ')[0],
        },
      }),
    });

    if (response.ok) {
      navigate('/reservations');
      toast.success('Reservation added successfully');
    } else {
      toast.error('Dates preceding today cannot be reserved.');
    }
  };

  return (
    <main className="">
      <div className="background" />
      <div className="showcase d-flex flex-column justify-content-center align-items-center ms-5">
        <div>
          <h2 className="head-form">BOOK A RESERVATION</h2>
        </div>
        <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <label htmlFor="username">
              Username
              <input className="form-control form-control-sm" type="username" value={currentUser.username} disabled />
            </label>
          </div>
          <div className="d-flex flex-row justify-content-around border border-light my-3">
            <div className="py-3 px-3">
              <img className="" src={yachtImage} width="100" height="100" alt="yacht-img" />
            </div>
            <div className="d-flex flex-column py-3 px-3">
              <label htmlFor="username">
                Yacht name:
                <input className="form-control form-control-sm" type="" value={yachtName} disabled />
              </label>
              <label htmlFor="username">
                Yacht description:
                <input className="form-control form-control-sm" type="" value={yachtDescription} disabled />
              </label>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between my-4">
            <div className="">
              <input
                type="date"
                name="Select a date"
                {...register('start_date', { required: 'Start_date is required' })}
              />
            </div>
            <div className="city-input">
              <select {...register('city', { required: 'Start_date is required' })}>
                <option selected="true" disabled="disabled" label="Port of departure?" />
                <option>Rotterdam</option>
                <option>Buenos Aires</option>
                <option>Los Angeles</option>
                <option>Alexandria</option>
                <option>Lisbon</option>
                <option>Shanghai</option>
              </select>
            </div>
            <div className="">
              <select {...register('days_number', { required: 'days_number is required' })}>
                <option selected="true" disabled="disabled" label="How many days?" />
                <option>1 day</option>
                <option>2 days</option>
                <option>3 days</option>
                <option>4 days</option>
                <option>5 days</option>
                <option>6 days</option>
                <option>7 days</option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-start gap-3 my-3 ">
            <input className="btn btn-outline-light" type="submit" value="Add Reservation" />
            <Link className="text-light mt-2" to="/reservations">
              Your Reservations
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
};

export default ReservationForm;
