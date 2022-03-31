const express = require("express");
const router = express.Router();
const passport = require("passport");
const { z } = require("zod");
const { catchErrors } = require("../errors");
const { obnjectIdRegex } = require("../utils");
const EventModel = require("../models/event");
const dayjs = require("dayjs");

router.get(
  "/",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const query = {};
    let limit = null;
    let skip = null;
    if (req.query?.type === "availableSeat") {
      return res.status(404).send({ ok: false, error: "Cette fonctionnalité n'est pas encore disponible. Bientôt ! ⏰" });
    }
    if (req.query?.extra?.includes("twoWeeks")) {
      query.departure = { $lte: dayjs().add(14, "day") };
    }
    if (req.query.hasOwnProperty("type")) query.type = req.query.type;
    if (req.query.hasOwnProperty("title")) query.title = { $in: req.query.title };
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

    const events = await EventModel.find(query).populate("driver convoy");
    return res.status(200).send({ ok: true, data: events });
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
    const existingEvent = await EventModel.findById(req.params._id).populate("driver");
    if (!existingEvent) return res.status(400).send({ ok: false, error: "Convoy not existing" });

    return res.status(200).send({ ok: true, data: existingEvent });
  })
);

router.post(
  "/",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res, next) => {
    const newEvent = {};
    if (req.body.hasOwnProperty("type")) newEvent.type = req.body.type;
    if (req.body.hasOwnProperty("title")) newEvent.title = req.body.title;
    if (req.body.hasOwnProperty("pickupName")) newEvent.pickupName = req.body.pickupName;
    if (req.body.hasOwnProperty("pickupGeometry")) newEvent.pickupGeometry = req.body.pickupGeometry;
    if (req.body.hasOwnProperty("user")) newEvent.user = req.body.user;
    if (req.body.hasOwnProperty("email")) newEvent.email = req.body.email;
    if (req.body.hasOwnProperty("phone")) newEvent.phone = req.body.phone;
    if (req.body.hasOwnProperty("name")) newEvent.name = req.body.name;
    if (req.body.hasOwnProperty("whatsappLink")) newEvent.whatsappLink = req.body.whatsappLink;
    if (req.body.hasOwnProperty("status")) newEvent.status = req.body.status;
    /* ONLY CONVOY */
    if (req.body.hasOwnProperty("departure")) newEvent.departure = req.body.departure;
    if (req.body.hasOwnProperty("dropOffName")) newEvent.dropOffName = req.body.dropOffName;
    if (req.body.hasOwnProperty("dropOffGeometry")) newEvent.dropOffGeometry = req.body.dropOffGeometry;
    if (req.body.hasOwnProperty("availableSeat")) newEvent.availableSeat = req.body.availableSeat;
    if (req.body.hasOwnProperty("availableVolume")) newEvent.availableVolume = req.body.availableVolume;
    if (req.body.hasOwnProperty("needs")) newEvent.needs = req.body.needs;
    if (req.body.hasOwnProperty("needDrivers")) newEvent.needDrivers = req.body.needDrivers;
    if (req.body.hasOwnProperty("needCollects")) newEvent.needCollects = req.body.needCollects;
    if (req.body.hasOwnProperty("driver")) newEvent.driver = req.body.driver;
    /* ONLY COLLECT */
    if (req.body.hasOwnProperty("date")) newEvent.date = req.body.date;
    if (req.body.hasOwnProperty("loadingVolume")) newEvent.loadingVolume = req.body.loadingVolume;
    if (req.body.hasOwnProperty("convoy")) newEvent.convoy = req.body.convoy;

    const createdEvent = await EventModel.create(newEvent);
    const event = await EventModel.findById(createdEvent._id).populate("driver");

    return res.status(200).send({
      ok: true,
      data: event,
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
    const existingEvent = await EventModel.findById(req.params._id);
    if (!existingEvent) return res.status(400).send({ ok: false, error: "Event not existing" });

    const updatedEvent = {};
    if (req.body.hasOwnProperty("type")) updatedEvent.type = req.body.type;
    if (req.body.hasOwnProperty("title")) updatedEvent.title = req.body.title;
    if (req.body.hasOwnProperty("pickupName")) updatedEvent.pickupName = req.body.pickupName;
    if (req.body.hasOwnProperty("pickupGeometry")) updatedEvent.pickupGeometry = req.body.pickupGeometry;
    if (req.body.hasOwnProperty("user")) updatedEvent.user = req.body.user;
    if (req.body.hasOwnProperty("email")) updatedEvent.email = req.body.email;
    if (req.body.hasOwnProperty("phone")) updatedEvent.phone = req.body.phone;
    if (req.body.hasOwnProperty("name")) updatedEvent.name = req.body.name;
    if (req.body.hasOwnProperty("whatsappLink")) updatedEvent.whatsappLink = req.body.whatsappLink;
    if (req.body.hasOwnProperty("status")) updatedEvent.status = req.body.status;
    /* ONLY CONVOY */
    if (req.body.hasOwnProperty("departure")) updatedEvent.departure = req.body.departure;
    if (req.body.hasOwnProperty("dropOffName")) updatedEvent.dropOffName = req.body.dropOffName;
    if (req.body.hasOwnProperty("dropOffGeometry")) updatedEvent.dropOffGeometry = req.body.dropOffGeometry;
    if (req.body.hasOwnProperty("availableSeat")) updatedEvent.availableSeat = req.body.availableSeat;
    if (req.body.hasOwnProperty("availableVolume")) updatedEvent.availableVolume = req.body.availableVolume;
    if (req.body.hasOwnProperty("needs")) updatedEvent.needs = req.body.needs;
    if (req.body.hasOwnProperty("needDrivers")) updatedEvent.needDrivers = req.body.needDrivers;
    if (req.body.hasOwnProperty("needCollects")) updatedEvent.needCollects = req.body.needCollects;
    if (req.body.hasOwnProperty("driver")) updatedEvent.driver = req.body.driver;
    /* ONLY COLLECT */
    if (req.body.hasOwnProperty("date")) updatedEvent.date = req.body.date;
    if (req.body.hasOwnProperty("loadingVolume")) updatedEvent.loadingVolume = req.body.loadingVolume;
    if (req.body.hasOwnProperty("convoy")) updatedEvent.convoy = req.body.convoy;

    existingEvent.set(updatedEvent);
    await existingEvent.save();

    const event = await EventModel.findById(req.params._id).populate("driver");

    return res.status(200).send({
      ok: true,
      data: event,
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
      const error = new Error(`Invalid request in delete event by _id: ${e}`);
      error.status = 400;
      return next(error);
    }
    const userId = req.params._id;

    await EventModel.findByIdAndDelete(userId);
    res.status(200).send({ ok: true });
  })
);

module.exports = router;
