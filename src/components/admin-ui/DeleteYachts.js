import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchYachts, deleteSingleYacht } from '../../redux/actions/yachtActions';
import './admin-ui.css';

const DeleteYachts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { yachts } = useSelector((state) => state.yacht);

  if (currentUser.role !== 'admin') {
    navigate('/');
  }

  useEffect(() => {
    dispatch(fetchYachts());
  }, []);

  return (
    <main className="">
      <div className="">
        <div className="d-flex flex-column mx-5">
          {yachts.map((yacht) => (
            <div key={yacht.id} className="d-flex flex-column align-items-center border border-light rounded my-3 mx-5">
              <div className="my-3">
                <img src={yacht.image_url} alt="journeyman-img" width="200" height="150" />
              </div>
              <div className="div-flex flex-column my-3 mx-5">
                <p className="">
                  <span className="font-weight-bold"><strong>Yacht Name: </strong></span>
                  {yacht.name}
                </p>
                <p className="">
                  <span className="font-weight-bold"><strong>Description: </strong></span>
                  {yacht.description}
                </p>
                <p className="">
                  <span className="font-weight-bold"><strong>Price per Day: </strong></span>
                  $
                  {yacht.price}
                </p>
                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-lg"
                    onClick={() => dispatch(deleteSingleYacht(yacht.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DeleteYachts;
