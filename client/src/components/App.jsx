import React, { useState } from 'react';
import styled from 'styled-components';
import Overview from './overview/Overview.jsx';
import RelatedProductsContainer from './relatedProducts/RelatedProductsContainer.jsx';
import Question from './qComponents/questions.jsx';
import RatingsReviews from './ratings_and_reviews/RatingsReviews.jsx';

function App(props) {

  let [productId, setProductId] = useState(37311);
  let [product, setProduct] = useState({});
  let [productStyles, setProductStyles] = useState({});
  let [productMeta, setProductMeta] = useState({});

  const renderProduct = function(e, id) {
    if (e.target.id === 'cardButton') {
      return;
    }
    setProductId(id);
  }

 //api call for product info levi,yuki, sonia, jake
  const getProductInfo = function() {
    return axios.get(`/products/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log('couldnt get product info', err));
  }

 //api call for product styles levi, yuki
  const getProductStyles = function() {
    return axios.get(`/products/${productId}/styles`)
      .then(res => setProductStyles(res.data))
      .catch(err => console.log('couldnt get product styles', err));
  }

  //api call for product meta data levi, sonia
  const getProductMeta = function() {
    return axios.get(`/reviews/meta`, { params: {product_id: productId }})
      .then(res => setProductMeta(res.data))
      .catch(err => console.log('couldnt get product meta data', err));
  }

  useEffect(() => {
    getProductInfo();
    getProductStyles();
    getProductMeta();
  }, [productId])

  return (
    <div>
<<<<<<< HEAD
      <Overview productId={productId} productInfo={productInfo} productStyles={productStyles} productMeta={productMeta} />
      <RelatedProductsContainer product_id={productId} renderProduct={renderProduct} productInfo={productInfo} productStyles={productStyles} />
      <Question productInfo={productInfo} />
      <RatingsReviews productId={productId} productInfo={productInfo} productMeta={productMeta} />
=======
      <Overview productId={productId}/>
      <RelatedProductsContainer product_id={productId} renderProduct={renderProduct} />
      <Question product_id={productId}/>
      <RatingsReviews productId={productId}/>
>>>>>>> 34e37ada27a494f51dee9b1ddf39c99ee0a75767
    </div>
  );
}

export default App;
