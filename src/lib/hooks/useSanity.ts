"use client";

import { useEffect, useState } from 'react';
import { sanityClient } from '@/lib/sanity';

interface UseSanityOptions {
  query: string;
  params?: Record<string, any>;
  enabled?: boolean;
}

interface UseSanityResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSanity<T = any>({
  query,
  params = {},
  enabled = true
}: UseSanityOptions): UseSanityResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await sanityClient.fetch(query, params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error fetching data'));
      console.error('Sanity fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, JSON.stringify(params), enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Hook específico para posts del blog
export function useBlogPosts(limit = 10) {
  return useSanity({
    query: `
      *[_type == "post"] | order(publishedAt desc) [0...$limit] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        author->{
          name,
          image
        },
        mainImage
      }
    `,
    params: { limit }
  });
}

// Hook específico para páginas
export function usePage(slug: string) {
  return useSanity({
    query: `
      *[_type == "page" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        content,
        seo
      }
    `,
    params: { slug },
    enabled: !!slug
  });
}
