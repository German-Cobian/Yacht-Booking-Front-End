import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import './admin-ui.css';
import { addYacht } from '../../redux/actions/yachtActions';

function AddYachts() {
  const { reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [yacht, setYacht] = useState({});
  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser.role !== 'admin') {
    navigate('/');
  }
  // const notifySuccess = () => toast('Yacht added successfully', {
  //   position: 'top-center',
  //   autoClose: 15000,
  //   pauseOnHover: true,
  //   draggable: true,
  // });
  // const notifyError = () => toast.error('Error! check error on the logs.', {
  //   position: 'top-right',
  //   autoClose: 15000,
  //   pauseOnHover: true,
  //   draggable: true,
  // });
  const handleChange = (e) => {
    e.preventDefault();
    setYacht({ ...yacht, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    const img = document.getElementById('image_url');
    data.append('image', img.files[0]);
    data.append('name', yacht.name);
    data.append('description', yacht.description);
    data.append('price', yacht.price);
    dispatch(addYacht(data));
    navigate('/delete');
    // notifySuccess();
    // notifyError();
    reset();
  };
  return (
    <main className="main">
      <div className="AddYachts__header">
        <h1>Add new yacht</h1>
        <p>Please provide the yacht information</p>
        <hr />
      </div>
      <div className="effect" />
      <div className="showcase">
        <Form onSubmit={handleSubmit} className="bg-light rounded-3 shadow p-4 bg-body">
          <Form.Group className="mb-3" controlId="formAddYacht">
            <Form.Label>Yacht Name</Form.Label>
            <Form.Control type="text" htmlFor="name" name="name" placeholder="Enter Yacht Name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddYacht">
            <Form.Label>Description</Form.Label>
            <Form.Control type="textarea" htmlFor="descripion" name="description" placeholder="Enter Yacht Description" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddYacht">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" htmlFor="price" name="price" placeholder="Enter Yacht Price" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddYacht">
            <input type="file" id="image_url" name="image_url" placeholder="Select Image" required />
          </Form.Group>
          <Button variant="primary" type="submit" className="addYacht__button">
            Add Yacht
          </Button>
        </Form>
        {/* <ToastContainer /> */}
      </div>
    </main>
  );
}
export default AddYachts;
