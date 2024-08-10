import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />
                </div>
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="Main product" />
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="Star icon" />
                    <img src={star_icon} alt="Star icon" />
                    <img src={star_icon} alt="Star icon" />
                    <img src={star_icon} alt="Star icon" />
                    <img src={star_dull_icon} alt="Star dull icon" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        Rs.{product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        Rs.{product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-size">
                    <h3>Select Size</h3>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span> Women, T-shirt</p>
                <p className='productdisplay-right-category'><span>Tags :</span> Modern,</p>
            </div>
        </div>
    );
};

export default ProductDisplay;

