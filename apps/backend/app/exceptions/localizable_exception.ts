import { Exception } from "@adonisjs/core/exceptions";

export default class LocalizableException extends Exception {
    constructor(
        public identifier: string,
        message: string,
        options?: ErrorOptions & { code?: string; status?: number }
    ) {
        super(message, options);
    }
}
