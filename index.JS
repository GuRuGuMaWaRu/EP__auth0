const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const app = express();
const port = 8080;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://gurugu.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://localhost:8080",
  issuer: "https://gurugu.auth0.com/",
  algorithms: ["85256"]
});

app.use(cors());
app.get("/", checkJwt, (req, res) => res.send({ hello: "World!" }));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
