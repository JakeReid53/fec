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

const getReviewAmount = (productId) => (
  axios.get('/reviews', {
    params: {
      product_id: productId,
    }
  })
    .then((res) => {
      return res.data.results.length;
    })
    .catch((err) => {
      console.log('error fetching reviews length', err);
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
}

const voteHelpful = (reviewId) => (
  axios.put(`/reviews/${reviewId}/helpful`)
);

const reportReview = (reviewId) => (
  axios.put(`/reviews/${reviewId}/report`)
);

module.exports = {
  getReviewsBy2,
  getCurrentAmtReviews,
  getReviewAmount,
  voteHelpful,
  reportReview,
};
