require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.argv[2] || process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
