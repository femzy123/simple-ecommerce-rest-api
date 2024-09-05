const express = require("express");
const app = express();
const env = require("dotenv")

const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes")
const setupSwagger = require('./utils/swagger')

app.use(express.json());

app.get("/healthcheck", function (_, res) {
  res.send("API is live");
});

app.use("/api", categoryRouter);
app.use("/api", productRouter);

setupSwagger(app)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(
    `Swagger docs available at http://localhost:${process.env.PORT}/api-docs`
  );
});

module.exports = app;
