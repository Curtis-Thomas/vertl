import { Box, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box>
      <CssBaseline />
      <UserProvider>
        <div className={inter.className}>{children}</div>
      </UserProvider>
    </Box>
  );
}
