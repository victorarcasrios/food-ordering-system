import Uid from "./value-objects/Uid"
import crypto from "crypto"

export default function createUid(): Uid {
    return crypto.randomUUID()
}