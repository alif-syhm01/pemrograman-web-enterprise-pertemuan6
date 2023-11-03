'use client';

import supabase from '@/app/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    <div>
      <h3>Insert</h3>

      {/* display if listData not null */}
      <form onSubmit={onSubmit}>
        {/* onchange: Isi state nama sesuai input */}
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
