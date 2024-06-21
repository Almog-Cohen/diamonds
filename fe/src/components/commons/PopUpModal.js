import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const boxStyle = {
  width: "50%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

const PopUpModal = ({ open, handleClose, imageUrl, shape }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={style}
    >
      <Box sx={boxStyle}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Diamond Image
        </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
          Shape: {shape.charAt(0).toUpperCase() + shape.slice(1)}
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
            borderRadius: 4,
            mt: 2,
          }}
          alt="Diamond Shape"
          src={imageUrl}
        />
      </Box>
    </Modal>
  );
};

export default PopUpModal;
