'use client';

import { useEffect, useState } from 'react';
import supabase from '../supabase';

import './page.css';
import Link from 'next/link';

export default function Kota() {
  const [listKota, setListKota] = useState();

  async function getDataKota() {
    let { data: kota, error } = await supabase.from('kota').select('*');

    if (error === null) setListKota(kota);
  }

  async function onDelete() {
    const isConfirm = confirm('Are you sure you want to delete this data?');

    if (isConfirm) {
      // get id from biinding function onDelete
      const id = this;
      const { data, error } = await supabase.from('kota').delete().eq('id', id);

      // update the data after delete
      getDataKota();
    }
  }

  useEffect(() => {
    getDataKota();
  }, []);

  return (
    <main className='main-container'>
      <Link href='/'>Kembali ke halaman sebelumnya &larr;</Link>
      <h1 className='header'>Halaman Kota with supabase!</h1>
      <div className='body'>
        <Link href='/kota/insert' className='btn btn-primary'>
          Insert Data
        </Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nama Kota</th>
              <th>Wilayah</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listKota &&
              listKota.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.nama}</td>
                  <td>{data.tipe}</td>
                  <td>
                    <Link
                      href={{
                        pathname: '/kota/update',
                        query: { id: data.id },
                      }}
                    >
                      <u>Update</u>
                    </Link>
                    |
                    <Link href='javascript:;' onClick={onDelete.bind(data.id)}>
                      <u>Delete</u>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
