import { buildMetadata } from '@/lib/metadata';
import InspirationClient from './InspirationClient';
import { getRecommendationPosts } from '@/sanity/queries';
import PageGlow from '@/components/PageGlow';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, 'inspirationTitle', 'inspirationDescription', '/inspiration');
}

export default async function Page() {
  const posts = await getRecommendationPosts();

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="relative overflow-hidden container pt-20 pb-4 text-center">
        <PageGlow />
        <h1 className="text-5xl font-bold mb-4 gradient-text">Inspirace</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Co čtu, poslouchám a používám. A co bych doporučil i tobě.
        </p>
      </section>

      {posts.length > 0 && (
        <section className="container py-12 space-y-8 max-w-3xl mx-auto">
          {posts.map((post: any) => (
            <article key={post._id} className="card">
              <div className="flex items-center gap-3 mb-4">
                {post.emoji && <span className="text-2xl">{post.emoji}</span>}
                <span className="mono-label text-red-400">
                  {post.category === 'books' && 'Knihy'}
                  {post.category === 'podcasts' && 'Podcasty'}
                  {post.category === 'tools' && 'Nástroje'}
                  {post.category === 'international' && 'Zahraniční zdroje'}
                </span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{post.intro}</p>

              <ol className="space-y-5">
                {post.items?.map((item: any, i: number) => (
                  <li key={i} className="flex gap-4">
                    <span className="mono-label text-red-400 shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          className="font-semibold hover:text-red-400 transition-colors">
                          {item.title}
                          {item.author && <span className="text-gray-500 font-normal"> — {item.author}</span>}
                          <span className="text-red-400 ml-1 text-sm">↗</span>
                        </a>
                      ) : (
                        <span className="font-semibold">
                          {item.title}
                          {item.author && <span className="text-gray-500 font-normal"> — {item.author}</span>}
                        </span>
                      )}
                      {item.note && <p className="text-gray-400 text-sm mt-1">{item.note}</p>}
                    </div>
                  </li>
                ))}
              </ol>

              {post.question && (
                <p className="mt-6 text-gray-500 text-sm border-t border-gray-800 pt-4">
                  💬 {post.question}
                </p>
              )}
            </article>
          ))}
        </section>
      )}

      <InspirationClient />
    </div>
  );
}
