import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
import { fNumber } from '../utils/formatNumber';
import { BaseOptionChart } from '../components/charts';

// utils
//

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470] }];

export default function AnalyticsConversionRates() {
  const chartOptions: any = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName: any) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        `Watches`,
        'Baskets',
        'Wardrobe',
        'Ben 10 Box',
      ]
    }
  });


  return (
    <Card>
      <CardHeader title="Top 3 Selling products" subheader="(+43%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA}  options={chartOptions}  height={364} />
      </Box>
    </Card>
  );
}