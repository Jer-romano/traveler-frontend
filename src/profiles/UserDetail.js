import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TravelerApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import TripPreviewCard from '../trips/TripPreviewCard';

const UserDetail = () => {

    const [user, setUser] = useState(null);
    const [userTrips, setUserTrips] = useState(null);
    const sampleImage = {fileUrl: "https://traveler-capstone-images.s3.us-east-2.amazonaws.com/tripimages/Image-Placeholder.jpeg"};


    const { username } = useParams();
    console.debug("User Detail", "Username=", username);

    useEffect( () => {
        async function fetchUserDetails() {
            setUser(await TravelerApi.getCurrentUser(username));
            setUserTrips(await TravelerApi.getUserTrips(username));
        }
        fetchUserDetails();
    }, [username]);

    if(!user || !userTrips) return <LoadingSpinner />;
    return (
        <>
        <section className="h-100 gradient-custom-2">
        <div className="container py-7 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{"backgroundColor": "#000", "height":"200px"}}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{"width": "150px"}}>
                    <img src={user.profileImage}
                      alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{"width": "150px", "zIndex": "1"}}/>
                    <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                      style={{"zIndex": "1", "marginTop": "1px"}}>
                      Edit profile
                    </button>
                  </div>
                  <div className="ms-3" style={{"marginTop": "130px", "marginLeft": "15px"}}>
                    <h3>{user.firstName} {user.lastName}</h3>
                    <p>@{user.username}</p>
                  </div>
                </div>
                <div className="p-4 text-black" style={{"backgroundColor": "#f8f9fa"}}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1 mt-3">About</p>
                    <div className="p-4" style={{"backgroundColor": "#f8f9fa"}}>
                      <p className="font-italic mb-1">{user.about}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent Trips</p>
                  </div>
                  {userTrips && userTrips.map(t => (
                        <div className='row g-2'>
                            <TripPreviewCard
                                title={t.title}
                                tripImage={t.images[0] ?
                                          t.images[0] :
                                          sampleImage}
                                id={t.tripId} />
                        </div>
                     ))}
                 
                  {/* <div className="row g-2">
                    <div className="col">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                        alt="image 1" className="w-100 rounded-3"/>
                    </div>
                    <div className="col">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                        alt="image 1" className="w-100 rounded-3"/>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
  
      </section>
      
            </>
    );


}

export default UserDetail;