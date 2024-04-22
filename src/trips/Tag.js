import React from 'react';
import "./Tag.css";

/**
 * Small component to display a tag generated by AI.
 */
const Tag = ({ tag }) => {

return (<span className='tag'>
    { tag ?
     tag : "null"}
    </span>);

}
export default Tag;