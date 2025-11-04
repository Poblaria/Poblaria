import L, { type MarkerCluster } from "leaflet";

export const createClusterIcon = (cluster: MarkerCluster) => {
    const count = cluster.getChildCount();

    const size = count < 10 ? 36 : count < 50 ? 44 : 52;
    const bg = count < 10 ? "#4C763B" : count < 50 ? "#97B067" : "#5E7749";

    return L.divIcon({
        html: `
        <div style="
                width:${size}px;height:${size}px;border-radius:50%;
                background:${bg};display:flex;align-items:center;justify-content:center;
                color:#fff;font-weight:700;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,.25);
            ">
                ${count}
            </div>
        `,
        className: "cluster-icon",
        iconSize: [size, size]
    });
};
