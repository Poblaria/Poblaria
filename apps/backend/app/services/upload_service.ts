import { normalize } from "node:path";
import { unlink } from "node:fs/promises";
import app from "@adonisjs/core/services/app";

export class UploadService {
    static PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/;

    static invalidPath(path: string) {
        return this.PATH_TRAVERSAL_REGEX.test(path);
    }

    static async delete(name: string) {
        const normalizedPath = normalize(name);

        if (this.invalidPath(normalizedPath)) return false;

        await unlink(app.makePath("storage/uploads", normalizedPath));

        return true;
    }
}
