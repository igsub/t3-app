import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getFirst: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst();
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number().min(1),
        name: z.string().min(1),
        email: z.string().email().min(3),
        password: z.string().min(4)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: { 
          name: input.name,
          email: input.email,
          password: input.password
        }
      })

      return user
    })
});
