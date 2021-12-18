import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
declare const window: any;
const Discord: NextPage = () => {
  const router = useRouter();
  const { discord } = router.query;
  useEffect(() => {
    console.log(discord);
    if (discord) {
      window.location.href = `https://discord.com/invite/${discord}`;
    }
  }, [discord]);
  return <div></div>;
};

export default Discord;
