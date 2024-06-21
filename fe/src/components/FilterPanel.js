import React from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { Autocomplete } from "@mui/lab";
import { useRecoilState } from "recoil";
import { filtersState } from "../state";

const shapes = [
  { label: "round", img: "/images/round.jpg" },
  { label: "princess", img: "/images/princess.jpg" },
  { label: "emerald", img: "/images/emerald.jpg" },
  { label: "asscher", img: "/images/emerald.jpg" },
  { label: "marquise", img: "/images/marquise.jpg" },
  { label: "oval", img: "/images/oval.jpg" },
  { label: "radiant", img: "/images/pear.jpg" },
  { label: "pear", img: "/images/pear.jpg" },
  { label: "heart", img: "/images/heart.jpg" },
  { label: "cushion", img: "/images/cushion.jpg" },
];
const colors = ["d", "e", "f", "g", "h", "i", "j"];
const clarities = ["if", "vvs1", "vvs2", "vs1", "vs2", "si1", "si2"];
const cuts = ["excellent", "very good", "good", "fair"];

const FilterPanel = ({}) => {
  const [filters, setFilters] = useRecoilState(filtersState);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Price"
          type="number"
          name="price"
          value={filters.price}
          onChange={handleFilterChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Autocomplete
          options={shapes}
          getOptionLabel={(option) => (option ? option.label.charAt(0).toUpperCase() + option.label.slice(1) : "")}
          renderOption={(props, option) => (
            <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
              <img loading="lazy" width="20" src={option.img} alt={option.label} />
              {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Shape" variant="outlined" />}
          value={filters.shape ? shapes.find((shape) => shape.label === filters.shape) : null}
          onChange={(event, newValue) => {
            handleFilterChange({ target: { name: "shape", value: newValue ? newValue.label : "" } });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Autocomplete
          options={colors}
          getOptionLabel={(option) => (option ? option.toUpperCase() : "")}
          renderInput={(params) => <TextField {...params} label="Color" variant="outlined" />}
          value={filters.color || null}
          onChange={(event, newValue) => {
            handleFilterChange({ target: { name: "color", value: newValue || "" } });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Autocomplete
          options={clarities}
          getOptionLabel={(option) => (option ? option.toUpperCase() : "")}
          renderInput={(params) => <TextField {...params} label="Clarity" variant="outlined" />}
          value={filters.clarity || null}
          onChange={(event, newValue) => {
            handleFilterChange({ target: { name: "clarity", value: newValue || "" } });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Carat"
          type="number"
          name="carat"
          value={filters.carat}
          onChange={handleFilterChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Autocomplete
          options={cuts}
          getOptionLabel={(option) => (option ? option.charAt(0).toUpperCase() + option.slice(1) : "")}
          renderInput={(params) => <TextField {...params} label="Cut" variant="outlined" />}
          value={filters.cut || null}
          onChange={(event, newValue) => {
            handleFilterChange({ target: { name: "cut", value: newValue || "" } });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="isLabDiamond-label">Lab Diamond?</InputLabel>
          <Select
            labelId="isLabDiamond-label"
            name="isLabDiamond"
            value={filters.isLabDiamond}
            onChange={handleFilterChange}
            label="Is Lab Diamond?"
          >
            <MenuItem value="">
              <em>Both</em>
            </MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterPanel;
