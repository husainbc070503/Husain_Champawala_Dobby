import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGlobalContext } from "../context/AppContext";
import SearchBox from "../components/SearchBox";
import AddImageModal from "../components/AddImageModal";
import ImageCard from "../components/ImageCard";

const Index = () => {
  const { user, images } = useGlobalContext();
  const [search, setSearch] = useState("");

  const myImages = images?.filter(
    (item) => item?.user?._id === user?.user?._id
  );

  return (
    <Container className="container" maxWidth="xl">
      <Box>
        <Typography fontSize={30} fontWeight="bold" mb={1}>
          Welcome, {user?.user?.name}
        </Typography>
        <Grid container spacing={2} alignItems="center" my={2}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={26} color="secondary" fontWeight="bold">
              My Images
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={10} xs={12}>
                <SearchBox
                  title="Name"
                  search={search}
                  handleChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <AddImageModal />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {myImages?.length > 0 ? (
          <Grid container spacing={2}>
            {myImages
              ?.filter((item) => item?.name?.toLowerCase().includes(search))
              ?.map((item) => (
                <ImageCard item={item} key={item?._id} />
              ))}
          </Grid>
        ) : (
          <Typography fontSize={20} fontWeight="bold">
            No images added till now. Add some
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Index;
