export const generateExploreRoutes = (
    type: string,
    viewMode: string
): string => {
    return `/explore?type=${type}&viewMode=${viewMode}`;
};