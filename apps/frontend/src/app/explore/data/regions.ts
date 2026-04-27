export type Country = "ES" | "FR";

export const REGIONS: Record<Country, string[]> = {
    ES: [
        "Andalucía",
        "Cataluña",
        "Comunitat Valenciana",
        "Comunidad de Madrid",
        "Galicia"
    ],
    FR: [
        "Auvergne-Rhône-Alpes",
        "Bourgogne-Franche-Comté",
        "Bretagne",
        "Centre-Val de Loire",
        "Corse",
        "Grand Est",
        "Hauts-de-France",
        "Île-de-France",
        "Normandie",
        "Nouvelle-Aquitaine",
        "Occitanie",
        "Pays de la Loire",
        "Provence-Alpes-Côte d'Azur"
    ]
};

export function getCountryForRegion(region: string): Country | null {
    for (const [country, regions] of Object.entries(REGIONS)) {
        if (regions.includes(region)) return country as Country;
    }
    return null;
}