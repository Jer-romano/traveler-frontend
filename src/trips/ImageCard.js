import React from 'react';
import "./ImageCard.css";
import Tag from './Tag';

/**
 * The ImageCard is used as part of the TripDetail component. It
 * displays each trip picture in all it's glory. It also displays any tags.
 */
const ImageCard = ({ image, caption, tag1, tag2, tag3, tag4, tag5 }) => {

    console.debug("ImageCard:", image);
    return (
        <div className='card mt-3'>
            <div className='ImageCard card-body'>
                <div>
                    <img src={image} alt='Trip image' />
                </div>      
                <span className='card-body mt-3'>
                    <Tag tag={tag1}/>
                    <Tag tag={tag2}/>
                    <Tag tag={tag3}/>
                    <Tag tag={tag4}/>
                    <Tag tag={tag5}/>
                </span>      
                <h4 className='mt-3'> {caption} </h4>
            </div>
        </div>
     
    );

};

export default ImageCard;