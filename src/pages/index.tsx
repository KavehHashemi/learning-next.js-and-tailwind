import MainContainer from '@/components/MainContainer';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <div>
      <Head>
        <title>My First Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <QueryClientProvider client={queryClient}>
          <MainContainer></MainContainer>
        </QueryClientProvider>
      </main>
    </div>
  );
}
