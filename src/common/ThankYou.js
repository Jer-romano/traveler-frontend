import React from 'react';
import { Link } from 'react-router-dom';


const ThankYou = () => {

    return (
    
        <div>
        <h1>Thanks for uploading your trip!</h1>
        <h2>AI is currently analyzing your images</h2>
        <Link to={'/trips'}>
        <h2>Click here to go back to your feed.</h2>
        </Link>
        <h3>(You should see your trip at the top)</h3>
        </div>
    )


}
export default ThankYou;