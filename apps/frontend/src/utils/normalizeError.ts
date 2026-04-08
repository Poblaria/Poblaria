export const normalizeError = (backendError: string): string => {
    const errorMap: Record<string, string> = {
        "Invalid email or password": "invalidCredentials",
        "User not found": "invalidCredentials",
        "Account locked": "accountLocked"
    };

    return errorMap[backendError] || "generic";
};
