import { MutationResolvers as ResolverTypes } from "../generated/types";
import { comparePassword, generateToken, hashPassword } from "@/lib/utils/auth";

const MutationResolvers: ResolverTypes = {
  register: async (_parent, args, context) => {
    const { prisma } = context;
    const { email, password, name } = args;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return {
      token: generateToken(user.id),
      user,
    };
  },
  login: async (_parent, args, context) => {
    const { prisma } = context;
    const { email, password } = args;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("No such user found");

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    return {
      token: generateToken(user.id),
      user,
    };
  },
};

export default MutationResolvers;
