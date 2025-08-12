const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require('../utils/wrapAsync.js') //Handles err of async functions
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer"); //help to save image files
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); //part of multer


//Route to handle GET requests to the /listings URL :- Index Route
// This route fetches all listings from the database and renders them using EJS
//Or Create route

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingController.createListing));

//New Route

router.get("/listings/new", isLoggedIn, listingController.rederNewForm);

//Show Route or Update route or Delete route

router
  .route("/listings/:id")
  .get(wrapAsync(listingController.showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//Edit Route

router.get("/listings/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;
