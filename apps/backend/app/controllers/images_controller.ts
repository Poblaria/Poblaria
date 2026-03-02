import { normalize } from "node:path";
import type { HttpContext } from "@adonisjs/core/http";
import { cuid } from "@adonisjs/core/helpers";
import app from "@adonisjs/core/services/app";
import { imageValidator } from "#validators/image";
import ImageDto from "#dto/image";
import { UploadService } from "#services/upload_service";

// TODO: cloud storage (a.g. AWS S3, Cloudinary, etc.)
export default class ImagesController {
    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(imageValidator);

        await data.image.move(app.makePath("storage/uploads"), {
            name: `${cuid()}-${data.image.clientName}`
        });

        return response.created(new ImageDto(data.image.fileName!).toJson());
    }

    async show({ params, response }: HttpContext) {
        const normalizedPath = normalize(params.name);

        if (UploadService.invalidPath(normalizedPath)) return response.badRequest("Malformed path");

        return response.download(app.makePath("storage/uploads", normalizedPath));
    }

    async destroy({ params, response }: HttpContext) {
        try {
            if (!(await UploadService.delete(params.name)))
                return response.badRequest("Malformed path");
        } catch {
            return response.notFound("Image not found");
        }

        return response.noContent();
    }
}
