import { merge } from 'lodash';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
import { fNumber } from '../utils/formatNumber';
import { BaseOptionChart } from '../components/charts';
import { useSelector } from 'react-redux';




export default function AnalyticsProfitTime() {

  const salesData = useSelector((state: any) => state.stats);
  const [sales, setSales] = useState<any>([]);
  const [title, setTitle] =  useState<string>('');

  useEffect(()=>{
    const localProducts: string[] = [];
    const revenue : number[] = [];
    const costs : number[] = [];
    const profit : number[] = [];


    salesData?.forEach((sale: any, index: number) =>{

      localProducts.push(sale?.productID?.name);

      if (sale.year === 2022){

        sale.monthlyData.forEach((monthSale: any) => {
          revenue.push(monthSale?.saleStats?.totalSales );
          costs.push(Math.round(monthSale?.saleStats?.totalSales * Math.random()));
          profit.push(Math.round(monthSale?.saleStats?.totalSales  * Math.random()));
        })
      }
     

    })
    setSales([{name: 'Revenue' , data: revenue}, {name: 'Costs' , data: costs}, {name: 'Profit' , data: profit}]);
  },[salesData])


  const chartOptions: any = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
     
    },
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
      bar: { horizontal: false, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
  });


  return (
    <Card>
      <CardHeader title='Revenue, Costs and Profit split' subheader="of last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={sales}  options={chartOptions}  height={364} />
      </Box>
    </Card>
  );
}
