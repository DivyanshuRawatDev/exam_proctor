import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSignup } from "../redux/slices/user.slice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(fetchUserSignup(userData))
      .then((data) => {
        toast.success(data?.payload?.message);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex
      className="singup-background"
      minH="100vh"
      align="center"
      justify="center"
      bgImage="url('https://images.pexels.com/photos/1118667/pexels-photo-1118667.jpeg?cs=srgb&dl=pexels-cody-king-433493-1118667.jpg&fm=jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      px={4}
    >
      <Box
        bg="white"
        w={{ base: "100%", sm: "80%", md: "30%" }}
        p={10}
       
        borderRadius="lg"
        boxShadow="lg"
      >
        <Box marginBottom="20px" textAlign="center">
          <Text fontSize="2xl" color="green.600" fontWeight={600}>
            SIGNUP
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="10px">
          <Input
            placeholder="username"
            variant="outline"
            focusBorderColor="green.400"
            value={userData.username}
            onChange={(e) => handleValueChange(e)}
            name="username"
            color={"black"}
          />
          <Input
            placeholder="email"
            variant="outline"
            focusBorderColor="green.400"
            value={userData.email}
            onChange={(e) => handleValueChange(e)}
            name="email"
            color={"black"}
          />
          <Input
            placeholder="password"
            variant="outline"
            focusBorderColor="green.400"
            value={userData.password}
            onChange={(e) => handleValueChange(e)}
            name="password"
            color={"black"}
          />
        </Box>

        <Box marginTop="20px">
          <Button
            w="100%"
            bg="#4da73d"
            color="white"
            _hover={{ bg: "#3d8c2f" }}
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="md" color="green.500" /> : "SIGNUP"}
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
