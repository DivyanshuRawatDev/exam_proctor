import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Image,
  Text,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { fetchUploadImage } from "../redux/slices/user.slice";
import { useNavigate } from "react-router";

const ProofImg = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("proof_id", image);

    try {
      const result = await dispatch(fetchUploadImage(formData)).unwrap();
      if (result) {
        navigate("/camera-verify");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box p={6} maxW="400px" mx="auto" boxShadow="md" borderRadius="md">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          Upload Your ID Proof
        </Text>

        <Input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <Image
            src={preview}
            alt="ID Preview"
            boxSize="200px"
            objectFit="cover"
            borderRadius="md"
            border="1px solid #ccc"
          />
        )}

        <Button
          colorScheme="teal"
          onClick={handleUpload}
          isDisabled={!image || isUploading}
        >
          {isUploading ? <Spinner size="sm" /> : "Upload"}
        </Button>
      </VStack>
    </Box>
  );
};

export default ProofImg;
