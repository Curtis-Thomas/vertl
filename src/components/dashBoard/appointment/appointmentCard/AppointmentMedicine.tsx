import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

interface Medicine {
  name: string;
  price: number;
  description: string;
  sub: string;
}

interface MedicineUsed {
  name: string;
  price: number;
  amount: string;
}

function AppointmentMedicine({
  onTotalPriceChange,
}: {
  onTotalPriceChange: (price: number) => void;
}) {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [medicine, setMedicine] = useState<Medicine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineUsed, setMedicineUsed] = useState<MedicineUsed[]>([]);

  const [medicineUsedMedicine, setMedicineUsedMedicine] = useState("");
  const [medicineUsedAmount, setMedicineUsedAmount] = useState("");
  const [medicineUsedPrice, setMedicineUsedPrice] = useState("");

  const [medicineTotalPrice, setMedicineTotalPrice] = useState(0);

  const formatNumber = (num: number) => num.toFixed(2);

  useEffect(() => {
    onTotalPriceChange(medicineTotalPrice);
  }, [medicineTotalPrice, onTotalPriceChange]);

  const getMedicineData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/drugs/drugs/get`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setMedicine(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getMedicineData();
  }, [getMedicineData]);

  const filteredMedicine = medicine.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedicineUsed = () => {
    if (!user) return;
    setMedicineUsed([
      ...medicineUsed,
      {
        name: medicineUsedMedicine,
        price: parseInt(medicineUsedPrice),
        amount: medicineUsedAmount,
      },
    ]);
    setMedicineUsedMedicine("");
    setMedicineUsedAmount("");
    setMedicineUsedPrice("");
  };

  useEffect(() => {
    let totalPrice = 0;
    medicineUsed.forEach((medicine) => {
      totalPrice += medicine.price * parseInt(medicine.amount);
    });
    setMedicineTotalPrice(totalPrice);
  }, [medicineUsed]);

  const handleRemoveLastMedicine = () => {
    setMedicineUsed(medicineUsed.slice(0, -1));
  };

  const handleClearMedicineUsed = () => {
    setMedicineUsed([]);
  };
  if (user) {
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Box sx={{ height: "7%" }}>
        <Box sx={{ height: "60%" }}>
          <TextField
            autoComplete="off"
            label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 200, backgroundColor: "#ffffff" }}
          />
        </Box>
      </Box>
      <Box sx={{ height: "38%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography>Medicine</Typography>
          </Box>
          <Box>
            <Typography>Price</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "80%",
            overflowX: "hidden",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#ffffff",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#000000",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#2F2621",
            },
          }}
        >
          <Box
            sx={{
              borderRadius: "16px",
            }}
          >
            {filteredMedicine.map((medicine, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#ffffff",
                  borderBottom: "1px solid grey",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Box>
                  <Typography>{medicine.name}</Typography>
                </Box>
                <Box>
                  <Typography>{medicine.price}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "55%" }}>
        <Box
          sx={{
            display: " flex",
            height: "10%",
          }}
        >
          <Box sx={{ width: "33.33%" }}>
            <Typography>Medicine</Typography>
          </Box>
          <Box sx={{ width: "33.33%" }}>
            <Typography textAlign="center">Amount</Typography>
          </Box>
          <Box sx={{ width: "33.33%" }}>
            <Typography textAlign="right">Price</Typography>
          </Box>
        </Box>
        <Box sx={{ border: "solid 1px #94ddde", height: "35%" }}>
          <Box
            sx={{
              height: "100%",
              overflowX: "hidden",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                background: "#ffffff",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#000000",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#2F2621",
              },
            }}
          >
            {medicineUsed.map((medicine, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: "1px solid grey",
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                }}
              >
                <Box>
                  <Typography>{medicine.name}</Typography>
                </Box>
                <Box>
                  <Typography>{medicine.amount}</Typography>
                </Box>
                <Box>
                  <Typography>{medicine.price}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ height: "10%" }}>
          <Typography textAlign={"right"}>
            Total Price: {medicineTotalPrice}
          </Typography>
        </Box>
        <Box sx={{ height: "45%", display: "flex" }}>
          <Box sx={{ width: "70%", height: "100%" }}>
            <Box sx={{ height: "33%" }}>
              <TextField
                sx={{ backgroundColor: "#ffffff" }}
                value={medicineUsedMedicine}
                label="Medicine"
                size="small"
                autoComplete="off"
                onChange={(event) =>
                  setMedicineUsedMedicine(event.target.value)
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box sx={{ height: "33%" }}>
              <TextField
                sx={{ backgroundColor: "#ffffff" }}
                value={medicineUsedAmount}
                label="Amount - Num"
                type="number"
                size="small"
                autoComplete="off"
                onChange={(event) => setMedicineUsedAmount(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box sx={{ height: "33%" }}>
              <TextField
                sx={{ backgroundColor: "#ffffff" }}
                value={medicineUsedPrice}
                label="Price - Num"
                size="small"
                type="number"
                autoComplete="off"
                onChange={(event) => setMedicineUsedPrice(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
          <Box sx={{ width: "30%" }}>
            <Button
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                borderRadius: "16px",
                border: "solid 1px ",
                width: "100%",
                height: "30%",
                mb: 1,
                fontSize: 10,
              }}
              onClick={handleRemoveLastMedicine}
            >
              Remove Last
            </Button>

            <Button
              sx={{
                backgroundColor: "#ffffff",
                color: "#94ddde",
                borderRadius: "16px",
                border: "solid 1px ",
                width: "100%",
                height: "30%",
                mb: 1,
              }}
              onClick={handleClearMedicineUsed}
            >
              Clear
            </Button>

            <Button
              sx={{
                backgroundColor: "#94ddde",
                color: "#ffffff",
                borderRadius: "16px",
                width: "100%",
                height: "30%",
              }}
              onClick={handleAddMedicineUsed}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AppointmentMedicine;
