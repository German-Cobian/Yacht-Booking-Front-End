import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import style from './Yacht.module.css';
import { fetchYachts } from '../../redux/actions/yachtActions';

const YachtSwiper = React.lazy(() => import('./YachtSwiper'));
const Yacht = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchYachts());
  }, []);

  return (
    <main className={style.main}>
      <React.Suspense
        fallback={(
          <Spinner
            animation="grow"
            variant="primary"
            style={{
              width: '4rem',
              height: '4rem',
              position: 'absolute',
              top: '0',
              bottom: '0',
              right: '0',
              left: '0',
              margin: 'auto auto',
            }}
          />
      )}
      >
        <div className={style.main__header}>
          <h1>Your wish yachts</h1>
          <p>Please select a yacht</p>
          <hr />
        </div>
        <YachtSwiper />
      </React.Suspense>
    </main>
  );
};
export default Yacht;
