const express = require("express");
const router = express.Router();
const passport = require("passport");
const { z } = require("zod");
const { catchErrors } = require("../errors");
const { obnjectIdRegex } = require("../utils");
const ConvoyModel = require("../models/convoy");

router.get(
  "/",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const query = {};

    if (req.query.hasOwnProperty("driverId")) query.driver = req.query.driverId;
    if (req.query.hasOwnProperty("minDate")) query.departure = { $gte: req.query.minDate };
    if (req.query.hasOwnProperty("maxDate")) query.departure = { $lte: req.query.minDate };

    if (req.query.hasOwnProperty("status")) query.status = { $in: req.query.status }; // array
    if (req.query.hasOwnProperty("coordinates")) {
      query.pickupGeometry = {
        $near: {
          $geometry: { type: "Point", coordinates: req.user.coordinates }, // [longitude, latitude]
          $maxDistance: 3000, // get the max distance from the map instead
          $minDistance: 0,
        },
      };
    }

    const convoys = await ConvoyModel.find(query).populate("driver");
    return res.status(200).send({ ok: true, data: convoys });
  })
);

router.get(
  "/:_id",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    try {
      z.string().regex(obnjectIdRegex).parse(req.params._id);
    } catch (e) {
      const error = new Error(`Invalid request in delete user by _id: ${e}`);
      error.status = 400;
      return next(error);
    }
    const existingConvoy = await ConvoyModel.findById(req.params._id).populate("driver");
    if (!existingConvoy) return res.status(400).send({ ok: false, error: "Convoy not existing" });

    return res.status(200).send({ ok: true, data: existingConvoy });
  })
);

router.post(
  "/",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res, next) => {
    const newConvoy = {};

    // if (req.body.hasOwnProperty("departure")) newConvoy.departure = req.body.departure;
    if (req.body.hasOwnProperty("pickupName")) newConvoy.pickupName = req.body.pickupName;
    if (req.body.hasOwnProperty("pickupGeometry")) newConvoy.pickupGeometry = req.body.pickupGeometry;
    if (req.body.hasOwnProperty("dropOffName")) newConvoy.dropOffName = req.body.dropOffName;
    if (req.body.hasOwnProperty("dropOffGeometry")) newConvoy.dropOffGeometry = req.body.dropOffGeometry;
    if (req.body.hasOwnProperty("departure")) newConvoy.departure = req.body.departure;
    if (req.body.hasOwnProperty("availableVolume")) newConvoy.availableVolume = req.body.availableVolume;
    if (req.body.hasOwnProperty("needDrivers")) newConvoy.needDrivers = req.body.needDrivers;
    if (req.body.hasOwnProperty("availableSeat")) newConvoy.availableSeat = req.body.availableSeat;
    if (req.body.hasOwnProperty("needCollects")) newConvoy.needCollects = req.body.needCollects;
    if (req.body.hasOwnProperty("needs")) newConvoy.needs = req.body.needs;
    if (req.body.hasOwnProperty("name")) newConvoy.name = req.body.name;
    if (req.body.hasOwnProperty("email")) newConvoy.email = req.body.email;
    if (req.body.hasOwnProperty("phone")) newConvoy.phone = req.body.phone;
    if (req.body.hasOwnProperty("whatsappLink")) newConvoy.whatsappLink = req.body.whatsappLink;
    if (req.body.hasOwnProperty("status")) newConvoy.status = req.body.status;

    const createdConvoy = await ConvoyModel.create(newConvoy);
    const convoy = await ConvoyModel.findById(createdConvoy._id).populate("driver");

    return res.status(200).send({
      ok: true,
      data: convoy,
    });
  })
);

router.put(
  "/:_id",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res, next) => {
    try {
      z.string().regex(obnjectIdRegex).parse(req.params._id);
    } catch (e) {
      const error = new Error(`Invalid request in delete user by _id: ${e}`);
      error.status = 400;
      return next(error);
    }
    const existingConvoy = await ConvoyModel.findById(req.params._id);
    if (!existingConvoy) return res.status(400).send({ ok: false, error: "Convoy not existing" });

    const updatedConvoy = {};

    if (req.body.hasOwnProperty("departure")) updatedConvoy.departure = req.body.departure;
    if (req.body.hasOwnProperty("pickupName")) updatedConvoy.pickupName = req.body.pickupName;
    if (req.body.hasOwnProperty("pickupGeometry")) updatedConvoy.pickupGeometry = req.body.pickupGeometry;
    if (req.body.hasOwnProperty("dropOffName")) updatedConvoy.dropOffName = req.body.dropOffName;
    if (req.body.hasOwnProperty("dropOffGeometry")) updatedConvoy.dropOffGeometry = req.body.dropOffGeometry;
    if (req.body.hasOwnProperty("availableSeat")) updatedConvoy.placesInCar = req.body.availableSeat;
    if (req.body.hasOwnProperty("availableVolume")) updatedConvoy.loadingVolume = req.body.availableVolume;
    if (req.body.hasOwnProperty("needs")) updatedConvoy.loadingVolume = req.body.needs;
    if (req.body.hasOwnProperty("driver")) updatedConvoy.driver = req.body.driver;
    if (req.body.hasOwnProperty("email")) updatedConvoy.email = req.body.email;
    if (req.body.hasOwnProperty("phone")) updatedConvoy.phone = req.body.phone;
    if (req.body.hasOwnProperty("name")) updatedConvoy.name = req.body.name;
    if (req.body.hasOwnProperty("whatsappLink")) updatedConvoy.whatsappLink = req.body.whatsappLink;
    if (req.body.hasOwnProperty("status")) updatedConvoy.status = req.body.status;

    existingConvoy.set(updatedConvoy);
    await existingConvoy.save();

    const convoy = await ConvoyModel.findById(req.params._id).populate("driver");

    return res.status(200).send({
      ok: true,
      data: convoy,
    });
  })
);

router.delete(
  "/:_id",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res, next) => {
    try {
      z.string().regex(obnjectIdRegex).parse(req.params._id);
    } catch (e) {
      const error = new Error(`Invalid request in delete convoy by _id: ${e}`);
      error.status = 400;
      return next(error);
    }
    const userId = req.params._id;

    await ConvoyModel.findByIdAndDelete(userId);
    res.status(200).send({ ok: true });
  })
);

module.exports = router;
