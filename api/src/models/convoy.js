const mongoose = require("mongoose");
const dbConnection = require("../mongo");
const MODELNAME = "Convoy";

const PENDING = { label: "En attente", value: "pending" };
const ACCEPTED = { label: "En cours", value: "accepted" };

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
    departure: Date,
    pickupName: String,
    pickupGeometry: {
      type: locationSchema,
      index: "2dsphere",
    },
    dropOffName: String,
    dropOffGeometry: {
      type: locationSchema,
      index: "2dsphere",
    },
    availableSeat: Number,
    availableVolume: Number,
    needs: String,
    needDrivers: Boolean,
    availableSeat: Number,
    needCollects: Boolean,
    // either a register user...
    driver: { type: mongoose.Types.ObjectId, ref: "user" },
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
    status: { type: Object, enum: [PENDING | ACCEPTED] },
  },
  { timestamps: true }
);

const ConvoiModel = dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);
module.exports = ConvoiModel;
