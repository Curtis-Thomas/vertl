import {
  Backdrop,
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";

import { useState, useEffect } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import AppointmentHeaderClientBackdrop from "./AppointmentHeaderClientBackdrop";

interface Client {
  events: Event[];
  _id: string;
  sub: string;
  businessId: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  county: string;
  country: string;
  address: string;
  email: string;
  phone: string;
  id: string;
  name: string;
  owners: string;
  patients: string;
}

interface ClientData {
  message: string;
  clients: Client[];
}

interface Props {
  onClientNameChange: (clientName: string) => void;
  onClientIdChange: (clientId: string) => void;
  onClientPatientsChange: (clientPatients: string[]) => void;
}

function AppointmentHeaderClient({
  onClientNameChange,
  onClientIdChange,
  onClientPatientsChange,
}: Props) {
  const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const { user, error, isLoading } = useUser();

  const [clientSearchData, setClientSearchData] = useState<ClientData | null>(
    null
  );

  const [clientData, setClientData] = useState<Client | null>(null);

  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [patientIds, setPatientIds] = useState<string[]>([]);

  useEffect(() => {
    onClientPatientsChange(patientIds);
  }, [patientIds, onClientPatientsChange]);

  useEffect(() => {
    if (Array.isArray(clientData?.patients) && clientData.patients.length > 0) {
      setPatientIds(clientData.patients);
    } else {
      setPatientIds([]);
    }
  }, [clientData]);

  const [recordsClient, setRecordsClient] = useState(false);
  const [backdropState, setBackdropState] = useState(false);
  const [clientBackdropState, setClientBackdropState] = useState(true);

  const [clientBoxFontSize, setClientBoxFontSize] = useState("0.8rem");

  const handleSelectClient = async () => {
    try {
      if (!user?.sub) {
        return;
      }

      // Clear previous data
      setClientData(null);

      const ClientData = {
        sub: user.sub,
        name: clientName,
      };

      const response = await fetch(domainUrl + `/client/client/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ClientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      setClientSearchData(responseData);

      setClientBackdropState(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClientSelection = (client: Client) => {
    setClientId(client.id);
    setClientName(client.name); // Set the client name
    setClientData(client); // Set the client data
    onClientNameChange(client.name);
    onClientIdChange(client.id);
    setClientBackdropState(false); // Close the backdrop after a client is selected
  };
  return (
    <>
      <AppointmentHeaderClientBackdrop
        backdropState={backdropState}
        setBackdropState={setBackdropState}
      />

      <Backdrop
        open={clientBackdropState}
        sx={{
          zIndex: "100",
          color: "black",
          backgroundColor: "white",

          marginLeft: "15vw",
          marginTop: "20vh",
          display: "block",
        }}
      >
        <Box sx={{ height: "80vh", overflowX: "auto", p: 1 }}>
          <Box sx={{ p: 1 }}>
            <Typography>Select Client</Typography>
          </Box>
          <Box sx={{ height: "80%", justifyContent: "center" }}>
            {clientSearchData &&
              clientSearchData.clients.map((client) => (
                <Box
                  key={client.id}
                  sx={{
                    backgroundColor: "#ffffff",
                    m: 1,
                    p: 1,
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "10%",

                    width: "80%",
                    border: "solid 1px black",
                  }}
                >
                  <Box>
                    <Typography>{client.name}</Typography>
                  </Box>
                  <Box>
                    <Typography>{client.email}</Typography>
                  </Box>
                  <Box>
                    <Typography>{client.phone}</Typography>
                  </Box>
                  <Button onClick={() => handleClientSelection(client)}>
                    Select
                  </Button>
                </Box>
              ))}
          </Box>
        </Box>
      </Backdrop>

      <Box
        sx={{
          width: "60vw",
          height: "20vh",
          p: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: "100%",
            borderRadius: "16px",
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "50%",
            }}
          >
            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                Full name:
              </Typography>

              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.name}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                Phone No:
              </Typography>

              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.phone}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                Email:
              </Typography>

              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.email}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                Business ID:
              </Typography>
              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.businessId}
                </Typography>
              )}
            </Box>

            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                Street Address:
              </Typography>
              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.streetAddress}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                ZIP Code:
              </Typography>
              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.zipCode}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                City:
              </Typography>
              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.city}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                County:
              </Typography>
              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.county}
                </Typography>
              )}
            </Box>
            <Box sx={{ width: "11.11%" }}>
              <Typography sx={{ fontSize: clientBoxFontSize }}>
                Country:
              </Typography>
              {clientData && (
                <Typography sx={{ fontSize: clientBoxFontSize }}>
                  {clientData.country}
                </Typography>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              height: "50%",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "10%" }}>
              <TextField
                size="small"
                label="Client Id"
                value={clientData ? clientData.id : ""}
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: "100%", height: "50%" }}
              />
            </Box>
            <Box>
              <TextField
                label="Enter Client Name"
                variant="outlined"
                value={clientName}
                size="small"
                autoComplete="off"
                onChange={(event) => setClientName(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Button
                sx={{
                  backgroundColor: "#94ddde",
                  color: "#ffffff",
                  borderRadius: "16px",
                  "&:hover": {
                    backgroundColor: "#C1EBEC",
                  },
                  ml: 1,
                }}
                onClick={handleSelectClient}
              >
                Select Client
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() => setBackdropState(true)}
                sx={{
                  backgroundColor: "#94ddde",
                  color: "#ffffff",
                  borderRadius: "16px",
                  "&:hover": {
                    backgroundColor: "#C1EBEC",
                  },
                }}
              >
                + New Client
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AppointmentHeaderClient;
