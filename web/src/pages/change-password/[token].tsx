import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import router from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import login from "../login";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
   return (
      <div>
         <Wrapper variant="small">
            <Formik
               initialValues={{
                  newPassword: "",
               }}
               onSubmit={async (values, { setErrors }) => {
                  // const response = await login(values);
                  // if (response.data?.login.errors) {
                  //    setErrors(
                  //       toErrorMap(response.data.login.errors)
                  //    );
                  // } else if (response.data?.login.user) {
                  //    router.push("/");
                  // }
               }}
            >
               {({ isSubmitting }) => (
                  <Form>
                     <InputField
                        name="newPassword"
                        placeholder="New Password"
                        label="New Password"
                        type="password"
                     />

                     <Button
                        mt={4}
                        isLoading={isSubmitting}
                        colorScheme="facebook"
                        type="submit"
                     >
                        Change Password
                     </Button>
                  </Form>
               )}
            </Formik>
         </Wrapper>
      </div>
   );
};

ChangePassword.getInitialProps = ({ query }) => {
   return {
      token: query.token as string,
   };
};
export default ChangePassword;
