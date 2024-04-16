import React from "react";

/** Show limited information about a hotel
 */

function HotelCard({ name, description, }) {
  console.debug("HotelCard");

  return (
    <div className="card mb-2">
        <div className="card-body">
          <h4 className="card-title">
            {name}
          </h4>
          <p>{description}</p>
        </div>
    </div>
  );
}

export default HotelCard;
