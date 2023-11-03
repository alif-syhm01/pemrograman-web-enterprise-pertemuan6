'use client';

import supabase from '@/app/supabase';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    <div>
      <Link href='/petugas'>Kembali ke halaman sebelumnya &larr;</Link>
      <br />
      <br />
      <h3>Update</h3>
      {console.log(name)}
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <br />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
