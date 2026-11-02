import Trailer1img from "../assets/t1.png";
import Trailer2img from "../assets/t2.png";
import CoverArtimg from "../assets/coverart.png";
import ExtendedLookSoonImg from "../assets/extended-look-soon.png";
import ExtendedLookImg from "../assets/extended-look.png";
import LaunchTrailerImg from "../assets/launch-trailer.png";

interface trailerProps {
  id: number;
  img: string;
  name: string;
  release_date: string;
  link: string;
}

// Oldest first. The menu shows them newest first.
export const trailerData: trailerProps[] = [
  {
    id: 1,
    img: Trailer1img,
    name: "Grand Theft Auto VI: Trailer 1",
    release_date: "December 4, 2023",
    link: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
  },
  {
    id: 2,
    img: Trailer2img,
    name: "Grand Theft Auto VI: Trailer 2",
    release_date: "May 6, 2025",
    link: "https://www.youtube.com/watch?v=VQRLujxTm3c",
  },
  {
    id: 3,
    img: CoverArtimg,
    name: "Grand Theft Auto VI: Cover Art",
    release_date: "June 18, 2026",
    link: "https://www.youtube.com/watch?v=EiQEBYDox_k",
  },
  {
    id: 4,
    img: ExtendedLookSoonImg,
    name: "Grand Theft Auto VI: An Extended Look Coming August 27",
    release_date: "August 6, 2026",
    link: "https://www.youtube.com/watch?v=qq76pQsI1iw",
  },
  {
    id: 5,
    img: ExtendedLookImg,
    name: "Grand Theft Auto VI: An Extended Look",
    release_date: "August 27, 2026",
    link: "https://www.youtube.com/watch?v=tJbzMqJGH4k",
  },
  {
    id: 6,
    img: LaunchTrailerImg,
    name: "Grand Theft Auto VI: Launch Trailer",
    release_date: "October 15, 2026",
    link: "https://www.youtube.com/watch?v=rz1B4B2yBZY",
  },
];
