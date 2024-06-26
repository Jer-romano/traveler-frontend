import React from "react";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import "./TripPreviewCard.css";

/** Show limited information about a trip, i.e. the title and the first image
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
                             alt={"The trip"}
                             className="card-img-top" />
        <div className="card-body">
           <h2 className="card-title">
           {title}
          </h2>
   
          <div className="mt-4">
            <Tag tag={tripImage.tag1}/>
            <Tag tag={tripImage.tag2}/>
            <Tag tag={tripImage.tag3}/>
            <Tag tag={tripImage.tag4}/>
            <Tag tag={tripImage.tag5}/>
          </div>
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

{/* <div className="TripPreviewCard">
<img src={tripImage.fileUrl} className="resp-img" />
<h2>{title}</h2>
</div> */}