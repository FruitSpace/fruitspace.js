import { GhostClient } from "./ghostcore/client";
import { createHash } from 'crypto'; // Corrected import
import { Users } from "./ghostcore/users";

function DoGjp2(password: string): string {
    const secret = "mI29fmAnxgTs";
    const combined = password + secret;
    const hash = createHash('sha1'); // Use createHash directly
    hash.update(combined);
    return hash.digest('hex');
}



export { GhostClient };
