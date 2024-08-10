// src/Components/TestImage.js

import React from 'react';
import p1_img from './Assets/product_p1.jpg' // Ensure this path is correct based on your project structure

const TestImage = () => {
  return (
    <div>
      <h1>Test Image</h1>
      <img src={p1_img} alt="Test Product" style={{ maxWidth: '200px' }} />
    </div>
  );
};

export default TestImage;
