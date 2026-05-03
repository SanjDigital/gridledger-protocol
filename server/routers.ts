import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { logMandateSubmission, getMandateSubmissions } from "./mandate";
import { logFrictionEvent, analyzeFrictionPoints } from "./friction";

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

  // Mandate submission logging (public - creates institutional record)
  mandate: router({
    submit: publicProcedure
      .input(
        z.object({
          institutionName: z.string().min(1),
          authorisationLevel: z.enum([
            "Board",
            "Risk Committee",
            "Credit Officer",
            "IT Operations",
          ]),
          capitalRange: z.enum(["<10M", "10M-100M", "100M-1B", ">1B"]),
          sector: z.string().min(1),
          modeViewed: z.enum(["Executive", "Technical", "Audit"]).optional(),
          frictionPoint: z.string().optional(),
          anchorLinksOpened: z.array(z.string()).optional(),
          declarationText: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await logMandateSubmission(input, ctx.req);
      }),

    // Get submissions (owner only)
    list: protectedProcedure
      .input(
        z.object({
          limit: z.number().default(100),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await getMandateSubmissions(input.limit, input.offset);
      }),
  }),

  // Friction analytics logging (public - audit trail)
  friction: router({
    logEvent: publicProcedure
      .input(
        z.object({
          eventType: z.enum([
            "mode_selection",
            "anchor_link_open",
            "friction_point_enter",
            "friction_point_exit",
            "form_start",
            "form_submit",
            "form_abandon",
          ]),
          modeSelected: z.enum(["Executive", "Technical", "Audit"]).optional(),
          anchorLinkType: z
            .enum(["audit_trail", "cycle_data", "cycle_replay"])
            .optional(),
          sectionName: z.string().optional(),
          durationMs: z.number().optional(),
          scrollPosition: z.number().optional(),
          sessionId: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return await logFrictionEvent(input, ctx.req);
      }),

    // Analyze friction points (owner only)
    analyze: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await analyzeFrictionPoints();
    }),
  }),
});

export type AppRouter = typeof appRouter;
