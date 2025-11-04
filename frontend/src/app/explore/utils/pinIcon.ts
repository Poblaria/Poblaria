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
    | "black"
    | "white"
    | "orange-dark"
    | "blue-dark"
    | "pink"
    | "green-dark"
    | "green-light"
    | `#${string}`;

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
    return L.ExtraMarkers.icon({
        icon,
        prefix,
        markerColor: color,
        shape,
        iconColor,
        svg: true
    });
}
