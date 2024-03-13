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
  console.log(`Server is running on port ${PORT}`)
});
