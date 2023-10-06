const app = require("./app");

const main = async () => {
  await app.listen(app.get("port"));
  console.log("Port", app.get("port"));
};

main();
