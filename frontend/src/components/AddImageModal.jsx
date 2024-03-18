import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import NoImage from "../assets/no-image.jpg";
import TextFieldInput from "./TextField";
import { useGlobalContext } from "../context/AppContext";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "96%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const initialState = {
  name: "",
  image: "",
};

const AddImageModal = ({ id }) => {
  const { dispatch, addImage, editImage, images } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [imageDetails, setImageDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) =>
    setImageDetails({ ...imageDetails, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);
    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload vegetable image.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setLoading(false);
      return toast.error("JPEG/PNG images are accepted.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "dobby-ads");
      data.append("class", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (result) {
        toast.success("Image Uploaded", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setImageDetails({ ...imageDetails, image: result.url });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!id) {
        const data = await addImage(imageDetails);
        if (data.success) {
          toast.success("Image Added", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });

          dispatch({ type: "ADD_IMAGE", payload: data.image });
          setImageDetails(initialState);
          setOpen(false);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } else {
        const data = await editImage(imageDetails, id);
        if (data.success) {
          toast.success("Image Updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });

          dispatch({ type: "EDIT_IMAGE", payload: { id, image: data.image } });
          setOpen(false);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setImageDetails(images?.filter((item) => item?._id === id)[0]);
  }, [id]);

  return (
    <div className="d-inline-block">
      {id ? (
        <EditIcon
          className="fs-5 icon"
          color="success"
          onClick={() => setOpen(true)}
        />
      ) : (
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          className="text-light fw-bold"
        >
          Add More
        </Button>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={26} fontWeight="bold" mb={1}>
            {id ? "Edit" : "Add"} Image
          </Typography>
          <div className="image">
            <img
              src={imageDetails?.image ? imageDetails?.image : NoImage}
              alt="image"
            />
            <label htmlFor="add-image">
              {id ? <EditIcon className="fs-5" /> : <AddIcon />}
            </label>
            <input
              type="file"
              id="add-image"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <TextFieldInput
            type="text"
            title="Name"
            others="name"
            value={imageDetails?.name}
            onChange={handleChange}
          />
          <Button
            color="success"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
          >
            {id ? "Edit" : "Add"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddImageModal;
