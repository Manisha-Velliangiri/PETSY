import React from 'react';
import './Item.css'; // Import your CSS file for Item component
import { Link } from 'react-router-dom';
const Item = (props) => {
    return (
        <div className='item'>
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="productdisplay"className='item-image' /></Link>
            <p>{props.name}</p>
            <div className='item-prices'>
                <div className='item-price-new'>
                     Rs.{props.new_price}
                </div>
            </div>
        </div>
    )
}

export default Item; // Export Item as default

