import React, { useState, useEffect, useContext } from "react";
import TravelerApi from "../api/api";
import TripPreviewCard from "./TripPreviewCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import "./TripList.css";

/** Show page with list of trips.
 *
 * On mount, loads trips from API.
 * If includeUser is true, the TripPreviewCard is passed
 * the username and profile image props
 * This is routed to at /trips
 * 
 * trips should equal [{id, userId, username, title, image }]
 *
 * Route -> { TripPreviewCard }
 */

function TripList({ includeUser, userId }) {
  console.debug("TripList");

  const { currentUser } = useContext(UserContext);

  const [trips, setTrips] = useState(null);
  const sampleImage = {fileUrl: "https://traveler-capstone-images.s3.us-east-2.amazonaws.com/tripimages/Image-Placeholder.jpeg"};

  useEffect(function getTripsOnMount() {
    console.debug("TripList useEffect getTripsOnMount");
    getTrips();
  }, []);


  async function getTrips() {
    let trips;
    if(includeUser) {
      trips  = await TravelerApi.getAllTrips();
    }
    else {
      trips = await TravelerApi.getUserTrips(userId);
    }
    setTrips(trips);
  }

  if (!trips) return <LoadingSpinner />;

  if(includeUser) {
    return (
      <div className="TripList col-md-8 offset-md-2">
        {trips.length
            ? (
                <div className="TripList-list">
                  {trips.map(c => (
                      <TripPreviewCard
                          id={c.id}
                          title={c.title}
                          tripImage={ c.images[0] ?
                                      c.images[0] :
                                      sampleImage}
                          username={c.username}
                          profileImage={c.profImage}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
    );
  } 
  else {
    return (
      <div className="TripList col-md-8 offset-md-2">
        {trips.length
            ? (
                <div className="TripList-list">
                  {trips.map(c => (
                      <TripPreviewCard
                          id={c.id}
                          title={c.title}
                          tripImage={c.images[0].fileUrl}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
    );
  }
}

export default TripList;
