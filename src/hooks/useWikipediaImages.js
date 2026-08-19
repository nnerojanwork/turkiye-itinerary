import { useEffect, useState } from "react";

// Shared across every gallery instance (activities, dishes, beaches) so
// switching tabs/destinations back and forth never re-fetches an image
// already looked up this session.
const imageCache = new Map();

// Fallback for titles with no dedicated Wikipedia article (common for
// specific regional dishes) — search Wikimedia Commons directly for a
// matching photo instead of leaving the card on its gradient placeholder.
async function fetchCommonsImage(wikipediaTitle) {
  try {
    const searchRes = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(wikipediaTitle)}&srnamespace=6&format=json&srlimit=1&origin=*`
    );
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const fileTitle = searchData.query?.search?.[0]?.title;
    if (!fileTitle) return null;

    const infoRes = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=330&format=json&origin=*`
    );
    if (!infoRes.ok) return null;
    const infoData = await infoRes.json();
    const pages = Object.values(infoData.query?.pages ?? {});
    return pages[0]?.imageinfo?.[0]?.thumburl ?? null;
  } catch {
    return null;
  }
}

async function fetchWikipediaImage(wikipediaTitle) {
  if (imageCache.has(wikipediaTitle)) return imageCache.get(wikipediaTitle);
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikipediaTitle)}`
    );
    if (!res.ok) throw new Error(`Wikipedia summary failed: ${res.status}`);
    const data = await res.json();
    const url = data.thumbnail?.source ?? data.originalimage?.source ?? null;
    if (url) {
      imageCache.set(wikipediaTitle, url);
      return url;
    }
    throw new Error("No thumbnail on article");
  } catch {
    const fallbackUrl = await fetchCommonsImage(wikipediaTitle);
    imageCache.set(wikipediaTitle, fallbackUrl);
    return fallbackUrl;
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
