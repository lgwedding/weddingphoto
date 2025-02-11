"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useFirebaseAuthService } from "@/app/_services/firebase-auth-service";
import { useRouter } from "next/navigation";
import StatCard from "@/app/_components/dashboard/StatCard";
import {
  MdAttachMoney,
  MdPeople,
  MdShoppingCart,
  MdTrendingUp,
} from "react-icons/md";
import { ApexOptions } from "apexcharts";
import AdminLayout from "@/app/_components/admin/AdminLayout";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const dummyData = {
  revenue: "$24,165",
  users: "432,168",
  orders: "1,234",
  growth: "+42%",
  categoryData: [
    { name: "Electronics", value: 22 },
    { name: "Apparel", value: 37 },
    { name: "Healthcare", value: 18 },
    { name: "Pet Supplies", value: 38 },
    { name: "Tableware", value: 30 },
  ],
  monthlyData: Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 100)
  ),
};

const pieChartOptions: ApexOptions = {
  chart: { type: "donut" },
  labels: dummyData.categoryData.map((item) => item.name),
  colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"],
  legend: { position: "bottom" },
};

const lineChartOptions: ApexOptions = {
  chart: {
    type: "area",
    toolbar: { show: false },
  },
  stroke: { curve: "smooth", width: 2 },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { getCurrentUser } = useFirebaseAuthService();

  useEffect(() => {
    const initDashboard = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setLoading(false);
    };

    initDashboard();
  }, [getCurrentUser, router]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value={dummyData.revenue}
              subtitle="24 Hours"
              icon={<MdAttachMoney size={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={dummyData.users}
              subtitle="24 Hours"
              icon={<MdPeople size={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Orders"
              value={dummyData.orders}
              subtitle="24 Hours"
              icon={<MdShoppingCart size={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Growth Rate"
              value={dummyData.growth}
              subtitle="vs last month"
              icon={<MdTrendingUp size={24} />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 3, bgcolor: "white" }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Category Wise Breakup
              </Typography>
              <Chart
                options={pieChartOptions}
                series={dummyData.categoryData.map((item) => item.value)}
                type="donut"
                height={350}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 3, bgcolor: "white" }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Monthly Trends
              </Typography>
              <Chart
                options={lineChartOptions}
                series={[{ name: "Sales", data: dummyData.monthlyData }]}
                type="area"
                height={350}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
}
