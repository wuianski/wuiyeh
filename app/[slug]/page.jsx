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
  // console.log(work.reviews);
  return (
    <Box
      className={cutiveMono.className}
      sx={{ m: { xs: "0.9rem !important", md: "1.8rem !important" } }}
    >
      <Stack direction={{ xs: "column", md: "row" }}>
        <Item sx={{ width: { xs: "100%", md: "60%" } }}>
          <PhotoGallery photos={work.images} />
        </Item>
        <Item
          sx={{
            width: { xs: "100%", md: "40%" },
            ml: { xs: "0rem !important", md: "1.8rem !important" },
            mt: { xs: "1.8rem !important", md: "0rem !important" },
          }}
        >
          <Box>
            <Box
              component="span"
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {work.title}
            </Box>
            <Box component="span">, {work.year}</Box>
          </Box>
          <Box dangerouslySetInnerHTML={{ __html: work.info }} />
          <Box
            sx={{ mt: "1rem !important" }}
            dangerouslySetInnerHTML={{ __html: work.statement }}
          />
          <Box sx={{ mt: "1rem !important" }}>
            {work.reviews.map((review) => (
              <Box key={review.id}>
                {review.item.review_tw ? (
                  <a
                    href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${review.item.review_tw.filename_disk}`}
                    target="_blank"
                  >
                    <Box
                      sx={{
                        textDecoration: "underline",
                        mb: "1rem !important",
                      }}
                    >
                      {review.item.review_tw.title}
                    </Box>
                  </a>
                ) : review.item.review_en ? (
                  <a
                    href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${review.item.review_en.filename_disk}`}
                    target="_blank"
                  >
                    <Box
                      sx={{
                        textDecoration: "underline",
                        mb: "1rem !important",
                      }}
                    >
                      {review.item.review_en.title}
                    </Box>
                  </a>
                ) : null}
              </Box>
            ))}
          </Box>
        </Item>
      </Stack>
    </Box>
  );
}
