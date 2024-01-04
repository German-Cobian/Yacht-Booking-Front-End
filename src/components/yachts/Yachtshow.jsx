import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './yachtshow.css';
import { Link, useParams } from 'react-router-dom';
import { ListGroup, Button, Card } from 'react-bootstrap';

const Yachtshow = () => {
  const params = useParams();
  const id = params.yacht_id;
  const [yacht, setYacht] = useState({});

  useEffect(() => {
    const request = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });
    request.get(`http://localhost:3001/v1/yachts/${id}`).then((response) => {
      setYacht(response.data);
    });
  }, []);

  return (
    <div className="yacht-card">
      <div className="img-wrap">
        <img className="single-yacht" src={yacht.image_url} alt="single-yacht" />
      </div>
      <div className="card-button">
        <Card className="text-box">
          <Card.Header>
            <span className="name">{yacht.name}</span>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <span>Description: </span>
              {yacht.description}
            </ListGroup.Item>
            <ListGroup.Item>
              <span>Price: </span>
              $
              {yacht.price}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Link to={`/reserve/${yacht.id}`} id={yacht.id}>
          <Button className="show-button" type="button">
            {' '}
            Reserve
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Yachtshow;
