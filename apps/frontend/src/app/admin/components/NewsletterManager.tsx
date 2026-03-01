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
interface Subscriber {
    email: string;
    name?: string | null;
}

export default function NewsletterManager() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState<{
        type: "success" | "error";
        msg: string;
    } | null>(null);

    const fetchList = async () => {
        try {
            const { data } = await getNewsletterSubscribers();
            // Cast the data to our Subscriber type
            if (data) setSubscribers(data as Subscriber[]);
        } catch (_error) { // Use underscore to indicate it's intentionally ignored
            setSubscribers([]);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            subject: { en: subject },
            content: { en: content }
        };

        const { error } = await sendNewsletter(payload, "en");

        if (error) {
            const msg =
                error.errors
                    ?.map((err) =>
                        err.field ? `${err.field}: ${err.message}` : err.message
                    )
                    .join(" • ") || "Failed to send.";

            setStatus({ type: "error", msg });
            return;
        }

        setStatus({
            type: "success",
            msg: "Newsletter sent to all subscribers!"
        });
        setSubject("");
        setContent("");
    };

    return (
        <Box
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
                    onClick={() => { void fetchList(); }}
                    sx={{ mb: 2, backgroundColor: "#5E7749" }}
                >
                    Load Subscribers
                </Button>
                <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 1, textAlign: "center" }}
                >
                    {subscribers.length} Subscribers Found
                </Typography>
                <List sx={{ maxHeight: 500, overflow: "auto" }}>
                    {subscribers.map((s, i) => (
                        <ListItem key={i} divider>
                            <ListItemText
                                primary={s.email}
                                secondary={s.name || "Anonymous"}
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
                onSubmit={(e) => { void handleSend(e); }}
                sx={{ p: 3, borderRadius: 2 }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Compose Newsletter
                </Typography>
                <TextField
                    fullWidth
                    label="Subject"
                    value={subject}
                    required
                    onChange={(e) => setSubject(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={10}
                    label="Newsletter Content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ mb: 2 }}
                    placeholder="Write your message here..."
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
                    Blast to All Subscribers
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