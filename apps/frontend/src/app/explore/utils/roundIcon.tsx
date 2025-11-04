import L from "leaflet";

export default function roundIcon(color: string, size: number): L.DivIcon {
    const style = `
    width:${size}px;height:${size}px;border-radius:50%;
    background:${color};
    border:2px solid #fff;
    box-shadow:0 0 0 1px rgba(0,0,0,.25);
  `;
    return L.divIcon({
        className: "poblaria-dot",
        html: `<div style="${style}"></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
    });
}
