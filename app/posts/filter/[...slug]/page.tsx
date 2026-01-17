import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';
import { Metadata } from 'next';

type PostsPageProps = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: PostsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const userId: string = slug[0];
  return {
    title: userId === 'All' ? 'Posts - All Users' : `Posts - User ${userId}`,
  };
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;
  const userId: string = slug[0];

  const data = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId && userId !== 'All' && { userId }),
  });

  return (
    <>
      <PostsClient initialData={data} userId={userId} />
    </>
  );
}
