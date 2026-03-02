{
    /*
    "use client";

import { useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import type { FeatureCollection, Geometry, Feature } from "geojson";

export type Country = "ES" | "FR";

export type RegionKey =
    // Spain
    | "andalusia"
    | "catalonia"
    | "valencia"
    | "madrid"
    | "galicia"
    // France ( geojson)
    | "auvergne-rhone-alpes"
    | "bourgogne-franche-comte"
    | "brittany"
    | "centre-val-de-loire"
    | "corsica"
    | "grand-est"
    | "hauts-de-france"
    | "paris-region"
    | "normandie"
    | "nouvelle-aquitaine"
    | "occitanie"
    | "pays-de-la-loire"
    | "provence-alpes-cote-dazur";

type RegionDef = {
    key: RegionKey;
    country: Country;
    label: string;
    path: string;
};

//  public/geo/...
const REGIONS: RegionDef[] = [
    // Spain
    {
        key: "andalusia",
        country: "ES",
        label: "Andalusia",
        path: "/geo/es/andalusia.geojson"
    },
    {
        key: "catalonia",
        country: "ES",
        label: "Catalonia",
        path: "/geo/es/catalonia.geojson"
    },
    {
        key: "valencia",
        country: "ES",
        label: "Valencia",
        path: "/geo/es/valencia.geojson"
    },
    {
        key: "madrid",
        country: "ES",
        label: "Madrid Community",
        path: "/geo/es/madrid.geojson"
    },
    {
        key: "galicia",
        country: "ES",
        label: "Galicia",
        path: "/geo/es/galicia.geojson"
    },

    // France
    {
        key: "auvergne-rhone-alpes",
        country: "FR",
        label: "Auvergne-Rhône-Alpes",
        path: "/geo/fr/auvergne-rhone-alpes.geojson"
    },
    {
        key: "bourgogne-franche-comte",
        country: "FR",
        label: "Bourgogne-Franche-Comté",
        path: "/geo/fr/bourgogne-franche-comte.geojson"
    },
    {
        key: "brittany",
        country: "FR",
        label: "Brittany",
        path: "/geo/fr/brittany.geojson"
    },
    {
        key: "centre-val-de-loire",
        country: "FR",
        label: "Centre-Val de Loire",
        path: "/geo/fr/centre-val-de-loire.geojson"
    },
    {
        key: "corsica",
        country: "FR",
        label: "Corsica",
        path: "/geo/fr/corsica.geojson"
    },
    {
        key: "grand-est",
        country: "FR",
        label: "Grand Est",
        path: "/geo/fr/grand-est.geojson"
    },
    {
        key: "hauts-de-france",
        country: "FR",
        label: "Hauts-de-France",
        path: "/geo/fr/hauts-de-france.geojson"
    },
    {
        key: "paris-region",
        country: "FR",
        label: "Paris Region (Île-de-France)",
        path: "/geo/fr/paris-region.geojson"
    },
    {
        key: "normandie",
        country: "FR",
        label: "Normandie",
        path: "/geo/fr/normandie.geojson"
    },
    {
        key: "nouvelle-aquitaine",
        country: "FR",
        label: "Nouvelle-Aquitaine",
        path: "/geo/fr/nouvelle-aquitaine.geojson"
    },
    {
        key: "occitanie",
        country: "FR",
        label: "Occitanie",
        path: "/geo/fr/occitanie.geojson"
    },
    {
        key: "pays-de-la-loire",
        country: "FR",
        label: "Pays de la Loire",
        path: "/geo/fr/pays-de-la-loire.geojson"
    },
    {
        key: "provence-alpes-cote-dazur",
        country: "FR",
        label: "Provence Alpes Côte d’Azur",
        path: "/geo/fr/provence-alpes-cote-dazur.geojson"
    }
];

export default function RegionsLayer({
    country,
    selectedRegion,
    onSelectRegion
}: {
    country: Country;
    selectedRegion: RegionKey | "all";
    onSelectRegion: (region: RegionKey) => void;
}) {
    const [data, setData] = useState<
        Record<string, FeatureCollection<Geometry>>
    >({});

    const visibleRegions = useMemo(() => {
        return REGIONS.filter((r) => r.country === country).filter((r) =>
            selectedRegion === "all" ? true : r.key === selectedRegion
        );
    }, [country, selectedRegion]);

    useEffect(() => {
        const toLoad = visibleRegions.filter((r) => !data[r.key]);
        if (!toLoad.length) return;

        (async () => {
            const loaded = await Promise.all(
                toLoad.map(async (r) => {
                    const res = await fetch(r.path);
                    if (!res.ok) throw new Error(`Failed to load ${r.path}`);
                    const json =
                        (await res.json()) as FeatureCollection<Geometry>;
                    return [r.key, json] as const;
                })
            );

            setData((prev) => {
                const next = { ...prev };
                for (const [k, v] of loaded) next[k] = v;
                return next;
            });
        })().catch(console.error);
    }, [visibleRegions, data]);

    const stroke = country === "ES" ? "#5E7749" : "#2D5B8A";
    const fill = stroke;

    return (
        <>
            {visibleRegions.map((r) => {
                const fc = data[r.key];
                if (!fc) return null;

                const isSelected = selectedRegion === r.key;

                return (
                    <GeoJSON
                        key={r.key}
                        data={fc as any}
                        style={() => ({
                            color: stroke,
                            weight: isSelected ? 3 : 2,
                            fillColor: fill,
                            fillOpacity: isSelected ? 0.35 : 0.18
                        })}
                        onEachFeature={(feature: Feature, layer) => {
                            layer.on({
                                mouseover: (e: any) => {
                                    e.target.setStyle({
                                        weight: 3,
                                        fillOpacity: 0.35
                                    });
                                },
                                mouseout: (e: any) => {
                                    e.target.setStyle({
                                        weight: isSelected ? 3 : 2,
                                        fillOpacity: isSelected ? 0.35 : 0.18
                                    });
                                },
                                click: () => onSelectRegion(r.key)
                            });

                            layer.bindTooltip(r.label, { sticky: true });
                        }}
                    />
                );
            })}
        </>
    );
}
*/
}
