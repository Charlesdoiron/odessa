const express = require("express");
const passport = require("passport");
const mapbox = require("../mapbox");
const router = express.Router();

const { catchErrors } = require("../utils");

router.post(
  "/list",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    if (!req.body.expression) return res.status(409).send({ ok: false, error: "Please provide an expression" });

    let features = null;

    if (!req.body.coordinates || !req.body.coordinates.latitude || !req.body.coordinates.longitude) {
      features = await mapbox.fetchByExpression({
        expression: req.body.expression,
      });
    } else {
      const { longitude, latitude } = req.body.coordinates;
      features = await mapbox.fetchByExpression({
        expression: req.body.expression,
        proximity: `${longitude},${latitude}`,
      });
    }

    res.status(200).send({
      ok: true,
      data: features.map((feature) => ({
        name: feature.place_name,
        geometry: feature.geometry,
      })),
    });
  })
);

module.exports = router;
