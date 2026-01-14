'use client';

import { Typography, Box } from "@mui/material";
/* import fonts */
import { cutiveMono } from "@/lib/font";
//
import React, { useState } from "react";
import { usePathname } from 'next/navigation'


export function CustomAppTitle() {
    return (
        <Typography variant="small"  >
            <Box sx={{ marginLeft: { xs: "0.9rem !important", md: "1.8rem !important" }, marginTop: { xs: "0.9rem !important", md: "unset !important" } }} >
                <Box component="span" className={cutiveMono.className}>WU I-YEH | </Box>
                <Box component="span" className={cutiveMono.className}>吳 宜 曄</Box>
            </Box>
        </Typography >
    );
}

export function SidebarFooter() {
    return (
        <>
            <Typography
                variant="caption"
                sx={{ m: "1.8rem", whiteSpace: 'nowrap', paddingBottom: "0.8rem !important", fontWeight: "700 !important", color: `var(--mui-palette-text-secondary);` }}
                className={cutiveMono.className}
            >
                CONTACT: wuiyeh at gmail dot com
            </Typography>
            {/* <Typography
                variant="caption"
                sx={{ m: "1.8rem", whiteSpace: 'nowrap' }}
                className={cutiveMono.className}
            >
                {`© ${new Date().getFullYear()}  WU I-YEH All Rights Reserved.`}
            </Typography> */}
        </>
    );
}

/* Must included to hide theme switcher on top right corner. */
export function CustomThemeSwitcher() {
    return (
        <div>
            {null}
        </div>
    );
}

/* customize title and icon in the sidebar */
export function CustomSidebarItem({ title, icon }) {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();

    const currentSegment = pathname ? decodeURIComponent(pathname.split('/').filter(Boolean).pop()?.toLowerCase().replace(/-/g, ' ') || '') : '';
    const isCurrentSelected = currentSegment.replace(/-/g, '') === title.toLowerCase().replace(/-/g, '');
    const showIcon = isCurrentSelected || isHovered;

    return (
        <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
            <Box className="navTitle" component="span">{title}</Box>
            {icon && (
                <Box
                    className={`navIcon ${isCurrentSelected ? 'selected' : ''}`}
                    component="span"
                    sx={{ display: showIcon ? 'inline-block' : 'none', '&.selected': { display: 'inline-block !important' } }}
                >
                    <Box component="img" sx={{ height: 30 }} alt="project cover image" src={icon} />
                </Box>
            )}
        </Box>
    );
}

export function PDFLoader({ mycv }) {
    console.log("mycv in PDFLoader:", mycv);
    return (
        <>
            <Box component="span">CV: </Box>
            <Box component="span">
                {mycv && (
                    <a
                        // href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${cv.cv.filename_disk}`}
                        href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${mycv.cv.filename_disk}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download
                    </a>
                )}
            </Box>
        </>
    );
}