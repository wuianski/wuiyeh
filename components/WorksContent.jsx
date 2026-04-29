"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
/* react-photo-album */
import PhotoAlbum from "react-photo-album";
import NextJsImage from "@/components/NextJsImage";
/* yet-another-react-lightbox */
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import LightBoxNextJsImage from "@/components/LightBoxNextJsImage";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Video from "yet-another-react-lightbox/plugins/video";
/* react-slick */
import Slider from "react-slick";
/* MUI */
import { Box, Stack } from "@mui/material";
import Item from "@/components/StackItem";

import useWindowWidth from "@/components/useWindowWidth";

export default function WorksContent({ work, params }) {
  // console.log("videos:", work.videos);
  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
  const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
  const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
  const myVideos = work.videos
    ? work.videos.map((video) => ({
        type: "video",
        video_src: `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${video.item.video_local.filename_disk}`,
        sources: [
          {
            src: `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${video.item.video_local.filename_disk}`,
            type: video.item.video_local.mime_type,
          },
        ],
        src: `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${video.item.video_cover.filename_disk}`,
        width: video.item.video_cover.width,
        height: video.item.video_cover.height,
        description: (
          <div dangerouslySetInnerHTML={{ __html: video.item.video_caption }} />
        ),
        playsInline: true,
        autoPlay: true,
        muted: true,
      }))
    : [];

  const myphotos = work.images.map((photo) => ({
    src: `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${photo.item.image.filename_disk}`,
    width: photo.item.image.width,
    height: photo.item.image.height,
    description: (
      <div dangerouslySetInnerHTML={{ __html: photo.item.image_caption }} />
    ),

    /* with zoom plugin in Lightbox */
    srcSet: [...imageSizes, ...deviceSizes]
      .filter((size) => size <= photo.item.image.width)
      .map((size) => ({
        src: `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${photo.item.image.filename_disk}`,
        width: size,
        height: Math.round(
          (photo.item.image.height / photo.item.image.width) * size,
        ),
      })),
  }));

  const combinedMedia = [...myVideos, ...myphotos];
  // console.log("combinedMedia", combinedMedia);
  const [index, setIndex] = useState(-1);
  const [renderPrev, setRenderPrev] = useState(true);
  const [renderNext, setRenderNext] = useState(true);
  const [finite, setFinite] = useState(true);

  const [controls, setControls] = useState(false);
  const [playsInline, setPlaysInline] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loop, setLoop] = useState(true);

  // slider
  let sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    arrows: false,
  };

  // detect window width
  const width = useWindowWidth();
  const isMobile = width < 900;

  return (
    <>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Item sx={{ width: { xs: "100%", md: "calc(100% - 350px)" } }}>
          <Box
            sx={{
              position: { xs: "relative", md: "absolute" },
              width: { xs: "100%", md: "calc(100vw - 800px)" },
              height: { xs: "auto", md: "50vh" },
              top: { xs: "0", md: "50%" },
              left: { xs: "0", md: "50%" },
              transform: { xs: "none", md: "translate(-50%, -50%)" },
              display: { xs: "none", md: "block" },
            }}
          >
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {combinedMedia.map((slide, idx) => {
                return (
                  <Box key={idx}>
                    <Box
                      sx={{
                        position: "relative",
                        height: "50vh",
                        width: "100%",
                      }}
                    >
                      {slide.type === "video" ? (
                        <video
                          src={slide.video_src}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <Image
                          src={slide.src}
                          alt="project cover image"
                          fill
                          style={{
                            objectFit: "contain",
                          }}
                          sizes="(max-width: 900px) 100vw, calc(100vw - 800px)"
                          priority={idx === 0 ? true : false}
                        />
                      )}
                    </Box>
                    <Box
                      sx={{
                        pt: "30px !important",
                        textAlign: "center",
                        lineHeight: "1.6rem",
                      }}
                    >
                      {slide.description}
                    </Box>
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Item>
        <Item
          sx={{
            width: { xs: "100%", md: "350px" },
            borderLeft: { xs: "none", md: "1px solid rgba(0, 0, 0, 0.12)" },
            borderRadius: { xs: "0rem", md: "0rem" },
            p: { xs: "0.9rem !important", md: "1.8rem !important" },
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
          <Box>
            <PhotoAlbum
              photos={combinedMedia}
              layout="rows"
              targetRowHeight={80}
              renderPhoto={NextJsImage}
              defaultContainerWidth={500}
              sizes={{
                size: "calc(100vw - 40px)",
                sizes: [
                  {
                    viewport: "(max-width: 299px)",
                    size: "calc(100vw - 10px)",
                  },
                  {
                    viewport: "(max-width: 599px)",
                    size: "calc(100vw - 20px)",
                  },
                  {
                    viewport: "(max-width: 1199px)",
                    size: "calc(100vw - 30px)",
                  },
                ],
              }}
              onClick={({ index: current }) => {
                if (isMobile) {
                  setIndex(current);
                } else {
                  sliderRef?.slickGoTo(current);
                }
              }}
            />
          </Box>
          <Box>
            <Lightbox
              slides={combinedMedia}
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              // enable optional lightbox plugins
              plugins={[Zoom, Captions, Video]}
              render={{
                slide: LightBoxNextJsImage,
                buttonPrev: renderPrev ? undefined : () => null,
                buttonNext: renderNext ? undefined : () => null,
              }}
              styles={{
                container: { backgroundColor: "rgba(0, 0, 0, 0)" },
              }}
              carousel={{ finite }}
              video={{
                controls,
                playsInline,
                autoPlay,
                loop,
              }}
            />
          </Box>
        </Item>
      </Stack>
    </>
  );
}
