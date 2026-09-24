import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Landing page now points to the projects listing.
      // Temporary (307) so it can be reverted without browsers caching it;
      // switch to `permanent: true` (308) once the change is final.
      {
        source: "/",
        destination: "/projects",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
