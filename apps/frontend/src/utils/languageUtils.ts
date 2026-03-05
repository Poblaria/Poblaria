import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useSupportedLanguages = () => {
    const { i18n } = useTranslation();

    return useMemo<string[]>(() => {
        const { supportedLngs, resources } = i18n.options;
        let langs: string[] = [];

        if (Array.isArray(supportedLngs)) {
            langs = supportedLngs.filter(
                (lng): lng is string => typeof lng === "string"
            );
        } else if (typeof supportedLngs === "string") {
            langs = [supportedLngs];
        }

        if (!langs.length && resources && typeof resources === "object") {
            langs = Object.keys(resources as Record<string, unknown>);
        }

        return langs.filter((lng) => lng && lng !== "cimode" && lng !== "dev");
    }, [i18n.options]);
};

export default useSupportedLanguages;
