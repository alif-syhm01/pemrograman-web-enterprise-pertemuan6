'use client';

import supabase from '@/app/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import '../page.css';

export default function Insert() {
  const router = useRouter();
  const [name, setName] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    const { data, error } = await supabase
      .from('petugas')
      .insert({ name: name });

    router.push('/petugas');
  }

  return (
    <main className='main-container'>
      <Link href='/petugas'>Kembali ke halaman sebelumnya &larr;</Link>
      <h1 className='header'>Halaman Petugas - Insert Data</h1>

      {/* display if listData not null */}
      <form onSubmit={onSubmit} className='form-data'>
        {/* onchange: Isi state nama sesuai input */}
        <div className='form-input'>
          <label htmlFor='name'>Nama</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='masukkan nama...'
            required
          />
        </div>
        <button type='submit' className='btn btn-success'>
          Save
        </button>
      </form>
    </main>
  );
}
