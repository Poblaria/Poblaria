import L, { type MarkerCluster } from "leaflet";

export const createClusterIcon = (cluster: MarkerCluster) => {
    const count = cluster.getChildCount();

    // Determine the size of the cluster icon based on the number of markers
    const sizeClass = count < 10 ? "w-9 h-9" : count < 50 ? "w-11 h-11" : "w-13 h-13";

    // Use custom classes for background colors
    const bgClass = count < 10 ? "cluster-small" : count < 50 ? "cluster-medium" : "cluster-large";

    return L.divIcon({
        html: `
        <div class="
                ${sizeClass} ${bgClass} rounded-full flex items-center justify-center
                text-white font-bold text-sm shadow-md
            ">
                ${count}
            </div>
        `,
        className: "cluster-icon",
        iconSize: [0, 0]
    });
};