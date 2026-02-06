"use client";

import { useMemo, useState } from "react";
import { Box, Button, Divider, Paper, Stack, Typography, Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import PostTypeDialog from "@/components/admin/PostTypeDialog";

type MiniPost = { id: number; title: string; createdAt: string };
type Filter = "All" | "Properties" | "Jobs";

const colors = {
  primary: "#5E7749",
  bg: "#EEF1EA",
};

export default function AdminPage() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const router = useRouter();

  // TODO: replace with backend results
  const housing: MiniPost[] = [
    { id: 1, title: "Cozy Studio in Braga", createdAt: "2026-02-06" },
    { id: 2, title: "T2 near University", createdAt: "2026-02-05" },
  ];

  const jobs: MiniPost[] = [
    { id: 10, title: "Barista (Part-time)", createdAt: "2026-02-06" },
    { id: 11, title: "Construction Helper", createdAt: "2026-02-04" },
  ];

  const showHousing = useMemo(() => filter === "All" || filter === "Properties", [filter]);
  const showJobs = useMemo(() => filter === "All" || filter === "Jobs", [filter]);

  const chipSx = (active: boolean) => ({
    mr: 1,
    fontWeight: 900,
    cursor: "pointer",
    borderRadius: 999,
    px: 1,
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
    bgcolor: active ? colors.primary : "transparent",
    color: active ? "#fff" : colors.primary,
    borderColor: active ? colors.primary : "rgba(94,119,73,0.35)",
    "&:hover": {
      bgcolor: active ? colors.primary : "rgba(94,119,73,0.10)",
    },
  });

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography sx={{ opacity: 0.7 }}>Create and manage your published posts.</Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: colors.primary,
            borderRadius: 3,
            px: 3,
            py: 1.4,
            fontWeight: 900,
            "&:hover": { bgcolor: "#4F673D" },
          }}
        >
          + Create Post
        </Button>
      </Stack>

      {/* Chip Filter Bar */}
      <Paper elevation={0} sx={{ p: 1.5, borderRadius: 4, mb: 3, bgcolor: "#fff" }}>
        <Stack direction="row" alignItems="center" sx={{ flexWrap: "wrap" }}>
          {(["All", "Properties", "Jobs"] as const).map((c) => {
            const active = filter === c;
            return (
              <Chip
                key={c}
                label={c}
                variant={active ? "filled" : "outlined"}
                onClick={() => setFilter(c)}
                sx={chipSx(active)}
              />
            );
          })}
        </Stack>
      </Paper>

      {/* Content */}
      <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
        {/* Housing */}
        {showHousing && (
          <Paper elevation={0} sx={{ flex: 1, p: 3, borderRadius: 4 }}>
            <Typography sx={{ fontWeight: 900, mb: 1.5 }}>Your Housing Posts</Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              {housing.map((p) => (
                <Paper
                  key={p.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "0.15s",
                    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(0,0,0,0.06)" },
                  }}
                  onClick={() => router.push(`/admin/housing/${p.id}`)}
                >
                  <Typography sx={{ fontWeight: 800 }}>{p.title}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.6 }}>
                    Created: {p.createdAt}
                  </Typography>
                </Paper>
              ))}

              {housing.length === 0 && <Typography sx={{ opacity: 0.7 }}>No housing posts yet.</Typography>}

              <Button
                variant="text"
                onClick={() => router.push("/admin/housing")}
                sx={{ alignSelf: "flex-start", fontWeight: 900 }}
              >
                View all housing →
              </Button>
            </Stack>
          </Paper>
        )}

        {/* Jobs */}
        {showJobs && (
          <Paper elevation={0} sx={{ flex: 1, p: 3, borderRadius: 4 }}>
            <Typography sx={{ fontWeight: 900, mb: 1.5 }}>Your Job Posts</Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              {jobs.map((p) => (
                <Paper
                  key={p.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "0.15s",
                    "&:hover": { transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(0,0,0,0.06)" },
                  }}
                  onClick={() => router.push(`/admin/jobs/${p.id}`)}
                >
                  <Typography sx={{ fontWeight: 800 }}>{p.title}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.6 }}>
                    Created: {p.createdAt}
                  </Typography>
                </Paper>
              ))}

              {jobs.length === 0 && <Typography sx={{ opacity: 0.7 }}>No job posts yet.</Typography>}

              <Button
                variant="text"
                onClick={() => router.push("/admin/jobs")}
                sx={{ alignSelf: "flex-start", fontWeight: 900 }}
              >
                View all jobs →
              </Button>
            </Stack>
          </Paper>
        )}
      </Stack>

      {/* Modal */}
      <PostTypeDialog
        open={open}
        onClose={() => setOpen(false)}
        onNext={(type) => {
          setOpen(false);
          if (type === "property") router.push("/admin/housing/new");
          if (type === "job") router.push("/admin/jobs/new");
        }}
      />
    </Box>
  );
}