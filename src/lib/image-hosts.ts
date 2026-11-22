/** Hostnames allowed for next/image — keep in sync with next.config.ts remotePatterns */
export const OPTIMIZED_IMAGE_HOSTS = new Set([
  "i.ibb.co",
  "lh3.googleusercontent.com",
  "avatars.githubusercontent.com",
  "images.unsplash.com",
  "x.com",
  "i.postimg.cc",
  "postimg.cc",
]);

export function canUseNextImage(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (OPTIMIZED_IMAGE_HOSTS.has(host)) return true;
    return host.endsWith(".ibb.co");
  } catch {
    return false;
  }
}
