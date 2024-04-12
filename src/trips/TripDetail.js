import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageCard from './ImageCard';
import TravelerApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';

const TripDetail = () => {

    const [trip, setTrip] = useState(null);

    const { id } = useParams();
    console.debug("Trip Detail", "tripId=", id);

    useEffect( () => {
        async function fetchTrip() {
            setTrip(await TravelerApi.getTrip(id));
            // console.log("Images:", trip.images);

        }
        fetchTrip();
    }, [id]);

    if(!trip) return <LoadingSpinner />;
    return (
        <div className='card-body col-md-8 offset-md-2'>
            <div className='card-title'>
                 <h1> {trip.title} </h1>
                 <h5> Posted by 
                     <Link to={`/users/${trip.username}`}> {trip.username} </Link>
                 </h5>
            </div>
            {trip.images.map( 
                image => <ImageCard id={image.id}
                                    image={image.fileUrl}
                                    caption={image.caption}
                                    tag1 = {image.tag1}
                                    tag2 = {image.tag2}
                                    tag3 = {image.tag3}
                                    /> )}
        </div>
    );
};
export default TripDetail;