import { Button, Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Login: React.FC<{}> = ({}) => {
   const router = useRouter();
   const [, login] = useLoginMutation();
   return (
      <Wrapper variant="small">
         <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
               const response = await login(values);

               if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
               } else if (response.data?.login.user) {
                  router.push("/");
               }
            }}
         >
            {({ isSubmitting }) => (
               <Form>
                  <InputField
                     name="usernameOrEmail"
                     placeholder="username Or Email"
                     label="Username or Email"
                  />
                  <Box mt={4}>
                     <InputField
                        name="password"
                        placeholder="password"
                        label="Password"
                        type="password"
                     />
                  </Box>
                  <Button
                     mt={4}
                     isLoading={isSubmitting}
                     colorScheme="facebook"
                     type="submit"
                  >
                     login
                  </Button>
               </Form>
            )}
         </Formik>
      </Wrapper>
   );
};
export default withUrqlClient(createUrqlClient)(Login);
