'use client';

import supabase from '@/app/supabase';
import Link from 'next/link';
import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';

export default function Chart() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data: dataView, error } = await supabase
      .from('kategori_view')
      .select('nama, buku_total');

    // set state chartdata
    setData(dataView);
  };

  // chart config
  const config = {
    appendPadding: 10,
    data,
    angleField: 'buku_total',
    colorField: 'nama',
    radius: 0.9,
    label: {
      text: 'buku_total',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        color: 'white',
        title: true,
        position: 'top',
        rowPadding: 5,
        itemLabelFill: 'white',
      },
    },
  };

  // function init
  useEffect(() => {
    getData();
  }, []);

  // display data
  return (
    <>
      <Link
        href='/buku/list'
        style={{
          textAlign: 'center',
          color: '#04aa6d',
          fontWeight: 'bold',
        }}
      >
        Kembali ke halaman sebelumnya
      </Link>
      <Pie {...config} />
    </>
  );
}
