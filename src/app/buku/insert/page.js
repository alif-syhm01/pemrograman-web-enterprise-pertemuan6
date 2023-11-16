'use client';

import supabase from '@/app/supabase';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Option } = Select;

export default function InsertBuku() {
  const router = useRouter();
  const [listKategoriBuku, setListKategoriBuku] = useState([]);

  async function onFinish(values) {
    const { judul, kategori_buku } = values;

    const { data, error } = await supabase.from('buku').insert({
      judul: judul,
      buku_id_kategori_buku: kategori_buku,
    });

    if (error) {
      notification.error({ message: error.message, duration: 3 });
    } else {
      notification.success({ message: 'Berhasil tambah data', duration: 3 });
    }

    router.push('/buku/list');
  }

  async function getKategoriBukuData() {
    const { data, error } = await supabase.from('kategori_buku').select('*');

    if (!error) {
      setListKategoriBuku(data);
    }
  }

  useEffect(() => {
    getKategoriBukuData();
  }, []);

  return (
    <div>
      <h3>Halaman Buku - Insert Data</h3>
      <Form
        name='form_insert'
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label={<label style={{ color: 'white' }}>Judul</label>}
          name='judul'
          rules={[
            {
              required: true,
              message: 'Please input judul!',
            },
          ]}
        >
          <Input placeholder='Masukkan judul...' />
        </Form.Item>
        <Form.Item
          label={<label style={{ color: 'white' }}>Kategori Buku</label>}
          name='kategori_buku'
          rules={[
            { required: true, message: 'Please select the kategori buku!' },
          ]}
        >
          <Select placeholder='Select one of kategori buku' allowClear>
            {listKategoriBuku.map(({ id, nama }) => (
              <Option key={id} value={id}>
                {nama}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          {/* save */}
          <Button type='primary' htmlType='submit' icon={<SaveOutlined />}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
