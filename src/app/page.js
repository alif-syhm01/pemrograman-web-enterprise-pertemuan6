import Link from 'next/link';

export default function Page() {
  return (
    <main
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <section
        style={{
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem',
        }}
      >
        <h1 className='header'>Menu Halaman</h1>
        <div
          style={{
            width: '100vh',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}
        >
          <Link
            href='/placeholder'
            style={{
              textAlign: 'center',
              color: '#04aa6d',
              fontWeight: 'bold',
            }}
          >
            Placeholder
          </Link>
          <Link
            href='/petugas'
            style={{
              textAlign: 'center',
              color: '#04aa6d',
              fontWeight: 'bold',
            }}
          >
            Petugas
          </Link>
          <Link
            href='/kota'
            style={{
              textAlign: 'center',
              color: '#04aa6d',
              fontWeight: 'bold',
            }}
          >
            Kota
          </Link>
        </div>
      </section>
    </main>
  );
}
