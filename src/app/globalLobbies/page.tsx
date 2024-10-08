"use client";
import { GlobalState } from "@/app/model/globalState";
import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import { grey, purple, blue } from "@mui/material/colors";

export default function GlobalLobbyPage() {
//  globalState: GlobalState
  //TODO: globalState associated fields:
  //Does it hold lobbies or rounds?
  const [lobbiesList, setLobbiesList] = useState<GlobalState["lobbies"] | null>(
    null,
  );
  const [lobbyLinks, setLobbyLinks] = useState<string[]>([]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Addresses",
      headerName: "Addresses",
      width: 300,
      editable: true,
    },
    {
      field: "minimumBet",
      headerName: "Minimum Bet in ETH",
      type: "number",
      width: 300,
      editable: true,
    },
    {
      field: "lobbyLink",
      headerName: "Link to Lobby",
      width: 300,
      editable: true,
    },
  ];
  //TODO: undummy this
  const rows = [
    {
      id: 1,
      Addresses: "Mishka.eth, Hemlock.eth",
      minimumBet: 0.1,
      lobbyLink: "🌐",
    },
    {
      id: 2,
      Addresses: "0x01234567, 0x789102345",
      minimumBet: 1,
      lobbyLink: "🌐",
    },
  ];
  return (
    <div className="flex w-full h-[100vh] m-20">
      <Box sx={{ height: 400, color: "#fff" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          sx={{
            border: "1px solid",
            borderColor: "divider",
            color: "text.blue.800",
          }}
        />
      </Box>
    </div>
  );
}
