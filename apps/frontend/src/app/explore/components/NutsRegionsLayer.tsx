"use client";

import { useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import type { FeatureCollection, Geometry, Feature } from "geojson";

export type Country = "ES" | "FR";

const NUTS_PATH = "/geo/nuts/NUTS_RG_01M_2024_4326_LEVL_2.geojson";
const SPAIN = new Set([
    "Andalucía",
    "Cataluña",
    "Comunitat Valenciana",
    "Comunidad de Madrid",
    "Galicia"
]);

const FRANCE = new Set([
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
    "Provence-Alpes-Côte d’Azur",
    "Provence-Alpes-Côte d'Azur"
]);

export default function NutsRegionsLayer({
    country,
    selectedName,
    onSelectName
}: {
    country: Country;
    selectedName: string | null;
    onSelectName: (name: string) => void;
}) {
    const [fc, setFc] = useState<FeatureCollection<Geometry> | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(NUTS_PATH);
            if (!res.ok) throw new Error(`Failed to load ${NUTS_PATH}`);
            const json = (await res.json()) as FeatureCollection<Geometry>;
            setFc(json);
        })().catch(console.error);
    }, []);

    const filtered = useMemo(() => {
        if (!fc) return null;

        const allowedNames = country === "ES" ? SPAIN : FRANCE;

        const features = (fc.features as any[]).filter((f) => {
            const p = f.properties || {};
            return (
                p.LEVL_CODE === 2 &&
                p.CNTR_CODE === country &&
                allowedNames.has(p.NAME_LATN)
            );
        });

        return { ...fc, features } as FeatureCollection<Geometry>;
    }, [fc, country]);

    if (!filtered) return null;

    const stroke = country === "ES" ? "#5E7749" : "#2D5B8A";

    return (
        <GeoJSON
            key={`${country}-${selectedName ?? "none"}`}
            data={filtered as any}
            style={(feature: any) => {
                const name = feature?.properties?.NAME_LATN as string;
                const isSelected = selectedName === name;

                return {
                    color: stroke,
                    weight: isSelected ? 4 : 2,
                    fillColor: stroke,
                    fillOpacity: isSelected ? 0.35 : 0.18
                };
            }}
            onEachFeature={(feature: Feature, layer) => {
                const props: any = (feature as any).properties || {};
                const name = props.NAME_LATN as string;

                layer.bindTooltip(name, { sticky: true });

                layer.on({
                    mouseover: (e: any) =>
                        e.target.setStyle({ weight: 4, fillOpacity: 0.3 }),
                    mouseout: (e: any) => {
                        const isSelected = selectedName === name;
                        e.target.setStyle({
                            weight: isSelected ? 4 : 2,
                            fillOpacity: isSelected ? 0.35 : 0.18
                        });
                    },
                    click: () => onSelectName(name)
                });
            }}
        />
    );
}
