import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  CardMedia,
  CardHeader,
  Divider,
} from "@mui/material";
import PopUpModal from "./commons/PopUpModal";
import StarIcon from "@mui/icons-material/Star";

// Shape images from Brilliance
const shapeImages = {
  round: "/images/round.jpg",
  princess: "/images/princess.jpg",
  emerald: "/images/emerald.jpg",
  asscher: "/images/emerald.jpg",
  marquise: "/images/marquise.jpg",
  oval: "/images/oval.jpg",
  radiant: "/images/pear.jpg",
  pear: "/images/pear.jpg",
  heart: "/images/heart.jpg",
  cushion: "/images/cushion.jpg",
};

const DiamondList = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentShape, setCurrentShape] = useState("");

  const handleOpenModal = (imageUrl, shape) => {
    setCurrentImage(imageUrl);
    setCurrentShape(shape);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentImage("");
    setCurrentShape("");
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {data.diamonds.map((diamond) => (
          <Grid item xs={12} sm={6} md={4} key={diamond.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardHeader
                avatar={<StarIcon color={diamond.isLabDiamond ? "primary" : "disabled"} />}
                title={
                  <Typography variant="h6" component="div">
                    {diamond.shape.charAt(0).toUpperCase() + diamond.shape.slice(1)}
                  </Typography>
                }
              />
              <CardMedia component="img" height="200" image={shapeImages[diamond.shape]} alt={diamond.shape} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Price: ${diamond.price.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Color: {diamond.color.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clarity: {diamond.clarity.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Carat: {diamond.carat}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cut: {diamond.cut.charAt(0).toUpperCase() + diamond.cut.slice(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lab Diamond: {diamond.isLabDiamond ? "Yes" : "No"}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleOpenModal(shapeImages[diamond.shape], diamond.shape)}
                >
                  View Image
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <PopUpModal open={modalOpen} handleClose={handleCloseModal} imageUrl={currentImage} shape={currentShape} />
    </Box>
  );
};

export default DiamondList;
