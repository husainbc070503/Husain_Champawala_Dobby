const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_IMAGES":
      return { ...state, images: [...action.payload] };

    case "ADD_IMAGE":
      return { ...state, images: [...state.images, action.payload] };

    case "EDIT_IMAGE":
      let arr = state.images;
      arr = arr.map((item) => {
        if (item?._id === action.payload.id) return action.payload.image;
        return item;
      });

      return { ...state, images: arr };

    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;
