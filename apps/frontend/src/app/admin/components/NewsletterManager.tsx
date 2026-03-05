"use client";

import { useState } from "react";
import {
    Box,
    Paper,
    TextField,
    Button,
    Alert,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import { getNewsletterSubscribers } from "@/app/actions/newsletter/getNewsletterSubscribers";
import { sendNewsletter } from "@/app/actions/newsletter/sendNewsletter";
import { useTranslation } from "react-i18next";

type Subscriber = {
    email: string;
    name?: string | null;
};

export default function NewsletterManager() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState<{
        type: "success" | "error";
        msg: string;
    } | null>(null);

    // Destructure i18n to track the current language state
    const { t, i18n } = useTranslation();

    const fetchList = async () => {
        try {
            const { data } = await getNewsletterSubscribers();
            if (data) setSubscribers(data as Subscriber[]);
        } catch {
            setSubscribers([]);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        // Providing both keys ensures the backend validation passes
        // while respecting the current language.
        const payload = {
            subject: {
                en: subject,
                [i18n.language]: subject
            },
            content: {
                en: content,
                [i18n.language]: content
            }
        };

        const { error } = await sendNewsletter(payload, "en");

        if (error) {
            const msg =
                error.errors
                    ?.map((err) =>
                        err.field ? `${err.field}: ${err.message}` : err.message
                    )
                    .join(" • ") || t("newsletter.error.generic");

            setStatus({ type: "error", msg });
            return;
        }

        setStatus({
            type: "success",
            msg: t("newsletter.success")
        });
        setSubject("");
        setContent("");
    };

    return (
        <Box
            key={i18n.language}
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
                gap: 3
            }}
        >
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        void fetchList();
                    }}
                    sx={{ mb: 2, backgroundColor: "#5E7749" }}
                >
                    {t("admin.newsletter.load_btn", "Load Subscribers")}
                </Button>
                <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 1, textAlign: "center" }}
                >
                    {subscribers.length}{" "}
                    {t("admin.newsletter.found", "Subscribers Found")}
                </Typography>
                <List sx={{ maxHeight: 500, overflow: "auto" }}>
                    {subscribers.map((s, i) => (
                        <ListItem key={i} divider>
                            <ListItemText
                                primary={s.email}
                                secondary={
                                    s.name || t("newsletter.defaultName")
                                }
                                primaryTypographyProps={{
                                    fontSize: "0.875rem"
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Paper
                variant="outlined"
                component="form"
                onSubmit={(e) => {
                    void handleSend(e);
                }}
                sx={{ p: 3, borderRadius: 2 }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {t("admin.titles.newsletter")}
                </Typography>
                <TextField
                    fullWidth
                    label={t("newsletter.placeholder.subject", "Subject")}
                    value={subject}
                    required
                    onChange={(e) => setSubject(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={10}
                    label={t(
                        "admin.newsletter.content_label",
                        "Newsletter Content"
                    )}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ mb: 2 }}
                    placeholder={t(
                        "admin.newsletter.content_placeholder",
                        "Write your message here..."
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!subject || !content}
                    sx={{
                        "backgroundColor": "#5E7749",
                        "&:hover": { backgroundColor: "#4A5E3A" }
                    }}
                >
                    {t("admin.newsletter.send_btn", "Blast to All Subscribers")}
                </Button>
                {status && (
                    <Alert severity={status.type} sx={{ mt: 2 }}>
                        {status.msg}
                    </Alert>
                )}
            </Paper>
        </Box>
    );
}
