const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth.routes");
const countriesRoutes = require("./routes/country.routes");

// Mounting routes
app.use("/", authRoutes);
app.use("/", countriesRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
