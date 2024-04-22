import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageCard from './ImageCard';
import TravelerApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import Alert from '../common/Alert';

/**
 * Shows a more detailed view of a Trip. 
 * Routed to as /trips/{tripID}
 * Displays trip title, username of author, and 
 * all trip images.
 * If this trip belongs to the person who is logged in, then
 * a "delete" button will appear to the right. Clicking this
 * button will delete the trip.
 * 
 */
const TripDetail = () => {

    const { currentUser } = useContext(UserContext);
    const [trip, setTrip] = useState();
    const [isOwnTrip, setIsOwnTrip] = useState(false);
    const [tripDeleted, setTripDeleted] = useState(false);

    const { id } = useParams();
    console.debug("Trip Detail", "tripId=", id);

    useEffect( () => {
        async function fetchTrip() {
            try {
                let res = await TravelerApi.getTrip(id);
                setTrip(res);
                //console.log("Trip:", res); // Use res instead of trip
            } catch (error) {
                console.error("Error fetching trip:", error);
            }
        }
        fetchTrip();
    }, [id]);

    useEffect( () => { //This second useEffect is necessary because setting state is asynchronous
        if (trip) {
            setIsOwnTrip(trip.userId === currentUser.id);
        }
    }, [trip, currentUser])

    async function deleteTrip() {
        let res = await TravelerApi.deleteTrip(id);
        if(res === id) {
            setTripDeleted(true);
        }
    }

    if(!trip) return <LoadingSpinner />;
    return (
        <div className='card-body col-md-8 offset-md-2'>
            {tripDeleted && 
                <Alert type='success' messages={["Trip successfully deleted."]}/>}
            
            <div className='card-title'>
                 <h1> {trip.title} </h1>
                 <h5> Posted by 
                     <Link to={`/users/${trip.username}`}> {trip.username} </Link>
                     {isOwnTrip && 
                        <button 
                        className='btn btn-danger float-right'
                        onClick={deleteTrip}>
                            Delete
                        </button>
                     }
                     
                 </h5>
            </div>
            {trip.images.map( 
                image => <ImageCard key={image.id}
                                    id={image.id}
                                    image={image.fileUrl}
                                    caption={image.caption}
                                    tag1 = {image.tag1}
                                    tag2 = {image.tag2}
                                    tag3 = {image.tag3}
                                    tag4 = {image.tag4}
                                    tag5 = {image.tag5}
                                    /> )}
        </div>
    );
};
export default TripDetail;