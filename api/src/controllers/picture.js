const express = require("express");
const router = express.Router();
const passport = require("passport");
const { catchErrors } = require("../errors");

router.post(
  "/picture",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    const files = Object.keys(req.files || {}).map((e) => req.files[e]);
    let file = files[0];
    // If multiple file with same names are provided, file is an array. We just take the latest.
    if (Array.isArray(file)) {
      file = file[file.length - 1];
    }
    const { name, data, mimetype } = file;
    if (!["image/jpeg", "image/png"].includes(mimetype)) return res.status(500).send({ ok: false, code: "UNSUPPORTED_TYPE" });

    const resultingFile = { mimetype: "image/png", data };
    const result = await uploadPublicPicture(name, resultingFile);
    return res.status(200).send({ data: result.Location, ok: true });
  })
);

module.exports = router;
