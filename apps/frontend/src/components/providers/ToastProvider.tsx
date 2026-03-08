"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type ToastContextType = {
    showToast: (message: string, severity?: AlertColor) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");
    // Use a key to force Snackbar to restart the timer on new messages
    const [toastKey, setToastKey] = useState(0);

    const showToast = (msg: string, sev: AlertColor = "success") => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
        setToastKey((prev) => prev + 1);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar
                key={toastKey}
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity={severity}
                    variant="filled"
                    sx={{
                        width: "100%",
                        borderRadius: "12px",
                        fontWeight: 600
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error("useToast must be used within a ToastProvider");
    return context;
};
