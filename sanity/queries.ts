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
    }`
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
    { slug }
  );
}
