"use client";

import { useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import type {
    Feature,
    FeatureCollection,
    GeoJsonObject,
    GeoJsonProperties,
    Geometry
} from "geojson";
import type {
    LeafletEvent,
    Layer,
    LeafletMouseEvent,
    PathOptions
} from "leaflet";

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

type NutsProps = GeoJsonProperties & {
    CNTR_CODE: Country;
    LEVL_CODE: number;
    NAME_LATN: string;
    NUTS_ID?: string;
    NUTS_NAME?: string;
};

type NutsFeature = Feature<Geometry, NutsProps>;
type NutsFC = FeatureCollection<Geometry, NutsProps>;

function regionStyle(stroke: string, isSelected: boolean): PathOptions {
    return {
        color: stroke,
        weight: isSelected ? 4 : 2,
        fillColor: stroke,
        fillOpacity: isSelected ? 0.35 : 0.18
    };
}

function hoverStyle(): PathOptions {
    return {
        weight: 4,
        fillOpacity: 0.3
    };
}

function setLayerStyle(layer: Layer, style: PathOptions) {
    const maybePath = layer as unknown as {
        setStyle?: (s: PathOptions) => void;
    };
    if (typeof maybePath.setStyle === "function") {
        maybePath.setStyle(style);
    }
}

export default function NutsRegionsLayer({
    country,
    selectedName,
    onSelectName
}: {
    country: Country;
    selectedName: string | null;
    onSelectName: (name: string) => void;
}) {
    const [fc, setFc] = useState<NutsFC | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(NUTS_PATH);
            if (!res.ok) return;
            const json = (await res.json()) as GeoJsonObject;
            if (json.type !== "FeatureCollection") return;
            setFc(json as NutsFC);
        })();
    }, []);

    const filtered: NutsFC | null = useMemo(() => {
        if (!fc) return null;

        const allowedNames = country === "ES" ? SPAIN : FRANCE;

        const features = (fc.features as NutsFeature[]).filter((f) => {
            const p = f.properties;
            return (
                p.LEVL_CODE === 2 &&
                p.CNTR_CODE === country &&
                allowedNames.has(p.NAME_LATN)
            );
        });

        return { ...fc, features };
    }, [fc, country]);

    if (!filtered) return null;

    const stroke = country === "ES" ? "#5E7749" : "#2D5B8A";

    return (
        <GeoJSON
            key={`${country}-${selectedName ?? "none"}`}
            data={filtered}
            style={(feature?: NutsFeature) => {
                const name = feature?.properties.NAME_LATN;
                const isSelected = !!name && selectedName === name;
                return regionStyle(stroke, isSelected);
            }}
            onEachFeature={(feature: NutsFeature, layer: Layer) => {
                const name = feature.properties.NAME_LATN;

                const maybeTooltip = layer as unknown as {
                    bindTooltip?: (
                        content: string,
                        options?: { sticky?: boolean }
                    ) => void;
                };
                if (typeof maybeTooltip.bindTooltip === "function") {
                    maybeTooltip.bindTooltip(name, { sticky: true });
                }

                const maybeOn = layer as unknown as {
                    on?: (
                        handlers: Record<string, (e: LeafletEvent) => void>
                    ) => void;
                };
                if (typeof maybeOn.on !== "function") return;

                maybeOn.on({
                    mouseover: (e: LeafletEvent) => {
                        const evt = e as LeafletMouseEvent;
                        setLayerStyle(
                            evt.target as unknown as Layer,
                            hoverStyle()
                        );
                    },
                    mouseout: (e: LeafletEvent) => {
                        const evt = e as LeafletMouseEvent;
                        const isSelected = selectedName === name;
                        setLayerStyle(
                            evt.target as unknown as Layer,
                            regionStyle(stroke, isSelected)
                        );
                    },
                    click: () => onSelectName(name)
                });
            }}
        />
    );
}
