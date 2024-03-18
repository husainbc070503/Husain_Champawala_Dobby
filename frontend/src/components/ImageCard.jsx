import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import AddImageModal from "./AddImageModal";
import { useGlobalContext } from "../context/AppContext";

const ImageCard = ({ item }) => {
  const { deleteImage } = useGlobalContext();
  const { _id, name, image } = item;

  return (
    <Grid item md={3} xs={12}>
      <Card>
        <CardMedia
          sx={{ height: 200 }}
          component="img"
          src={image}
          alt={name}
        />
        <CardContent>
          <Typography
            fontSize={30}
            fontWeight="bold"
            mb={-4}
            textAlign="center"
          >
            {name}
          </Typography>
        </CardContent>
        <div className="text-end p-2">
          <AddImageModal id={_id} />
          <DeleteIcon
            className="fs-5 icon"
            color="error"
            onClick={() => deleteImage(_id)}
          />
        </div>
      </Card>
    </Grid>
  );
};

export default ImageCard;
