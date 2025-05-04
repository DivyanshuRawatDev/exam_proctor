import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Flex
      bg={"white"}
      color={"black"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"10px"}
      paddingY={"15px"}
      borderBottom={"1px solid grey"}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
    >
      <Text onClick={()=>{navigate("/dashboard")}} fontWeight={700} color={"green.700"} cursor={"pointer"}>
        DASHBOARD
      </Text>
      <Box height="20px" width="2px" bg="grey" borderRadius={"20px"} mx={2} />
      <Text onClick={()=>{navigate("/profile")}} color={"green.700"} fontWeight={700} cursor={"pointer"}>
        PROFILE
      </Text>
    </Flex>
  );
};

export default NavBar;
