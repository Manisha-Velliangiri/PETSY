import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  // Fetch products from the API
  const fetchInfo = async () => {
    try {
      const response = await fetch('https://petsy-e5hz.onrender.com/allproducts'); // Updated URL
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove a product by ID
  const remove_product = async (id) => {
    try {
      await fetch('https://petsy-e5hz.onrender.com/removeproduct', { // Updated URL
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      fetchInfo(); // Refresh the product list after removal
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt={product.name} className='listproduct-product-icon' />
              <p>{product.name}</p>
              <p>Rs.{product.old_price}</p>
              <p>Rs.{product.new_price}</p>
              <p>{product.category}</p>
              <img 
                onClick={() => remove_product(product.id)} 
                className="listproduct-remove-icon" 
                src={cross_icon} 
                alt="Remove" 
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ListProduct;
