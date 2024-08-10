import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
       <div className="descriptionbox-navigator">
          <div className="descriptionbox-nav-box"> Description</div>
             <div className="descriptionbox-nav-box fade">Reviews(11) </div>
       </div>
       <div className="descriptionbox-description">
          Adorable and affordable clothes for your pets. <br />
         PETSY has all. Shop from petsy for best quality products.
       </div>
    </div>
  )
}
export default DescriptionBox
