import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/button";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
   const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
   const [{ data, fetching }] = useMeQuery({
      pause: isServer(),
   });
   let body = null;
   if (fetching) {
   } else if (!data?.me) {
      body = (
         <>
            <NextLink href="/login">
               <Link mr={2}>Login</Link>
            </NextLink>
            <NextLink href="/register">
               <Link>Register</Link>
            </NextLink>
         </>
      );
   } else {
      body = (
         <Flex alignItems="center">
            <Box mr={4}>{data.me.username}</Box>
            <Button
               isLoading={logoutFetching}
               onClick={() => logout()}
               colorScheme="link"
            >
               Logout
            </Button>
         </Flex>
      );
   }

   return (
      <Flex bg="tan" p={4}>
         <Box ml="auto">{body}</Box>
      </Flex>
   );
};
