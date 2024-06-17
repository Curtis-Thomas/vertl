import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { useState } from "react";

import imgOverview from "./assets/overview picture.png";
import imgCalendar from "./assets/calendar picture.png";
import { set } from "date-fns";

function Features() {
  const [activeImg, setActiveImg] = useState(imgOverview);
  const [overviewDecoration, setOverviewDecoration] = useState("underline");
  const [calendarDecoration, setCalendarDecoration] = useState("none");
  const [billingDecoration, setBillingDecoration] = useState("none");
  const [singlePageDecoration, setSinglePageDecoration] = useState("none");
  const [easyEditDecoration, setEasyEditDecoration] = useState("none");

  function resetDecorations() {
    setOverviewDecoration("none");
    setCalendarDecoration("none");
    setBillingDecoration("none");
    setSinglePageDecoration("none");
    setEasyEditDecoration("none");
  }

  return (
    <Box
      sx={{
        backgroundColor: "#2D2B42",
        color: "#ffffff",
        display: { xs: "block", md: "flex" },
        width: "100%",
        pt: 5,
        pb: 5,
        pl: { xs: 0, md: 15 },
        pr: { xs: 0, md: 15 },
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "100%" } }}>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Box
            sx={{
              color: "#f26b70",

              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
              width: { xs: "auto", md: "13vw" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveImg(imgOverview);
                resetDecorations();
                setOverviewDecoration("underline");
              }}
              sx={{
                color: "#f26b70",
                backgroundColor: "#434063",
                width: "100%",
                height: "100%",
                textDecoration: overviewDecoration,
                ":hover": {
                  textDecoration: "underline dotted",
                  backgroundColor: "#2D2B42",
                },
              }}
            >
              <Typography variant="h5">Overview</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
              width: { xs: "auto", md: "13vw" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveImg(imgCalendar);
                resetDecorations();
                setCalendarDecoration("underline");
              }}
              sx={{
                color: "#f26b70",
                backgroundColor: "#434063",
                width: "100%",
                height: "100%",
                textDecoration: calendarDecoration,
                ":hover": {
                  textDecoration: "underline dotted",
                  backgroundColor: "#2D2B42",
                },
              }}
            >
              <Typography variant="h5">Calendar</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              color: "#f26b70",
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
              width: { xs: "auto", md: "13vw" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveImg(imgOverview);
                resetDecorations();
                setBillingDecoration("underline");
              }}
              sx={{
                backgroundColor: "#434063",

                color: "#f26b70",
                width: "100%",
                height: "100%",
                textDecoration: billingDecoration,
                ":hover": {
                  textDecoration: "underline dotted",
                  backgroundColor: "#2D2B42",
                },
              }}
            >
              <Typography variant="h5">Billing</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              color: "#f26b70",
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
              width: { xs: "auto", md: "13vw" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveImg(imgOverview);
                resetDecorations();
                setSinglePageDecoration("underline");
              }}
              sx={{
                backgroundColor: "#434063",

                color: "#f26b70",
                width: "100%",
                height: "100%",
                textDecoration: singlePageDecoration,
                ":hover": {
                  textDecoration: "underline dotted",
                  backgroundColor: "#2D2B42",
                },
              }}
            >
              <Typography variant="h5">Single-page layout</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              m: { xs: 1, md: 1 },
              p: { xs: 0, md: 1 },
              height: "100%",
              width: { xs: "auto", md: "13vw" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              disableRipple
              onClick={() => {
                setActiveImg(imgOverview);
                resetDecorations();
                setEasyEditDecoration("underline");
              }}
              sx={{
                backgroundColor: "#434063",

                color: "#f26b70",
                width: "100%",
                height: "100%",
                textDecoration: easyEditDecoration,
                ":hover": {
                  textDecoration: "underline dotted",
                  backgroundColor: "#2D2B42",
                },
              }}
            >
              <Typography variant="h5">Easy-edit codex</Typography>
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: { xs: "25vh", md: "35vw" },
            position: "relative",
          }}
        >
          <Image
            src={activeImg}
            alt="Overview"
            layout="fill"
            objectFit="contain"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Features;
