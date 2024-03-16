const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const countriesRoutes = require("./routes/country.routes");
const PORT = 3000;

const app = express();
app.use(express.json());

// Mounting routes
app.use("/", authRoutes);
app.use("/", countriesRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
