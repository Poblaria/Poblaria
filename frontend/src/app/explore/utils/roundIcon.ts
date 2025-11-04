import L from "leaflet";

type ExtraColor =
    | "red"
    | "orange"
    | "yellow"
    | "blue"
    | "cyan"
    | "purple"
    | "violet"
    | "green"
    | "darkred"
    | "darkblue"
    | "darkgreen"
    | "darkpurple"
    | "cadetblue"
    | "black";

export function pinIcon({
    icon,
    prefix = "fa",
    color = "blue",
    shape = "circle",
    iconColor = "white"
}: {
    icon: string;
    prefix?: "fa" | "ion";
    color?: ExtraColor;
    shape?: "circle" | "square" | "penta";
    iconColor?: string;
}) {
    return (L as any).ExtraMarkers.icon({
        icon,
        prefix,
        markerColor: color,
        shape,
        iconColor,
        svg: true
    }) as L.Icon;
}
