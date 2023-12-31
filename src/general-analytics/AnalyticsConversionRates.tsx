import { merge } from 'lodash';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
import { fNumber } from '../utils/formatNumber';
import { BaseOptionChart } from '../components/charts';
import { useSelector } from 'react-redux';

// utils
//

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470] }];

export default function AnalyticsConversionRates() {

  const salesData = useSelector((state: any) => state.stats);
  const [sales, setSales] = useState<any>([]);
  const [products, setProducts] = useState<string[]>([]);

  useEffect(()=>{
    const localProducts: string[] = [];
    const yearlySales : number[] = [];
    salesData?.forEach((sale: any, index: number) =>{

      localProducts.push(sale?.productID?.name);
      yearlySales.push(sale?.yearlySalesTotal);
    })
    setProducts(localProducts);
    setSales([{data: yearlySales}]);

  },[salesData])

  console.log(sales, CHART_DATA);

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
      categories: products,
    }
  });


  return (
    <Card>
      <CardHeader title="Top 3 Selling products" subheader="(+43%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={sales}  options={chartOptions}  height={364} />
      </Box>
    </Card>
  );
}
