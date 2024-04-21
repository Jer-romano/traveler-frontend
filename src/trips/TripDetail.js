import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageCard from './ImageCard';
import TravelerApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import UserContext from '../auth/UserContext';
import Alert from '../common/Alert';

const TripDetail = () => {

    const { currentUser } = useContext(UserContext);
    const [trip, setTrip] = useState();
    const [isOwnTrip, setIsOwnTrip] = useState(false);
    const [tripDeleted, setTripDeleted] = useState(false);

    const history = useHistory();

    const { id } = useParams();
    console.debug("Trip Detail", "tripId=", id);

    useEffect( () => {
        async function fetchTrip() {
            let res = await TravelerApi.getTrip(id);
            setTrip(res);
            console.log("Trip:", trip);
            setIsOwnTrip(trip.userId === currentUser.id);

        }
        fetchTrip();
    }, [id]);

    async function deleteTrip() {
        let res = await TravelerApi.deleteTrip(id);
        if(res === id) {
            setTripDeleted(true);
        }
      //  history.push("/");
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