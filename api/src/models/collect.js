const mongoose = require("mongoose");
const dbConnection = require("../mongo");
const MODELNAME = "Collect";

const PENDING = { label: "En attente", value: "pending" };
const ACCEPTED = { label: "En cours", value: "accepted" };
const CANCELED = { label: "Annulé", value: "canceled" };
const COMPLETED = { label: "Chargée !", value: "completed" };

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
    title: String,
    date: Date,
    pickupName: String,
    pickupGeometry: {
      type: locationSchema,
      index: "2dsphere",
    },
    loadingVolume: String,
    convoy: { type: mongoose.Types.ObjectId, ref: "convoy" },
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
  },
  { timestamps: true }
);

const ConvoiModel = dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);
module.exports = ConvoiModel;
