"use client";

import Image from "next/image";
import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";

export const NavBar = () => {
  const path = usePathname();
  console.log(path);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "white",
        padding: "0px 30px",
        height: "90px",
      }}
    >
      <Box>
        <Image
          src="/images/logo-poblaria.png"
          alt="logo"
          width={100}
          height={100}
        />
      </Box>
      <Box style={{ marginLeft: "auto", display: "flex", gap: "16px" }}>
        <Button
          variant="text"
          sx={{
            backgroundColor: path === "/" ? "#5E7749" : "",
            color: path === "/" ? "white" : "black",
            "&:hover": {
              backgroundColor: "#83A16C",
              color: "white",
            },
          }}
        >
          <Link href="/">Home</Link>
        </Button>
        <Button
          variant="text"
          sx={{
            backgroundColor: path === "/explore" ? "#5E7749" : "",
            color: path === "/explore" ? "white" : "black",
            "&:hover": {
                backgroundColor: "#83A16C",
                color: "white",
              },
          }}
        >
          <Link href="/explore">Explore</Link>
        </Button>
        <Button
          variant="text"
          sx={{
            backgroundColor: path === "/resources" ? "#5E7749" : "",
            color: path === "/resources" ? "white" : "black",
            "&:hover": {
                backgroundColor: "#83A16C",
                color: "white",
              },
          }}
        >
          <Link href="/resources">Resources</Link>
        </Button>
        <Button
          variant="text"
          sx={{
            backgroundColor: path === "/support" ? "#5E7749" : "",
            color: path === "/support" ? "white" : "black",
            "&:hover": {
                backgroundColor: "#83A16C",
                color: "white",
              },
          }}
        >
          Support
        </Button>
        <Button
          variant="text"
          sx={{
            backgroundColor: path === "/profile" ? "#5E7749" : "",
            color: path === "/profile" ? "white" : "black",
            "&:hover": {
                backgroundColor: "#83A16C",
                color: "white",
              },
          }}
        >
          Profile
        </Button>
      </Box>
    </nav>
  );
};
