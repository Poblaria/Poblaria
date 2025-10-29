import L from "leaflet";

export const createClusterIcon = (cluster: any) => {
    const count = cluster.getChildCount() as number;

    const size = count < 10 ? 36 : count < 50 ? 44 : 52;
    const bg = count < 10 ? "#1434A4" : count < 50 ? "#F39C12" : "#D22B2B";

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
