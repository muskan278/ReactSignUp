const express = require("express");
const http = require("http");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const PORT = process.env.PORT || 3001;

const fs = require("fs");
const users = require("./users");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public")));

app.post(
  "/register",
  [
    check(
      "username",
      "Username length should be 10 to 20 characters."
    ).isLength({ min: 10, max: 20 }),
    check("email", "Email id is not valid.")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("password", "Password length should be 8 to 10 characters.").isLength(
      {
        min: 8,
        max: 10,
      }
    ),
  ],
  async (req, res) => {
    console.log("register", req.body);
    const errors = validationResult(req);
    let array = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((e) => array.push(e.msg));

      res.json({ message: array });
    } else {
      try {
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
          let hashPassword = await bcrypt.hash(req.body.password, 10);

          let newUser = {
            id: Date.now(),
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
          };
          users.push(newUser);
          console.log("User list", users);
          fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) throw err;
          });
          res.json({ message: "Registration successful" });
        } else {
          res.json({ message: "Email id already registered" });
        }
      } catch {
        res.json({ message: " Internal server error" });
      }
    }
  }
);

app.post(
  "/verify",
  [
    check("email", "Email id is not valid.")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let array = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((e) => array.push(e.msg));
      res.json({ message: array });
    } else {
      try {
        let foundUser = users.find((data) => req.body.email === data.email);
        console.log("Verify", req.body);

        if (foundUser) {
          res.json({
            message: "Email id is already registered. You are a valid user.",
          });
        } else {
          res.json({ message: "Email id is not registered." });
        }
      } catch {
        res.json({ message: "Internal server error" });
      }
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
