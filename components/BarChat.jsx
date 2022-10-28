import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import tw from 'twin.macro'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const BarChat = ({ title, categories }) => {
  const [data, setData] = React.useState({
    series: [
      {
        name: 'Amount',
        data: [85, 45, 67, 60, 38, 93, 60, 66],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
        // height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '35%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: 'Volume of Transaction',
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ['#6601DF'],
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands'
          },
        },
      },
    },
  })

  return (
    <div tw="border border-[#EBF2FA] rounded-lg p-4 mt-10 lg:(p-6 rounded-xl)">
      <h4 tw="font-semibold text-2xl tracking-[-1px] mt-1.5">{title}</h4>

      <div id="chart" tw="mt-10">
        <Chart
          options={data.options}
          series={data.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  )
}

export default BarChat
