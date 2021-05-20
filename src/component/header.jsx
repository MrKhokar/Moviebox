import React from 'react';
const Head = (props) => {
    const { header, length} = props;
    return (<div>
           <marquee behavior="alternate"  scrollamount="5"><h2 style={header}>Movies Detailings.. There are total {length} movies remains!</h2></marquee> 
    </div> );
}
 
export default Head;