import React from "react";
import { BusinessCardProps } from "../../utils/props";

const BusinessCard = ({
  name,
  image,
  address,
  description,
  phone,
  url,
}: BusinessCardProps) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={image} alt="Car cap" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted">{description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item fs-6">
          <i className="bi bi-telephone"></i> {phone}
        </li>
        <li className="list-group-item">
          <i className="bi bi-geo"></i> {address}
        </li>
      </ul>
      <div className="card-body">
        <a href={url}>
          <button type="button" className="btn btn-primary">
            Visit Website
          </button>
        </a>
      </div>
    </div>
  );
};

export default BusinessCard;
