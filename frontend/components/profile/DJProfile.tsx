"use client";

import Link from "next/link";
import Image from "next/image";
import Spotify from "../profile/Spotify";
import Youtube from "../profile/Youtube";

interface Props {
  data: any;
}

export default function DJProfile({ data }: Props) {
  const { spotify, youtube } = data;

  console.log("data", data);

  return (
    <div className="mt-12 space-y-10">
      {/* YouTube Section */}
      {youtube && <Youtube youtube={youtube} />}
    </div>
  );
}
