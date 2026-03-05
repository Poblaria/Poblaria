import { i18n } from "i18next";

export const getSupportedLanguages = (i18n: i18n): string[] => {
    const { supportedLngs, resources } = i18n.options;
    let langs: string[] = [];

    if (Array.isArray(supportedLngs)) {
        langs = supportedLngs.filter((lng): lng is string => typeof lng === "string");
    } else if (typeof supportedLngs === "string") {
        langs = [supportedLngs];
    }

    if (!langs.length && resources && typeof resources === "object") {
        langs = Object.keys(resources as Record<string, unknown>);
    }

    return langs.filter((lng) => lng && lng !== "cimode" && lng !== "dev");
};

export const getLanguageLabel = (t: (key: string, defaultValue?: string) => string, code: string): string => {
    return t(`languages.${code}`, code.toUpperCase());
};