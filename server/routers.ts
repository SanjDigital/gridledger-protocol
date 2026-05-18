import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { logMandateSubmission, getMandateSubmissions } from "./mandate";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  mandate: router({
    submit: publicProcedure
      .input(
        z.object({
          institutionName: z.string().min(1, "Institution name required"),
          authorisationLevel: z.enum(["Board", "Risk Committee", "Credit Officer", "IT Operations"]),
          capitalRange: z.enum(["<10M", "10M-100M", "100M-1B", ">1B"]),
          sector: z.string().min(1, "Sector required"),
          modeViewed: z.enum(["Executive", "Technical", "Audit"]).optional(),
          frictionPoint: z.string().optional(),
          anchorLinksOpened: z.array(z.string()).optional(),
          declarationText: z.string().min(1, "Declaration required"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const result = await logMandateSubmission(input, ctx.req);
        return {
          success: result.success,
          submissionId: result.submissionId,
          message: "Mandate submission logged in institutional record",
        };
      }),
    list: publicProcedure.query(async () => {
      const submissions = await getMandateSubmissions(100, 0);
      return submissions;
    }),
  }),
});

export type AppRouter = typeof appRouter;
