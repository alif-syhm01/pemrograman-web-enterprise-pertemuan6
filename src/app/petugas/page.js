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

  useEffect(() => {
    getDataPetugas();
  }, []);

  return (
    <main className='main-container'>
      <Link href='/'>Kembali ke halaman sebelumnya &larr;</Link>
      <h1 className='header'>Halaman Petugas with supabase!</h1>
      <div className='body'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nama Petugas</th>
            </tr>
          </thead>
          <tbody>
            {listPetugas &&
              listPetugas.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
