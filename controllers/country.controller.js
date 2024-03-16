const axios = require("axios");
require("dotenv").config();

const url = process.env.URL;

async function getCountryInfo(countryName) {
  try {
    const response = await axios.get(`${url}/name/${countryName}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch country information");
  }
}

async function getCountries(filter, sort, page, limit) {
  try {
    const response = await axios.get(`${url}/all`);

    let countries = response.data;

    // Apply filters
    if (filter) {
      if (filter.population) {
        const { min: minPopulation, max: maxPopulation } = filter.population;
        countries = countries.filter((country) => {
          return (
            country.population >= minPopulation &&
            country.population <= maxPopulation
          );
        });
      }

      if (filter.area) {
        const { min: minArea, max: maxArea } = filter.area;

        countries = countries.filter((country) => {
          return country.area >= minArea && country.area <= maxArea;
        });
      }

      if (filter.language) {
        countries = countries.filter((country) => {
          return Object.values(country.languages).includes(filter.language);
        });
      }
    }

    // sorting logic
    if (sort) {
      const { field, order } = sort;

      if (field === "name") {
        // Sort by the common name within the name object

        countries.sort((a, b) => {
          const nameA = a.name.common.toUpperCase();
          const nameB = b.name.common.toUpperCase();

          if (order === "asc") {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });
      } else {
        countries.sort((a, b) => {
          if (order === "asc") {
            return a[field] - b[field];
          } else {
            return b[field] - a[field];
          }
        });
      }
    }
    // pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    countries = countries.slice(startIndex, endIndex);

    const names = countries.reduce((accumulator, value) => {
      const result = {};

      result.name = value.name.common;
      accumulator.push(result);
      return accumulator;
    }, []);

    return names;
  } catch (error) {
    throw new Error("Failed to fetch countries list");
  }
}

module.exports = { getCountryInfo, getCountries };
