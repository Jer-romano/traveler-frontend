import React from "react";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import "./TripPreviewCard.css";

/** Show limited information about a trip
 *
 * Is rendered by TripList to show a "card" for each trip.
 *
 * TripList -> TripPreviewCard
 */

function TripPreviewCard({id, title, tripImage, username }) {
  console.debug("TripPreviewCard", id);

  return (
      <Link className="TripPreviewCard card" to={`/trips/${id}`}>
        <img src={tripImage.fileUrl}
                             alt={"A picture of the trip"}
                             className="card-img-top" />
        <div className="card-body">
           <h2 className="card-title">
           {title}
          </h2>
   
          <span className="mt-4">
            <Tag tag={tripImage.tag1}/>
            <Tag tag={tripImage.tag2}/>
            <Tag tag={tripImage.tag3}/>
          </span>
          <h4 className="mt-4">
            {/* {profileImage && <img src={profileImage}
                             alt={"A picture of the user"}
                             className="float-left ml-5" />} */}
            {username && `Posted by ${username}`}
          </h4>
        </div>
      </Link>
  );
}

export default TripPreviewCard;
