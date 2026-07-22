import { DefaultSession } from "next-auth";
import { Role, UserStatus } from "@/generated/prisma/enums";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      status: UserStatus;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
    status?: UserStatus;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    uid: string;
    role: Role;
    status: UserStatus;
  }
}
