import { cache } from "react";
import { notFound } from "next/navigation";
import directus from "@/lib/directus";
import { readItem } from "@directus/sdk";
import { Box } from "@mui/material";
import WorksContent from "@/components/WorksContent";

function isPublishedWork(work, slug) {
  return (
    work &&
    typeof work === "object" &&
    !Array.isArray(work) &&
    work.status === "published" &&
    work.slug === slug &&
    typeof work.title === "string"
  );
}

const getWork = cache(async (slug) => {
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  try {
    const work = await directus.request(
      readItem("works", slug, {
        fields: [
          "*",
          "*.*",
          {
            cover: ["*.*", "*.*.*"],
            images: ["*.*", "*.*.*"],
            reviews: ["*", "*.*", "*.*.*"],
            videos: ["*", "*.*", "*.*.*"],
          },
        ],
        filter: {
          _and: [
            {
              status: {
                _eq: "published",
              },
            },
          ],
        },
      }),
    );

    if (!isPublishedWork(work, slug)) {
      notFound();
    }

    return {
      ...work,
      images: work.images ?? [],
      reviews: work.reviews ?? [],
      videos: work.videos ?? [],
    };
  } catch (error) {
    console.error(`Failed to fetch work "${slug}":`, error);
    notFound();
  }
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = await getWork(slug);

  const coverUrl =
    work.cover?.filename_disk &&
    `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`;

  return {
    title: work.title,
    description: work.title,
    alternates: {
      canonical: `https://i-yeh-wu.com/${work.slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://i-yeh-wu.com/${work.slug}`,
      title: work.title,
      description: work.title,
      ...(coverUrl && {
        images: [
          {
            url: coverUrl,
            width: work.cover?.width ?? 800,
            height: work.cover?.height ?? 600,
            alt: work.title,
          },
        ],
      }),
      site_name: "i-yeh-wu.com",
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const work = await getWork(slug);

  return (
    <Box>
      <WorksContent work={work} />
    </Box>
  );
}
