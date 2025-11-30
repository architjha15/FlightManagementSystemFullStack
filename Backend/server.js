const port = 3000;
const userConnection = require("./config/db");

userConnection();
const app = require("./app");

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
