import { useEffect, useState } from "react";

// Shared across every gallery instance (activities, dishes, beaches) so
// switching tabs/destinations back and forth never re-fetches an image
// already looked up this session.
const imageCache = new Map();

async function fetchWikipediaImage(wikipediaTitle) {
  if (imageCache.has(wikipediaTitle)) return imageCache.get(wikipediaTitle);
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikipediaTitle)}`
    );
    if (!res.ok) throw new Error(`Wikipedia summary failed: ${res.status}`);
    const data = await res.json();
    const url = data.thumbnail?.source ?? data.originalimage?.source ?? null;
    imageCache.set(wikipediaTitle, url);
    return url;
  } catch {
    imageCache.set(wikipediaTitle, null);
    return null;
  }
}

// items: array of objects with { id, wikipediaTitle }
export function useWikipediaImages(items) {
  const [images, setImages] = useState(() => {
    const initial = {};
    for (const item of items) {
      if (item.wikipediaTitle && imageCache.has(item.wikipediaTitle)) {
        initial[item.id] = imageCache.get(item.wikipediaTitle);
      }
    }
    return initial;
  });

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled(
      items.map(async (item) => {
        if (!item.wikipediaTitle) return { id: item.id, url: null };
        const url = await fetchWikipediaImage(item.wikipediaTitle);
        return { id: item.id, url };
      })
    ).then((results) => {
      if (cancelled) return;
      setImages((prev) => {
        const next = { ...prev };
        for (const r of results) {
          if (r.status === "fulfilled") next[r.value.id] = r.value.url;
        }
        return next;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  return images;
}
