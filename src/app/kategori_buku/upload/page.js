'use client';

import supabase from '@/app/supabase';
import { Button, Upload, Image, notification, Popconfirm } from 'antd';
import {
  ArrowLeftOutlined,
  UploadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KategoriUpload() {
  const router = useRouter();

  const searchParam = useSearchParams();
  const id = searchParam.get('id');

  const [cover, setCover] = useState(null);

  async function getData() {
    const { data, error } = await supabase
      .from('kategori_buku')
      .select('id, cover')
      .eq('id', id)
      .single();

    setCover(data.cover);
  }

  async function uploadFile(event) {
    const fileIndex = event.fileList.length - 1;
    const fileUpload = event.fileList[fileIndex].originFileObj;

    const fileExt = event.file.type.split('/');
    const fileName = Date.now() + '.' + fileExt[1];

    const filePath = `book_category/${fileName}`;

    const { data, error } = await supabase.storage
      .from('pemrograman_web_enterprise')
      .upload(filePath, fileUpload, { cacheControl: '3600', upsert: false });

    if (error) {
      notification.error({ message: error.message, duration: 3 });
    } else {
      const { data: fileUrl } = supabase.storage
        .from('pemrograman_web_enterprise')
        .getPublicUrl(filePath);

      await supabase
        .from('kategori_buku')
        .update({ cover: fileUrl.publicUrl })
        .eq('id', id);

      setCover(fileUrl.publicUrl);

      notification.success({ message: 'Berhasil upload file', duration: 3 });
    }
  }

  async function onDelete() {
    const fileCover = cover.split('/');
    const fileName = fileCover[9];

    const { data, error } = await supabase.storage
      .from('hmd')
      .remove([`kategori/${fileName}`]);

    if (error) {
      notification.error({ message: error.message, duration: 3 });
    } else {
      //update cover URL = null
      await supabase.from('kategori_buku').update({ cover: null }).eq('id', id);

      //update state cover to hide delete button
      setCover(null);

      notification.success({ message: 'Berhasil hapus data', duration: 3 });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3>Halaman Kategori Buku - Upload Kategori</h3>

      <Button
        type='text'
        style={{ color: 'white' }}
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push('/kategori_buku/list')}
      >
        Back
      </Button>
      <br />
      <br />

      <Upload
        accept='.jpg, .jpeg, .png'
        onChange={uploadFile}
        showUploadList={false}
        beforeUpload={() => false}
      >
        <Button type='primary' icon={<UploadOutlined />}>
          Click to Upload
        </Button>
      </Upload>
      <br />

      {cover && (
        <>
          <Image
            src={cover}
            width={300}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
          <br />

          <Popconfirm
            title='Delete File'
            description='Are you sure to delete this file?'
            onConfirm={onDelete}
            okText='Yes'
            cancelText='No'
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </>
      )}
    </div>
  );
}
