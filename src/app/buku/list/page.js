'use client';

import supabase from '@/app/supabase';
import { Button, Popconfirm, Space, Table, notification } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ManyList() {
  const router = useRouter();
  const [listData, setListData] = useState([]);

  async function getData() {
    const { data, error } = await supabase
      .from('buku')
      .select('id, judul, kategori_buku(nama)')
      .order('id', { ascending: true });

    setListData(data);
  }

  async function onDelete() {
    const id = this;
    const { data, error } = await supabase.from('buku').delete().eq('id', id);

    if (error) {
      notification.error({ message: error.message, duration: 3 });
    } else {
      // notif success
      notification.success({ message: 'Berhasil hapus data', duration: 3 });

      // update the data after delete
      getData();
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const tableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Judul',
      dataIndex: 'judul',
      key: 'judul',
    },
    {
      title: 'Nama',
      dataIndex: ['kategori_buku', 'nama'],
      key: 'kategori_buku',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Space size='middle'>
          <Button
            type='default'
            icon={<EditOutlined />}
            onClick={() => router.push(`/buku/update?id=${id}`)}
          ></Button>
          <Popconfirm
            title='Delete Data'
            description='Are you sure want to delete this data?'
            onConfirm={onDelete.bind(id)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='default' icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3>Halaman Buku with supabase!</h3>
      <Button
        type='primary'
        icon={<PlusOutlined />}
        onClick={() => router.push('/buku/insert')}
      >
        Insert
      </Button>
      <Table columns={tableColumn} dataSource={listData} />
    </div>
  );
}
