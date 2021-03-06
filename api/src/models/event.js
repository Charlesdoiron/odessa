const mongoose = require("mongoose");
const dbConnection = require("../mongo");
const MODELNAME = "event";

const PENDING = { label: "En attente", value: "pending" };
const ACCEPTED = { label: "En cours", value: "accepted" };
const CANCELED = { label: "Annulé", value: "canceled" };
const DELIVERING = { label: "Sur la route", value: "delivering" };
const COMPLETED = { label: "Livrée !", value: "completed" };

const locationSchema = new mongoose.Schema({
  type: {
    type: String, // Don't do `{ location: { type: String } }`
    enum: ["Point"], // 'location.type' must be 'Point'
    required: true,
    default: "Point",
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

const Schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["convoy", "collect"],
    },
    title: String,
    pickupName: String,
    pickupGeometry: {
      type: locationSchema,
      index: "2dsphere",
    },
    // either a register user...
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    // ...or not
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^.+@(?:[\w-]+\.)+\w+$/, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      lowercase: true,
    },
    name: { type: String },
    whatsappLink: String,
    status: { type: Object, enum: [PENDING, ACCEPTED, CANCELED, COMPLETED] },
    /* ONLY CONVOY */
    departure: Date,
    dropOffName: String,
    dropOffGeometry: {
      type: locationSchema,
      index: "2dsphere",
    },
    availableSeat: Number,
    availableVolume: Number,
    needs: String,
    needDrivers: Boolean,
    needCollects: Boolean,
    // either a register user...
    driver: { type: mongoose.Types.ObjectId, ref: "user" },
    // ...or not
    /* ONLY COLLECT */
    date: Date,
    loadingVolume: String,
    convoy: { type: mongoose.Types.ObjectId, ref: "event" },
  },
  { timestamps: true }
);

const EventModel = dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);
module.exports = EventModel;
