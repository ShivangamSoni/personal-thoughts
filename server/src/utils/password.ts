import { pbkdf2Sync, randomBytes, randomInt } from "node:crypto";

export function validatePassword(password: string, salt: string, hash: string) {
    const hashVerify = generateHash(password, salt);
    return hash === hashVerify;
}

export function hashPassword(password: string) {
    const salt = randomBytes(32).toString("hex");
    const hash = generateHash(password, salt);
    return { salt, hash };
}

function generateHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
}
