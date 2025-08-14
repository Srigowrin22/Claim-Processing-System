import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const STATUS_COLORS = {
  Approved: "#2e7d32",
  Rejected: "#d32f2f",
  Forwarded: "#ed6c02",
};

export default function CashlessStat() {
  const [stats, setStats] = React.useState([
    { label: "Approved", value: 0, color: STATUS_COLORS.Approved },
    { label: "Rejected", value: 0, color: STATUS_COLORS.Rejected },
    { label: "Forwarded", value: 0, color: STATUS_COLORS.Forwarded },
  ]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchClaims() {
      try {
        const res = await fetch("http://localhost:9090/claims");
        const claims = await res.json();
        // Only cashless claims (hospital_id is NOT null/undefined/empty)
        const cashlessClaims = claims.filter(
          c => c.hospital_id !== null && c.hospital_id !== undefined && c.hospital_id !== ""
        );
        // Count by status
        const statusCount = { Approved: 0, Rejected: 0, Forwarded: 0 };
        cashlessClaims.forEach(c => {
          if (statusCount[c.status] !== undefined) {
            statusCount[c.status]++;
          }
        });
        setStats([
          { label: "Approved", value: statusCount.Approved, color: STATUS_COLORS.Approved },
          { label: "Rejected", value: statusCount.Rejected, color: STATUS_COLORS.Rejected },
          { label: "Forwarded", value: statusCount.Forwarded, color: STATUS_COLORS.Forwarded },
        ]);
      } catch (e) {
        setStats([
          { label: "Approved", value: 0, color: STATUS_COLORS.Approved },
          { label: "Rejected", value: 0, color: STATUS_COLORS.Rejected },
          { label: "Forwarded", value: 0, color: STATUS_COLORS.Forwarded },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchClaims();
  }, []);

  const totalClaims = stats.reduce((sum, stat) => sum + stat.value, 0);
  const statsWithPercent = stats.map(stat => ({
    ...stat,
    percent: totalClaims ? ((stat.value / totalClaims) * 100).toFixed(1) : 0,
  }));

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Cashless Claims Report
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Overview of approved, rejected, and pending cashless claims.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#f8fafb",
          borderRadius: 3,
          boxShadow: 2,
          maxWidth: 420,
          mx: "auto",
          p: { xs: 2, sm: 3 },
        }}
      >
        <PieChart
          series={[
            {
              data: statsWithPercent.map((item, idx) => ({
                id: idx,
                value: item.value,
                label: item.label,
                color: item.color,
              })),
              innerRadius: 40,
              outerRadius: 80,
              paddingAngle: 4,
              cornerRadius: 6,
            },
          ]}
          width={280}
          height={220}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              itemGap: 10,
              labelStyle: { fontSize: 13, fontWeight: 500 },
            },
          }}
        />
        <Box sx={{ mt: 2, width: "100%" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
            Percentage Breakdown
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            {statsWithPercent.map(stat => (
              <Box key={stat.label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    bgcolor: stat.color,
                    mr: 0.7,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: stat.color,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  {stat.label}: {stat.percent}%
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
