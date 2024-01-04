/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { signupUser } from '../../redux/actions/auth';
import './registeration-form.css';
import logo from '../../assets/Yacht-logo.svg';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signUpError, setSignUpError] = useState([]);

  const notifyError = (error) => toast.error(error, {
    position: 'top-right',
    autoClose: 15000,
    pauseOnHover: true,
    draggable: true,
  });

  const onFormSubmit = (data) => {
    if (data.password.length >= 6) {
      dispatch(signupUser(data)).then(navigate('/')).catch((err) => notifyError(err.error));
    } else {
      notifyError('Password must be at least 6 characters long');
    }
  };

  const isEmpty = Object.keys(errors).length === 0;

  const updateErrors = () => {
    const newErrors = [];
    handleSubmit(onFormSubmit);
    if (!isEmpty) {
      Object.entries(errors).forEach(([key, value]) => {
        newErrors.push([key, value.message]);
      });
      setSignUpError(newErrors);
    }
  };

  useEffect(() => {
    if (signUpError.length !== 0) {
      signUpError.forEach((error) => notifyError(error[1]));
    }
  }, [signUpError]);

  return (
    <div className=" background d-flex flex-md-col justify-content-around">
      <div className="logo"><img src={logo} alt="logo" /></div>
      <div className="border border-dark rounded bg-light my-5">
        <div className="my-5 mx-5">
          <h1 className="">Sign Up</h1>
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
          <div className="mb-3">
            <h6>Email</h6>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
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
            <Link className="login btn btn-outline-success py-0" to="/login">
              Log In
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
