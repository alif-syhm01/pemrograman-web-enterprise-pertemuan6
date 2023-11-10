'use client';

import supabase from '@/app/supabase';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import '../page.css';

export default function Update() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const [name, setName] = useState('');

  async function getData() {
    const { data, error } = await supabase
      .from('petugas')
      .select('id, name')
      .eq('id', id)
      .single();

    setName(data.name);
  }

  async function onSubmit(event) {
    event.preventDefault();

    const { data, error } = await supabase
      .from('petugas')
      .update({ name: name })
      .eq('id', id);

    router.push('/petugas');
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className='main-container'>
      <Link href='/petugas'>Kembali ke halaman sebelumnya &larr;</Link>
      <h1 className='header'>Halaman Petugas - Update Data</h1>

      <form onSubmit={onSubmit} className='form-data'>
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
          Update
        </button>
      </form>
    </main>
  );
}
