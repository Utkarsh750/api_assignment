const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/middleware");

const {
  getCountries,
  getCountryInfo,
} = require("../controllers/country.controller");

//  Route to get information about a specific country by name.
router.get("/countries/:countryName", verifyToken, async (req, res) => {
  try {
    const countryName = req.params.countryName;
    const countryInfo = await getCountryInfo(countryName);
    res.json(countryInfo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route to get a list of countries based on filter, sort, pagination criteria.
router.get("/countries", verifyToken, async (req, res) => {
  try {
    const { filter, sort, page, limit } = req.body;
    const countries = await getCountries(filter, sort, page, limit);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
