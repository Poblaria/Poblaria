"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";

type ConfirmOptions = { title: string; message: string; isDanger?: boolean };
type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const { t } = useTranslation();
    const [state, setState] = useState<{
        resolve: (v: boolean) => void;
        options: ConfirmOptions;
    } | null>(null);

    // Refuse new confirms if one is pending to prevent Promise loss
    const confirm = (options: ConfirmOptions) => {
        if (state !== null) {
            return Promise.resolve(false);
        }
        return new Promise<boolean>((resolve) =>
            setState({ resolve, options })
        );
    };

    const handleClose = (value: boolean) => {
        state?.resolve(value);
        setState(null);
    };

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}
            {state && (
                <Dialog
                    open={!!state}
                    onClose={() => handleClose(false)}
                    PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
                >
                    <DialogTitle sx={{ fontWeight: 800 }}>
                        {state.options.title}
                    </DialogTitle>
                    <DialogContent>
                        <Typography sx={{ color: "#6B7280" }}>
                            {state.options.message}
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <Button
                            onClick={() => handleClose(false)}
                            sx={{ color: "#6B7280", fontWeight: 700 }}
                        >
                            {t("common.cancel", "Cancel")}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleClose(true)}
                            sx={{
                                bgcolor: state.options.isDanger
                                    ? "#DC2626"
                                    : "#5E7749",
                                borderRadius: "10px",
                                px: 3
                            }}
                        >
                            {t("common.confirm", "Confirm")}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context)
        throw new Error("useConfirm must be used within ConfirmProvider");
    return context;
};
