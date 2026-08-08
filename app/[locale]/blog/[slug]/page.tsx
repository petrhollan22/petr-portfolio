import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getPostBySlug } from '@/sanity/queries';
import { urlForImage } from '@/sanity/image';
import { siteUrl } from '@/lib/site';

const components = {
  types: {
    image: ({ value }: any) => (
      <img
        src={urlForImage(value).width(1000).url()}
        alt=""
        className="w-full rounded-lg my-6"
        loading="lazy"
      />
    ),
    embed: ({ value }: any) => (
      <div className="my-6">
        <div
          className="rounded-lg overflow-hidden border border-gray-700"
          dangerouslySetInnerHTML={{ __html: value.url }}
        />
        {value.caption && (
          <p className="text-sm text-gray-500 mt-2">{value.caption}</p>
        )}
      </div>
    ),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const url = `${siteUrl}/${locale}/blog/${slug}`;
  const description = post.excerpt || post.title;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url,
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [urlForImage(post.coverImage).width(1200).height(630).url()]
        : ['/og.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <article className="container pt-20 pb-16 max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-3">
          {new Date(post.publishedAt).toLocaleDateString('cs-CZ', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <h1 className="text-4xl font-bold mb-8 gradient-text">{post.title}</h1>

        {post.coverImage && (
          <img
            src={urlForImage(post.coverImage).width(1200).url()}
            alt={post.title}
            className="w-full rounded-lg mb-8"
          />
        )}

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
          <PortableText value={post.body} components={components} />
        </div>
      </article>
    </div>
  );
}
