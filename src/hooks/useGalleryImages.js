import { useEffect, useState } from "react";

// Separate cache from useWikipediaImages: this tab wants the full-resolution
// originalimage rather than the small thumbnail used elsewhere, so the two
// can't safely share one cached URL per title.
const galleryImageCache = new Map();

async function fetchCommonsOriginal(wikipediaTitle) {
  try {
    const searchRes = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(wikipediaTitle)}&srnamespace=6&format=json&srlimit=1&origin=*`
    );
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const fileTitle = searchData.query?.search?.[0]?.title;
    if (!fileTitle) return null;

    const infoRes = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json&origin=*`
    );
    if (!infoRes.ok) return null;
    const infoData = await infoRes.json();
    const pages = Object.values(infoData.query?.pages ?? {});
    return pages[0]?.imageinfo?.[0]?.url ?? null;
  } catch {
    return null;
  }
}

async function fetchOriginalImage(wikipediaTitle) {
  if (galleryImageCache.has(wikipediaTitle)) return galleryImageCache.get(wikipediaTitle);
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikipediaTitle)}`
    );
    if (!res.ok) throw new Error(`Wikipedia summary failed: ${res.status}`);
    const data = await res.json();
    const url = data.originalimage?.source ?? data.thumbnail?.source ?? null;
    if (url) {
      galleryImageCache.set(wikipediaTitle, url);
      return url;
    }
    throw new Error("No image on article");
  } catch {
    const fallbackUrl = await fetchCommonsOriginal(wikipediaTitle);
    galleryImageCache.set(wikipediaTitle, fallbackUrl);
    return fallbackUrl;
  }
}

export function useGalleryImages(items) {
  const [images, setImages] = useState(() => {
    const initial = {};
    for (const item of items) {
      if (item.wikipediaTitle && galleryImageCache.has(item.wikipediaTitle)) {
        initial[item.id] = galleryImageCache.get(item.wikipediaTitle);
      }
    }
    return initial;
  });

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled(
      items.map(async (item) => {
        if (!item.wikipediaTitle) return { id: item.id, url: null };
        const url = await fetchOriginalImage(item.wikipediaTitle);
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
