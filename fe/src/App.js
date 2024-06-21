import React, { Suspense } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppBar, Toolbar, Typography, Container, CircularProgress, Box } from "@mui/material";
import FilterPanel from "../src/components/FilterPanel";
import DiamondList from "../src/components/DiamondList";
import { filtersState, diamondsQuery } from "./state";
import DiamondIcon from "@mui/icons-material/Diamond";
import "./App.css";

const DiamondsListSuspense = () => {
  const diamonds = useRecoilValue(diamondsQuery);

  return diamonds ? <DiamondList data={{ diamonds }} /> : <CircularProgress />;
};

function App() {
  const [filters, setFilters] = useRecoilState(filtersState);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Diamond E-commerce</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4} display="flex" alignItems="center">
          <Typography variant="h4">Search Diamonds</Typography>
          <DiamondIcon style={{ marginLeft: 8 }} />
        </Box>
        <Box mb={4}>
          <FilterPanel filters={filters} setFilters={setFilters} />
        </Box>
        <Suspense fallback={<CircularProgress />}>
          <DiamondsListSuspense />
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
