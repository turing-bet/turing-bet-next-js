"use client";
import { Lobby } from "../../model/lobby";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";

export default function ResultsPage(lobby: Lobby) {
  return (
    <Container>
      <Box sx={{ p: 2 }}>
        <Stack spacing={2} direction="row">
          <Typography gutterBottom variant="h5" component="div">
            Mishka.eth got 500 points!
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: grey[400] }}>
          Point breakdown:
        </Typography>
        <Typography variant="body2" sx={{ color: grey[400] }}>
          - 2X decieve bonus
        </Typography>
        <Typography variant="body2" sx={{ color: grey[400] }}>
          - 2X correct guess
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Stack spacing={2} direction="row">
          <Typography gutterBottom variant="h5" component="div">
            Hemlock.eth got 400 points!
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: grey[400] }}>
          Point breakdown:
        </Typography>
        <Typography variant="body2" sx={{ color: grey[400] }}>
          - 2X decieve bonus
        </Typography>
        <Typography variant="body2" sx={{ color: grey[400] }}>
          - 1X correct guess
        </Typography>
      </Box>
      <>
        <Button type="submit" variant="outlined">
          Claim winnings!
        </Button>
      </>
    </Container>
  );
}
