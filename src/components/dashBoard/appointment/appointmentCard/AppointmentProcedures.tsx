import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store"; // import your store type

interface Procedure {
  name: string;
  price: number;
  description: string;
  sub: string;
}

interface ProceduresDone {
  name: string;
  price: number;
  amount: string;
}

function AppointmentProcedures() {
  const dispatch = useDispatch();

  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [proceduresDone, setProceduresDone] = useState<ProceduresDone[]>([]);

  const [proceduresDoneProcedure, setProceduresDoneProcedure] = useState("");
  const [proceduresDoneAmount, setProceduresDoneAmount] = useState("");
  const [proceduresDonePrice, setProceduresDonePrice] = useState("");

  const appointmentCardProceduresPrice = useSelector(
    (state: RootState) => state.appointment.appointmentCardProceduresPrice
  );

  const formatNumber = (num: number) => num.toFixed(2);

  const getProceduresData = useCallback(async () => {
    if (!user) return;
    try {
      const url = domainUrl + `/procedure/procedures/get`;

      const headers = {
        sub: user.sub,
      };

      const response = await axios.get(url, { headers });
      setProcedures(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [user, domainUrl]);

  useEffect(() => {
    getProceduresData();
  }, [getProceduresData]);

  const filteredProcedures = procedures.filter((procedure) =>
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProceduresDone = () => {
    if (!user) return;
    const newProcedure = {
      name: proceduresDoneProcedure,
      price: parseInt(proceduresDonePrice),
      amount: proceduresDoneAmount,
    };
    setProceduresDone([...proceduresDone, newProcedure]);
    setProceduresDoneProcedure("");
    setProceduresDoneAmount("");
    setProceduresDonePrice("");
    dispatch({
      type: "SET_APPOINTMENT",
      payload: {
        appointmentCardProceduresPrice:
          appointmentCardProceduresPrice + newProcedure.price,
      },
    });
  };

  const handleRemoveLastProcedure = () => {
    const lastProcedure = proceduresDone[proceduresDone.length - 1];
    setProceduresDone(proceduresDone.slice(0, -1));
    dispatch({
      type: "SET_APPOINTMENT",
      payload: {
        appointmentCardProceduresPrice:
          appointmentCardProceduresPrice - lastProcedure.price,
      },
    });
  };

  const handleClearProceduresDone = () => {
    setProceduresDone([]);
    dispatch({
      type: "SET_APPOINTMENT",
      payload: { appointmentCardProceduresPrice: 0 },
    });
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ height: "10%", width: "100%" }}>
        <Box sx={{ height: "60%" }}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 200, backgroundColor: "#ffffff" }}
            inputProps={{
              style: { height: "10%" },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ height: "25%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "20%",
          }}
        >
          <Box>
            <Typography>Procedures</Typography>
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
            {filteredProcedures.map((procedure, index) => (
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
                  <Typography>{procedure.name}</Typography>
                </Box>
                <Box>
                  <Typography>{procedure.price}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "65%" }}>
        <Box sx={{ border: "solid 1px #94ddde", height: "45%" }}>
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
            {proceduresDone.map((procedure, index) => (
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
                  <Typography>{procedure.name}</Typography>
                </Box>
                <Box>
                  <Typography>{procedure.amount}</Typography>
                </Box>
                <Box>
                  <Typography>{procedure.price}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ height: "10%" }}></Box>
        <Box sx={{ height: "45%", display: "flex" }}>
          <Box sx={{ width: "70%", height: "100%" }}>
            <Box sx={{ height: "33.33%" }}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#ffffff" }}
                value={proceduresDoneProcedure}
                label="Procedure"
                size="small"
                autoComplete="off"
                onChange={(event) =>
                  setProceduresDoneProcedure(event.target.value)
                }
                inputProps={{
                  style: { height: "10%" },
                }}
              />
            </Box>
            <Box sx={{ height: "33.33%" }}>
              {/* <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#ffffff" }}
                value={proceduresDoneAmount}
                label="Amount - Num"
                size="small"
                type="number"
                autoComplete="off"
                onChange={(event) =>
                  setProceduresDoneAmount(event.target.value)
                }
              /> */}
            </Box>
            <Box sx={{ height: "33.33%" }}>
              <TextField
                sx={{ backgroundColor: "#ffffff" }}
                value={proceduresDonePrice}
                label="Price - Num"
                type="number"
                size="small"
                autoComplete="off"
                onChange={(event) => setProceduresDonePrice(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: { height: "10%" },
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
              onClick={handleRemoveLastProcedure}
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
              onClick={handleClearProceduresDone}
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
                "&:hover": {
                  backgroundColor: "#C1EBEC",
                },
              }}
              onClick={handleAddProceduresDone}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentProcedures;
