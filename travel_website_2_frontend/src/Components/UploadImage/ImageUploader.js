import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {uploadImage} from "./uploadActions";
import {Card, CardActionArea, CardMedia, TextField, Typography} from "@mui/material";
import {Button, Container, Grid} from "@mui/material";


const ImageUploader = (props) => {

    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageName, setImageName] = useState("");
    const {image} = useSelector(state => state.upload);
    const {type} = props

    const handleUploadClick = event => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        setImageData(imageData);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImageWithAdditionalData = () => {
        imageData.append('imageName', imageName);
        dispatch(uploadImage(imageData, type));
    };

    const handleChange = event => {
        setImageName(event.target.value)
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={
                                    imagePreview !== null ?
                                        imagePreview :
                                        "https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg"}
                            />
                        </CardActionArea>
                    </Card>
                    <input
                        accept="image/*"
                        id="upload-profile-image"
                        type="file"
                        onChange={handleUploadClick}
                    />
                    <label htmlFor="upload-profile-image">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                        >
                            Change Image
                        </Button>
                    </label>
                    <TextField
                        fullWidth
                        label="Image Name"
                        margin="dense"
                        name="name"
                        onChange={handleChange}
                        required
                        value={imageName}
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => uploadImageWithAdditionalData()}
                    >
                        Upload Image
                    </Button>
                    <Typography>{image === null ? "Select An Image To Upload" : "Image Uploaded. Saved as " + image}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ImageUploader;