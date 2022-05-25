import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselLabel from './CarouselLabel.jsx';
import CarouselList from './CarouselList.jsx';

const RelatedProductsContainer = function() {

  let [related, setRelated] = useState([]);
  let [outfit, setOutfit] = useState([]);

  useEffect(() => {
    // Grab the ids of all related products and save it in state
    axios.get('/products/37311/related', {
      params: {
        product_id: 37311
      }
    })
    .then(res => {
      setRelated(res.data);
    })
    .catch(err => {
      console.log('Couldnt get related products', err);
    })

    // If the user is visiting the site for the first time, initialize local storage to be an empty array
    if (localStorage.getItem('outfit') === null) {
      localStorage.setItem('outfit', JSON.stringify([]));
    } else {
      setOutfit(JSON.parse(localStorage.getItem('outfit')));
    }
  }, [])

  const addOutfit = function(id) {
    let oldOutfit = JSON.parse(localStorage.getItem('outfit'));
    let newOutfit = oldOutfit.concat([37316]);
    localStorage.setItem('outfit', JSON.stringify(newOutfit));
    setOutfit(newOutfit);
  }

  const removeOutfit = function(id) {
    let oldOutfit = JSON.parse(localStorage.getItem('outfit'));
    oldOutfit.shift();
    localStorage.setItem('outfit', JSON.stringify(oldOutfit));
    setOutfit(oldOutfit);
  }

  return (
    <>
      <CarouselLabel label='RELATED PRODUCTS' />
      <CarouselList listType='related' related={related} />
      <CarouselLabel label='YOUR OUTFIT' />
      <CarouselList listType='outfit' addOutfit={addOutfit} removeOutfit={removeOutfit} outfit={outfit} />
    </>
  );
};

export default RelatedProductsContainer;
