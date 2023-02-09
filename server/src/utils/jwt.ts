import { sign } from "jsonwebtoken";

export function issueJwt(id: string) {
    const payload = {
        sub: id,
    };

    return sign(payload, process.env.JWT_KEY!, {
        expiresIn: "2d",
    });
}
