import { Link } from '@/i18n/routing';
import { getAllPosts } from '@/sanity/queries';
import { urlForImage } from '@/sanity/image';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container pt-20 pb-4 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Blog</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Novinky a poznámky k tomu, na čem pracuji.
        </p>
      </section>

      <section className="container pt-16 pb-12">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center">Zatím tu nic není.</p>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="card block hover:border-purple-500 transition-colors"
              >
                {post.coverImage && (
                  <img
                    src={urlForImage(post.coverImage).width(800).height(450).fit('crop').url()}
                    alt={post.title}
                    className="w-full rounded-lg mb-4"
                    loading="lazy"
                  />
                )}
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('cs-CZ', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-gray-400">{post.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
