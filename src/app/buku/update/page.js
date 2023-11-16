'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Form, Input, Select, notification } from 'antd';
import { useEffect, useState } from 'react';
import supabase from '@/app/supabase';
import { SaveOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function UpdateBuku() {
  const router = useRouter();
  const [listKategoriBuku, setListKategoriBuku] = useState([]);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form] = Form.useForm();

  async function getKategoriBukuData() {
    const { data, error } = await supabase.from('kategori_buku').select('*');

    if (!error) {
      setListKategoriBuku(data);
    }
  }

  async function getData() {
    const { data, error } = await supabase
      .from('buku')
      .select('*')
      .eq('id', id)
      .single();

    if (!error) {
      form.setFieldsValue({
        judul: data.judul,
        kategori_buku: data.buku_id_kategori_buku,
      });
    }
  }

  async function onFinish(values) {
    const { judul, kategori_buku } = values;

    const { data, error } = await supabase
      .from('buku')
      .update({
        judul: judul,
        buku_id_kategori_buku: kategori_buku,
      })
      .eq('id', id);

    if (error) {
      notification.error({ message: error.message, duration: 3 });
    } else {
      notification.success({ message: 'Berhasil ubah data', duration: 3 });
    }

    router.push('/buku/list');
  }

  useEffect(() => {
    getKategoriBukuData();
    getData();
  }, []);

  return (
    <div>
      <h3>Halaman Buku - Insert Data</h3>
      <Form
        name='form_insert'
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
        form={form}
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
