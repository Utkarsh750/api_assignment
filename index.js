// const express = require("express");
// const jwt = require("jsonwebtoken");
// const axios = require("axios");
// const app = express();
// app.use(express.json());
// // Define a username and password (for demo purposes)
// const username = "admin";
// const password = "password";
// const secretKey = "secret";
// // Authentication endpoint
// app.post("/auth", (req, res) => {
//   const { username: reqUsername, password: reqPassword } = req.body;
//   if (reqUsername === username && reqPassword === password) {
//     // Generate JWT token
//     const token = jwt.sign({ username: reqUsername }, secretKey);
//     res.json({ token });
//   } else {
//     res.status(401).json({ error: "Invalid credentials" });
//   }
// });
// // Middleware to verify JWT token
// function verifyToken(req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).json({ error: "Token not provided" });
//   }
//   jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: "Invalid token" });
//     }
//     req.username = decoded.username;
//     next();
//   });
// }
// // Endpoint to fetch detailed information about a specific country
// app.get("/countries/:countryName", verifyToken, async (req, res) => {
//   try {
//     const countryName = req.params.countryName;
//     const response = await axios.get(
//       `https://restcountries.com/v3.1/name/${countryName}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch country information" });
//   }
// });
// // Endpoint to retrieve a list of all countries' names based on filters and sorting
// app.get("/countries", verifyToken, async (req, res) => {
//   try {
//     // Fetch all countries data from the REST Countries API
//     const response = await axios.get(
//       `https://restcountries.com/v3.1/all?fields=name`
//     );
//     //  console.log(response)
//     let countries = response.data;
//     //  console.log(countries)
//     // Apply filters from request body
//     const { filter, sort, page, limit } = req.body;
//     //  console.log(filter, sort, page, limit)
//     if (filter) {
//       if (filter.population) {
//         const { min: minPopulation, max: maxPopulation } = filter.population;
//         countries = countries.filter((country) => {
//           return (
//             country.population >= minPopulation &&
//             country.population <= maxPopulation
//           );
//         });
//       }
//       if (filter.area) {
//         const { min: minArea, max: maxArea } = filter.area;
//         countries = countries.filter((country) => {
//           return country.area >= minArea && country.area <= maxArea;
//         });
//         //  console.log(countries)
//       }
//       //if (filter.language) {
//       //  countries = countries.filter(country => {
//       //  return country.languages.includes(filter.language);
//       //  });
//       //  console.log(countries)
//       //}
//     }
//     // Apply sorting from request body
//     if (sort) {
//       const { field, order } = sort;
//       countries.sort((a, b) => {
//         if (order === "asc") {
//           return a[field] - b[field];
//         } else {
//           return b[field] - a[field];
//         }
//       });
//     }
//     // Implement pagination
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     countries = countries.slice(startIndex, endIndex);
//     res.json(countries);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch countries list" });
//   }
// });
// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const authRoutes = require("./routes/auth.routes");
const countriesRoutes = require("./routes/country.routes");
const app = express();
app.use(express.json());
// Mounting routes
app.use("/", authRoutes);
app.use("/", countriesRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
