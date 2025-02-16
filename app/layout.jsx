import * as React from "react";
import PropTypes from "prop-types";

import { NextAppProvider } from "@toolpad/core/nextjs";
import LinearProgress from "@mui/material/LinearProgress";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { CustomAppTitle, SidebarFooter, CustomThemeSwitcher } from "@/lib/slot";
import theme from "@/lib/theme";

/* import fonts */
import { cutiveMono } from "@/lib/font";
import "@/app/globals.css";

/* MUI */
import { Box } from "@mui/material";

/* Directus */
import directus from "../lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";

async function getCat1() {
  try {
    return await directus.request(
      readItems("works", {
        fields: ["*", "*.*"],
        sort: ["-year"],
        filter: {
          _and: [
            {
              status: { _eq: "published" },
              category: { _eq: "1" },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

async function getCat2() {
  try {
    return await directus.request(
      readItems("works", {
        fields: ["*", "*.*"],
        sort: ["-year"],
        filter: {
          _and: [
            {
              status: { _eq: "published" },
              category: { _eq: "2" },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

async function getCat3() {
  try {
    return await directus.request(
      readItems("works", {
        fields: ["*", "*.*"],
        sort: ["-year"],
        filter: {
          _and: [
            {
              status: { _eq: "published" },
              category: { _eq: "3" },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

async function getCat4() {
  try {
    return await directus.request(
      readItems("works", {
        fields: ["*", "*.*"],
        sort: ["-year"],
        filter: {
          _and: [
            {
              status: { _eq: "published" },
              category: { _eq: "4" },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

async function getCat5() {
  try {
    return await directus.request(
      readItems("works", {
        fields: ["*", "*.*"],
        sort: ["-year"],
        filter: {
          _and: [
            {
              status: { _eq: "published" },
              category: { _eq: "5" },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

async function getCV() {
  try {
    return await directus.request(
      readItems("cv", {
        fields: ["*", "*.*"],
      })
    );
  } catch (error) {
    notFound();
  }
}

const cat1 = await getCat1();
const cat2 = await getCat2();
const cat3 = await getCat3();
const cat4 = await getCat4();
const cat5 = await getCat5();
const cv = await getCV();
// console.log(cv);

/* Orgnize navigation from works */
const NAVIGATION = [
  {
    kind: "header",
    title: cat2[0].category.category_name.toUpperCase(),
  },
  ...cat2.map((work) => ({
    segment: `${work.slug}`,
    title: work.title,
    icon: (
      <Box
        component="img"
        sx={{ height: 30 }}
        alt="project cover image"
        src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
      />
    ),
  })),

  {
    kind: "header",
    title: cat1[0].category.category_name.toUpperCase(),
  },
  ...cat1.map((work) => ({
    segment: `${work.slug}`,
    title: work.title,
    icon: (
      <Box
        component="img"
        sx={{ height: 30 }}
        alt="project cover image"
        src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
      />
    ),
  })),

  {
    kind: "header",
    title: cat5[0].category.category_name.toUpperCase(),
  },
  ...cat5.map((work) => ({
    segment: `${work.slug}`,
    title: work.title,
    icon: (
      <Box
        component="img"
        sx={{ height: 30 }}
        alt="project cover image"
        src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
      />
    ),
  })),

  {
    kind: "header",
    title: cat3[0].category.category_name.toUpperCase(),
  },
  ...cat3.map((work) => ({
    segment: `${work.slug}`,
    title: work.title,
    icon: (
      <Box
        component="img"
        sx={{ height: 30 }}
        alt="project cover image"
        src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
      />
    ),
  })),

  {
    kind: "header",
    title: cat4[0].category.category_name.toUpperCase(),
  },
  ...cat4.map((work) => ({
    segment: `${work.slug}`,
    title: work.title,
    icon: (
      <Box
        component="img"
        sx={{ height: 30 }}
        alt="project cover image"
        src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
      />
    ),
  })),

  {
    kind: "header",
    title: "",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: (
      <>
        <Box component="span">CV: </Box>
        <Box component="span">
          <a
            href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${cv.cv.filename_disk}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </Box>
      </>
    ),
  },
];

/* SEO */
export const metadata = {
  title: "WU I-YEH | 吳宜曄",
  description: "WU I-YEH's website",
};

export default async function RootLayout({ children }) {
  // const works = await getWorks();
  // console.log(works);
  return (
    /* Must to have data-toolpad-color-scheme="dark", otherwise there is a server error. */
    <html
      lang="en"
      data-toolpad-color-scheme="dark"
      className={cutiveMono.className}
      suppressHydrationWarning
    >
      <body className={cutiveMono.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider theme={theme} navigation={NAVIGATION}>
              <DashboardLayout
                // defaultSidebarCollapsed
                disableCollapsibleSidebar
                sidebarExpandedWidth={320}
                slots={{
                  appTitle: CustomAppTitle,
                  sidebarFooter: SidebarFooter,
                  toolbarActions: CustomThemeSwitcher,
                }}
              >
                {children}
              </DashboardLayout>
            </NextAppProvider>
          </React.Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
