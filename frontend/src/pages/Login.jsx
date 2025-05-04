import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { fetchUserLogin } from "../redux/slices/user.slice";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isError } = useSelector((store) => store.user);

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
    dispatch(fetchUserLogin(userData))
      .then((data) => {
        console.log(data,"asxasdasdasxsdsdsaccdccdcdcdcdc")
        if(data.payload.data.role=="admin"){
        navigate('/admin')
        }else{
          navigate("/img-proof"); 
        }
        
        toast.success(data?.payload?.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      px={4}
      // bgImage="url('https://images.pexels.com/photos/1118667/pexels-photo-1118667.jpeg?cs=srgb&dl=pexels-cody-king-433493-1118667.jpg&fm=jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
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
            LOGIN
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="10px">
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
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? <Spinner size="md" color="green.500" /> : "LOGIN"}
          </Button>
          <Text color={"black"}>new here? <span onClick={()=>{navigate("/signup")}} style={{color:"blue"}}>Signup</span></Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
