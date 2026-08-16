import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getPostBySlug } from '@/sanity/queries';
import { urlForImage } from '@/sanity/image';
import { siteUrl } from '@/lib/site';
import { getCategoryColor } from '@/lib/categoryColors';
import CopyLinkButton from '@/components/CopyLinkButton';
import { BookOpen, Mic, Wrench, GraduationCap, Trophy, MapPin, User, Sparkles } from 'lucide-react';

const categoryIconMap: Record<string, any> = {
  Kniha: BookOpen, Book: BookOpen,
  Podcast: Mic,
  'Web nebo nástroj': Wrench, 'Website or tool': Wrench,
  'Kurz nebo workshop': GraduationCap, 'Course or workshop': GraduationCap,
  'Akce nebo soutěž': Trophy, 'Event or competition': Trophy,
  Místo: MapPin, Place: MapPin,
  Osoba: User, Person: User,
  'Něco jiného': Sparkles, 'Something else': Sparkles,
};

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
    categoryBadge: ({ value }: any) => {
      const colors = getCategoryColor(value.category);
      const Icon = categoryIconMap[value.category] || Sparkles;
      return (
        <div className="mt-12 mb-4 text-center">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            style={{ backgroundColor: colors.bg }}
          >
            <Icon className="w-6 h-6" style={{ color: colors.text }} />
          </div>
          <p className="mono-label text-gray-500 mb-1">{value.category}</p>
          <h3 className="text-3xl font-bold mb-0">
            {value.itemName}
            {value.count > 1 && (
              <span className="block text-sm text-gray-500 font-normal mt-1">doporučeno {value.count}×</span>
            )}
          </h3>
        </div>
      );
    },
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
    authors: [{ name: 'Petr Hollan' }],
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

  const plainText = (post.body || []).filter((block: any) => block._type === "block").map((block: any) => (block.children || []).map((c: any) => c.text || "").join(" ")).join(" ");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));
  const articleUrl = `${siteUrl}/blog/${slug}`;

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <article className="container pt-20 pb-16 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <p className="mono-label text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('cs-CZ', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            {' · '}{readingMinutes} min čtení
          </p>
          <CopyLinkButton url={articleUrl} />
        </div>
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
