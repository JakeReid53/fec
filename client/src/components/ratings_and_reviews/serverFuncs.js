const axios = require('axios');

const getReviewsBy2 = (productId, page) => (
  axios.get('/reviews', {
    params: {
      product_id: productId,
      page,
      count: 2,
    },
  })
);

const checkMoreRevs = (productId, page) => (
  axios.get('/reviews', {
    params: {
      product_id: productId,
      page,
      count: 2,
    },
  })
    .then((res) => {
      if (res.data.results.length) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log('error checking more revs', err);
    })
);

const getCurrentAmtReviews = (productId, page) => {
  const currentAmt = page * 2;
  return axios.get('/reviews', {
    params: {
      product_id: productId,
      page: 1,
      count: currentAmt,
    },
  })
};

const getMetaData = (productId) => (
  axios.get('/reviews/meta', {
    params: {
      product_id: productId,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error fetching meta data', err);
    })
);

const getStarReviews = (star) => (
  axios.get('/reviews', {
    params: {
      product_id: productId,
      count: 10000,
    },
  })
    .then((res) => {
      const starReviews = [];
      res.data.results.forEach((review) => {
        if (review.rating === star) {
          starReviews.push(review);
        }
      });
      return starReviews;
    })
    .catch((err) => {
      console.log(`error fetching ${star} star reviews from api`, err);
    })
);

const voteHelpful = (reviewId) => (
  axios.put(`/reviews/${reviewId}/helpful`)
);

const reportReview = (reviewId) => (
  axios.put(`/reviews/${reviewId}/report`)
);

module.exports = {
  getReviewsBy2,
  checkMoreRevs,
  getCurrentAmtReviews,
  getMetaData,
  getStarReviews,
  voteHelpful,
  reportReview,
};
