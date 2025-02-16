/* fetch data from directus */
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";
/* fetch data from directus */
async function getWork() {
    try {
        return await directus.request(
            readItems("works", {
                fields: ["*", "*.*"],
                sort: ["-year"],
                filter: {
                    _and: [
                        {
                            status: { _eq: "published" },
                        },
                    ],
                },
            })
        );
    } catch (error) {
        notFound();
    }
}

export default async function sitemap() {
    const work = await getWork();
    // console.log(work);
    return [
        {
            url: 'https://i-yeh-wu.com',
        },
        ...work.map(({ slug }) => {
            return {
                url: `https://i-yeh-wu.com/${slug}`,
            };
        })
    ];
}