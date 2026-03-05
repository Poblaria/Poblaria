"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    Typography,
    Paper,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    IconButton,
    Alert,
    Snackbar
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { BarChart } from "@mui/x-charts/BarChart";
import { StatCard } from "@/app/admin/components/StatCard";
import getStatistics, {
    StatisticsResponse
} from "@/app/actions/statistics/getStatistics";

const BRAND_GREEN = "#5E7749";

export default function StatisticsPage() {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState<StatisticsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>("");

    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({ open: false, message: "", severity: "success" });

    const fetchData = useCallback(
        async (isManual = false) => {
            setLoading(true);
            try {
                const response = await getStatistics();
                if (response.data) {
                    setData(response.data);
                    setLastUpdated(new Date().toLocaleTimeString());
                    if (isManual) {
                        setNotification({
                            open: true,
                            message: t("admin.newsletter.success", "Updated!"),
                            severity: "success"
                        });
                    }
                }
            } catch {
                setNotification({
                    open: true,
                    message: t("newsletter.error.generic"),
                    severity: "error"
                });
            } finally {
                setLoading(false);
            }
        },
        [t]
    );

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const totals = useMemo(() => {
        if (!data) return { users: 0, newUsers: 0 };
        return {
            users:
                data.users.default.total +
                data.users.localAuthorities.total +
                data.users.administrators.total,
            newUsers:
                data.users.default.new.current +
                data.users.localAuthorities.new.current +
                data.users.administrators.new.current
        };
    }, [data]);

    const isFirstLoad = loading && !data;

    return (
        <Box
            key={i18n.language}
            sx={{ p: { xs: 2, md: 5 }, bgcolor: "#F9FAFB" }}
        >
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={() =>
                    setNotification({ ...notification, open: false })
                }
            >
                <Alert severity={notification.severity} variant="filled">
                    {notification.message}
                </Alert>
            </Snackbar>

            {/* Header */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
            >
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        {t("admin.tabs.statistics")}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: "#9CA3AF", fontWeight: 600 }}
                    >
                        {lastUpdated}
                    </Typography>
                </Box>
                <IconButton
                    onClick={() => {
                        void fetchData(true);
                    }}
                    disabled={loading}
                    sx={{ bgcolor: "white", border: "1px solid #E5E7EB" }}
                >
                    <RefreshIcon
                        sx={{
                            color: BRAND_GREEN,
                            animation: loading
                                ? "spin 1s linear infinite"
                                : "none"
                        }}
                    />
                </IconButton>
            </Stack>

            {/* Cards */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "repeat(4, 1fr)"
                    },
                    gap: 3,
                    mb: 6
                }}
            >
                <StatCard
                    loading={isFirstLoad}
                    title={t("navbar.housing")}
                    total={data?.housings.total || 0}
                    newItems={data?.housings.new.current || 0}
                />
                <StatCard
                    loading={isFirstLoad}
                    title={t("navbar.jobs")}
                    total={data?.jobs.total || 0}
                    newItems={data?.jobs.new.current || 0}
                />
                <StatCard
                    loading={isFirstLoad}
                    title={t("navbar.profile")}
                    total={totals.users}
                    newItems={totals.newUsers}
                />
                <StatCard
                    loading={isFirstLoad}
                    title={t("footer.title")}
                    total={data?.newsletter.subscribers.total || 0}
                    newItems={data?.newsletter.subscribers.new.current || 0}
                />
            </Box>

            {/* Chart */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid #E5E7EB",
                    mb: 6
                }}
            >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                    {t("admin.titles.statistics")}
                </Typography>
                <Box sx={{ width: "100%", height: 350 }}>
                    {!isFirstLoad && (
                        <BarChart
                            xAxis={[
                                {
                                    scaleType: "band",
                                    data: [
                                        t("navbar.housing"),
                                        t("navbar.jobs"),
                                        t("navbar.profile"),
                                        t("footer.title")
                                    ]
                                }
                            ]}
                            series={[
                                {
                                    data: [
                                        data?.housings.total || 0,
                                        data?.jobs.total || 0,
                                        totals.users,
                                        data?.newsletter.subscribers.total || 0
                                    ],
                                    color: BRAND_GREEN
                                }
                            ]}
                            height={300}
                        />
                    )}
                </Box>
            </Paper>

            {/* Table */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                {t("admin.titles.statistics")} - {t("navbar.profile")}
            </Typography>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{ borderRadius: 4, border: "1px solid #E5E7EB" }}
            >
                <Table>
                    <TableHead sx={{ bgcolor: "#F9FAFB" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>
                                {t("admin.tabs.statistics")}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                                Total
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>
                                New
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            [
                                {
                                    name: t("home.hero.title"),
                                    stats: data.users.default
                                },
                                {
                                    name: t("footer.link.organizations"),
                                    stats: data.users.localAuthorities
                                },
                                {
                                    name: t("navbar.profile"),
                                    stats: data.users.administrators
                                }
                            ].map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.stats.total}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            color: BRAND_GREEN,
                                            fontWeight: 700
                                        }}
                                    >
                                        +{row.stats.new.current}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
