import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
   if (options.username.length <= 2) {
      return [
         {
            field: "username",
            message: "length must be greater than 2",
         },
      ];
   }
   if (!options.email.includes("@")) {
      return [
         {
            field: "email",
            message: "invalid Email",
         },
      ];
   }
   if (options.username.includes("@")) {
      return [
         {
            field: "username",
            message: "cannot include an @",
         },
      ];
   }

   if (options.password.length <= 2) {
      return [
         {
            field: "password",
            message: "length must be greater than 2",
         },
      ];
   }

   return null;
};