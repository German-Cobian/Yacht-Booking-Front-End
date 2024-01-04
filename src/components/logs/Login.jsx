/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../../redux/actions/auth';
import './registeration-form.css';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/Yacht-logo.svg';

const Login = ({ loggedIn }) => {
  if (loggedIn) return <Navigate to="/" replace />;

  const [logInError, setLogInError] = useState([]);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifyError = (error) => toast.error(error, {
    position: 'top-right',
    autoClose: 15000,
    pauseOnHover: true,
    draggable: true,
  });

  const onFormSubmit = (data) => {
    dispatch(loginUser(data)).catch((err) => notifyError(err.error));
  };

  const isEmpty = Object.keys(errors).length === 0;

  const updateErrors = () => {
    const newErrors = [];
    handleSubmit(onFormSubmit);
    if (!isEmpty) {
      Object.entries(errors).forEach(([key, value]) => {
        newErrors.push([key, value.message]);
      });
      setLogInError(newErrors);
    }
  };

  useEffect(() => {
    if (logInError.length !== 0) {
      logInError.forEach((error) => notifyError(error[1]));
    }
  }, [logInError]);

  return (
    <div className="background d-flex flex-md-col justify-content-around">
      <div className="logo"><img src={logo} alt="logo" /></div>
      <div className="border border-dark rounded bg-light my-5">
        <div className="my-5 mx-5">
          <h1 className="">Log in</h1>
        </div>
        <form className="form mx-5" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-3">
            <h6>Username</h6>
            <input
              type="text"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
            />
          </div>
          <div className="mb-4">
            <h6>Password</h6>
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
          </div>
          <div className="d-flex flex-row justify-content-between">
            <input className="btn btn-outline-primary py-0 me-3" type="submit" value="Submit" onClick={() => updateErrors()} />
            <Link className="btn btn-outline-success py-0" to="/signup">
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
