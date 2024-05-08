import app from "./app";
import { Config } from "./config";

const startServer = () => {
    const PORT = Config.PORT;
    try {
        app.listen(PORT, () => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.log(`listening to the port ${PORT}`);
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            process.exit(1);
        }
    }
};

startServer();
