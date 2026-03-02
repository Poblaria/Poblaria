import i18nManager from "@adonisjs/i18n/services/main";

export default class LanguagesController {
    async show() {
        return {
            default: i18nManager.defaultLocale,
            supported: i18nManager.supportedLocales()
        };
    }
}
