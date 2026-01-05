/* fetch data from directus */
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItem } from "@directus/sdk";
/* import fonts */
import { courier_prime, cutiveMono } from "@/lib/font";
/* MUI */
import { Box, Stack } from "@mui/material";
import Item from "@/components/StackItem";
/* grid image */
import PhotoGallery from "@/components/PhotoGallery";
import WorksContent from "@/components/WorksContent";
/* Video PLayer */
import VideoPlayer from "@/components/VideoPlayer";

/* fetch data from directus */
async function getWork(slug) {
  try {
    const work = await directus.request(
      readItem("works", slug, {
        fields: [
          "*",
          "*.*",
          {
            cover: ["*.*"],
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
      })
    );
    return work;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }) {
  // fetch data
  const work = await getWork((await params).slug);

  return {
    title: work.title,
    description: work.title,
    canonical: `https://i-yeh-wu.com/${work.slug}`,
    openGraph: {
      type: "website",
      url: "https://i-yeh-wu.com",
      title: work.title,
      description: work.title,
      images: [
        {
          url: `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`,
          width: 800,
          height: 600,
          alt: "Cover of the artwork",
        },
      ],
      site_name: "i-yeh-wu.com",
    },
  };
}

export default async function Page({ params }) {
  const work = await getWork((await params).slug);
  // console.log(work.videos);
  return (
    <Box>
      <WorksContent work={work} />
    </Box>
  );
}
