'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import '../page.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '@/app/supabase';

export default function Insert() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  async function getData() {
    const { data, error } = await supabase
      .from('kota')
      .select('id, nama, tipe')
      .eq('id', id)
      .single();

    // get data
    const { nama, tipe } = data;

    setName(nama);
    setType(tipe);
  }

  async function onSubmit(event) {
    event.preventDefault();

    const { data, error } = await supabase
      .from('kota')
      .update({
        nama: name,
        tipe: type,
      })
      .eq('id', id);

    router.push('/kota');
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className='main-container'>
      <Link href='/kota'>Kembali ke halaman sebelumnya &larr;</Link>
      <h1 className='header'>Halaman Petugas - Update Data</h1>

      {/* display if listData not null */}
      <form onSubmit={onSubmit} className='form-data'>
        {/* onchange: Isi state nama sesuai input */}
        <div className='form-input'>
          <label htmlFor='nama'>Nama Kota</label>
          <input
            type='text'
            name='nama'
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='masukkan nama kota...'
            required
          />
        </div>
        <div className='form-input'>
          <label htmlFor='tipe'>Wilayah Kota</label>
          <div className='form-input__radio-form'>
            <input
              type='radio'
              id='kotamadya'
              name='tipe'
              value='kotamadya'
              checked={type === 'kotamadya'}
              onChange={(event) => setType(event.target.value)}
              required
            />
            <label htmlFor='kotamadya'>Kotamadya</label>
          </div>
          <div className='form-input__radio-form'>
            <input
              type='radio'
              id='kabupaten'
              name='tipe'
              value='kabupaten'
              checked={type === 'kabupaten'}
              onChange={(event) => setType(event.target.value)}
              required
            />
            <label htmlFor='kabupaten'>Kabupaten</label>
          </div>
        </div>
        <button type='submit' className='btn btn-success'>
          Save
        </button>
      </form>
    </main>
  );
}
