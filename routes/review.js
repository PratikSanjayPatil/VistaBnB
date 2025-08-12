const express = require('express');
const router = express.Router({mergeParams: true});
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const wrapAsync = require('../utils/wrapAsync.js') //Handles err of async functions
const ExpressError = require('../utils/ExpressError.js'); //Class for Error handdling
const { validateReview, isLoggedIn, isReviewAuther } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


//validate listings or review with functions


// Post Review Route

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Review Route

router.delete( "/:reviewId", isLoggedIn, isReviewAuther, wrapAsync(reviewController.destroyReview));


module.exports = router;
