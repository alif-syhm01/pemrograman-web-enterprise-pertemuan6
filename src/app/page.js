import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <Link href='/placeholder'>Klik untuk ke halaman berikutnya</Link>
      <br />
      <Link href='/petugas'>Klik untuk halaman petugas</Link>
    </div>
  );
}
