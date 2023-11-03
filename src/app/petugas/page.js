'use client';

import Link from 'next/link';
import './page.css';
import { useEffect, useState } from 'react';
import supabase from '../supabase';

export default function Petugas() {
  const [listPetugas, setListPetugas] = useState();

  async function getDataPetugas() {
    let { data: petugas, error } = await supabase.from('petugas').select('*');

    if (error === null) setListPetugas(petugas);
  }

  async function onDelete() {
    const isConfirm = confirm('Are you sure you want to delete this data?');

    if (isConfirm) {
      // get id from binding function onDelete
      const id = this;
      const { data, error } = await supabase
        .from('petugas')
        .delete()
        .eq('id', id);

      // update the data after delete
      getDataPetugas();
    }
  }

  useEffect(() => {
    getDataPetugas();
  }, []);

  return (
    <main className='main-container'>
      <Link href='/'>Kembali ke halaman sebelumnya &larr;</Link>
      <h1 className='header'>Halaman Petugas with supabase!</h1>
      <div className='body'>
        <Link href='/petugas/insert' className='btn btn-primary'>
          Insert Data
        </Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nama Petugas</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listPetugas &&
              listPetugas.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>
                    <Link
                      href={{
                        pathname: '/petugas/update',
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
