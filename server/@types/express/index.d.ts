// import { JWT } from "../../src/middleware/authJWT";
import { IUserDocument } from "../../src/models/User";

declare global {
    namespace Express {
        interface User extends IUserDocument {}

        interface Request {
            user: User | undefined;
        }
    }
}
