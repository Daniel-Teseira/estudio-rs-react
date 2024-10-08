import React from 'react';
import './Card.css';

const Card = ({ description, title, picture }) => {
  return (
    <div className="card11 text-white" data-aos-duration='700' data-aos='fade-up'>
      <div className="card-body bg-black card22 py-5">
        <img src={picture} className="card-img-top img-card" alt={title} />
        <h5 className="card-title p-3 text-center">{title}</h5>
        <p className="card-text px-5">{description}</p>
      </div>
    </div>
  );
};

export default Card;
