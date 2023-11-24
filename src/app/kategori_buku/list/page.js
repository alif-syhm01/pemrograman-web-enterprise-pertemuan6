'use client';

import supabase from '@/app/supabase';
import { Button, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KategoriList() {
  const router = useRouter();

  const [listData, setListData] = useState([]);

  async function getData() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id, nama')
      .order('id', { ascending: false });

    setListData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const tableColumn = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Button
          type='default'
          icon={<UploadOutlined />}
          onClick={() => router.push(`/kategori_buku/upload?id=${id}`)}
        >
          Upload
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h3>Halaman Kategori Buku with supabase!</h3>
      <Table columns={tableColumn} dataSource={listData}></Table>
    </div>
  );
}
