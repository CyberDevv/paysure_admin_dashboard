import dynamic from 'next/dynamic'
import { useState } from 'react'
import tw from 'twin.macro'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Graph = ({ label }) => {
  const [data, setData] = useState({
    series: [
      {
        name: label,
        data: [50, 150, 400, 300, 350],
      },
    ],
    options: {
      chart: {
        // height: 4,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      yaxis: {
        tickAmount: 4,
        min: 0,
        max: 400,
      },
      colors: ['#6601DF'],
      legend: {
        fontSize: '12px',
        markers: {
          width: 8,
          height: 8,
        },
      },
      //  responsive: [
      //     {
      //        breakpoint: 1000,
      //        options: {
      //           plotOptions: {
      //              bar: {
      //                 horizontal: false,
      //              },
      //           },
      //           legend: {
      //              position: 'bottom',
      //           },
      //        },
      //     },
      //  ],
    },
  })

  return (
    <div id="chart" tw="mt-10">
      <Chart
        options={data.options}
        series={data.series}
        type="area"
        // height={250}
      />
    </div>
  )

  // const domContainer = document.querySelector('#app');
  // ReactDOM.render(React.createElement(ApexChart), domContainer);
}

export default Graph