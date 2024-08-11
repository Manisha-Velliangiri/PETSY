const Add_Product = async () => {
   console.log(productDetails);
   let responseData;
   let product = productDetails;

   let formData = new FormData();
   formData.append('product', image);

   await fetch('https://petsy-e5hz.onrender.com/upload', { // Backend URL
       method: 'POST',
       headers: {
           Accept: 'application/json',
       },
       body: formData,
   })
   .then((resp) => resp.json())
   .then((data) => { responseData = data });

   if (responseData.success) {
       product.image = responseData.image_url;
       console.log(product);
       await fetch('https://petsy-e5hz.onrender.com/addproduct', { // Backend URL
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(product),
       })
       .then((resp) => resp.json())
       .then((data) => {
           data.success ? alert("Product added") : alert("Failed");
       });
   }
};
