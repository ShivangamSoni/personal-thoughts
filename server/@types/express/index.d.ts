import { IUserDocument } from "../../src/models/User";

declare global {
    namespace Express {
        interface Request {
            jwt: JWT | null;
        }
    }
}

interface JWT extends Pick<IUserDocument, "membership" | "admin"> {
    sub: IUserDocument["_id"];
}
