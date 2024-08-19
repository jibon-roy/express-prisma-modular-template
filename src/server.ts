import app from "./app";
import config from "./app/config";

main().catch((err) => console.log(err));

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
