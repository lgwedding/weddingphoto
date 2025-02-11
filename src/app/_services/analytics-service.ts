interface AnalyticsData {
  pageViews: number;
  visitors: number;
  bounceRate: number;
  avgSessionDuration: number;
}

interface TimeSeriesData {
  timestamp: number;
  value: number;
}

export const analyticsService = () => {
  const fetchAnalytics = async (): Promise<AnalyticsData> => {
    //const response = await fetch(
    //  `https://api.vercel.com/v6/projects/${env.VERCEL_PROJECT_ID}/analytics`,
    //  {
    //    headers: {
    //      Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
    //    },
    //  }
    //);

    //if (!response.ok) {
    //  throw new Error("Failed to fetch analytics data");
    //}

    //const data = await response.json();
    return {
      pageViews: 0,
      visitors: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
    };
  };

  const fetchTimeSeriesData = async (): Promise<TimeSeriesData[]> => {
    //const response = await fetch(
    //  `https://api.vercel.com/v6/projects/${env.VERCEL_PROJECT_ID}/analytics/time-series`,
    //  {
    //    headers: {
    //      Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
    //    },
    //  }
    //);

    //if (!response.ok) {
    //  throw new Error("Failed to fetch time series data");
    //}

    //const data = await response.json();
    return [];
  };

  return { fetchAnalytics, fetchTimeSeriesData };
};
