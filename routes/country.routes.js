const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/middleware");
const {
  getCountries,
  getCountryInfo,
} = require("../controllers/country.controller");

router.get("/countries/:countryName", verifyToken, async (req, res) => {
  try {
    const countryName = req.params.countryName;
    const countryInfo = await getCountryInfo(countryName);
    res.json(countryInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/countries", verifyToken, async (req, res) => {
  try {
    const { filter, sort, page, limit } = req.body;
    const countries = await getCountries(filter, sort, page, limit);
    console.log(countries);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
