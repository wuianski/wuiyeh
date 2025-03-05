/* MUI */
import { Box } from "@mui/material";
import { title } from "process";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

export default function VideoPlayer({ videos }) {
  const myvideo = videos.map((video) => ({
    src: `${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${video.item.video_local.filename_disk}`,
    caption: video.item.video_caption,
    width: video.item.video_local.width,
    title: video.item.video_local.title,
  }));
  console.log("myvideo", myvideo[0]);
  return (
    <>
      {/* <Box>{myvideo[0].src}</Box>
      <Box>{myvideo[0].caption}</Box>
      <Box>{myvideo[0].width}</Box>
      <Box>{myvideo[0].title}</Box> */}
      {videos && videos.length > 0 && (
        <Box sx={{ width: "100%", marginTop: "15px !important" }}>
          <video width="100%" controls loop>
            <source src={myvideo[0].src} />
          </video>
        </Box>
      )}
    </>
  );
}
