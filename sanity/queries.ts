import { client } from './client';

export interface PostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  publishedAt: string;
}

export interface Post extends PostSummary {
  body: any[];
}

export async function getAllPosts(): Promise<PostSummary[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      publishedAt,
      body
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getRecommendationPosts() {
  return client.fetch(
    `*[_type == "recommendationPost"] | order(publishedAt desc) {
      _id,
      category,
      emoji,
      intro,
      items[] {
        title,
        author,
        url,
        note
      },
      question,
      publishedAt
    }`
  );
}
