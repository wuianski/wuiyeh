import * as React from "react";

import { NextAppProvider } from "@toolpad/core/nextjs";
import LinearProgress from "@mui/material/LinearProgress";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import {
  CustomAppTitle,
  SidebarFooter,
  CustomThemeSwitcher,
  CustomSidebarItem,
  PDFLoader,
} from "@/lib/slot";
import theme from "@/lib/theme";

/* import fonts */
import { cutiveMono } from "@/lib/font";
import "@/app/globals.css";

/* MUI */
import { Box } from "@mui/material";

/* Directus */
import directus from "../lib/directus";
// import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";

/* react-slick styles */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      }),
    );
  } catch (error) {
    return [];
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
      }),
    );
  } catch (error) {
    return [];
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
      }),
    );
  } catch (error) {
    return [];
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
      }),
    );
  } catch (error) {
    return [];
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
      }),
    );
  } catch (error) {
    return [];
  }
}

async function getCV() {
  try {
    return await directus.request(
      readItems("cv", {
        fields: ["*", "*.*", "*.*.*"],
      }),
    );
  } catch (error) {
    return [];
  }
}

/* SEO */
export const metadata = {
  title: "WU I-YEH | 吳宜曄",
  description: "WU I-YEH's website",
};

export default async function RootLayout({ children }) {
  // const works = await getWorks();
  // console.log(works);
  const cat1 = await getCat1();
  const cat2 = await getCat2();
  const cat3 = await getCat3();
  const cat4 = await getCat4();
  const cat5 = await getCat5();
  const cv = await getCV();
  // console.log("mycv", cv.cv.filename_disk);
  // const mycv = await `${cv}`;

  /* Orgnize navigation from works */
  const NAVIGATION = [
    ...(cat2.length > 0
      ? [
          {
            kind: "header",
            title: `#${cat2[0].category.category_name.toUpperCase()}`,
          },
        ]
      : []),
    ...cat2.map((work) => ({
      segment: `${work.slug}`,
      title: (
        <CustomSidebarItem
          title={work.title}
          icon={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
        />
      ),
    })),

    ...(cat1.length > 0
      ? [
          {
            kind: "header",
            title: `#${cat1[0].category.category_name.toUpperCase()}`,
          },
        ]
      : []),
    ...cat1.map((work) => ({
      segment: `${work.slug}`,
      title: (
        <CustomSidebarItem
          title={work.title}
          icon={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
        />
      ),
    })),

    ...(cat5.length > 0
      ? [
          {
            kind: "header",
            title: `#${cat5[0].category.category_name.toUpperCase()}`,
          },
        ]
      : []),
    ...cat5.map((work) => ({
      segment: `${work.slug}`,
      title: (
        <CustomSidebarItem
          title={work.title}
          icon={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
        />
      ),
    })),

    ...(cat3.length > 0
      ? [
          {
            kind: "header",
            title: `#${cat3[0].category.category_name.toUpperCase()}`,
          },
        ]
      : []),
    ...cat3.map((work) => ({
      segment: `${work.slug}`,
      title: (
        <CustomSidebarItem
          title={work.title}
          icon={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
        />
      ),
    })),

    ...(cat4.length > 0
      ? [
          {
            kind: "header",
            title: `#${cat4[0].category.category_name.toUpperCase()}`,
          },
        ]
      : []),
    ...cat4.map((work) => ({
      segment: `${work.slug}`,
      title: (
        <CustomSidebarItem
          title={work.title}
          icon={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${work.cover.filename_disk}`}
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
      title: <PDFLoader mycv={cv} />,
    },
  ];

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
                sidebarExpandedWidth={350}
                slots={{
                  appTitle: CustomAppTitle,
                  sidebarFooter: SidebarFooter,
                  toolbarActions: CustomThemeSwitcher,
                }}
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: "calc(100% - 20px)",
                  height: "calc(100% - 20px)",
                  border: "1px solid #ccc",
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
