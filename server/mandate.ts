import { nanoid } from "nanoid";
import { InsertMandateSubmission, mandateSubmissions } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Log a mandate submission to the immutable audit trail
 * 
 * Every field except anchor_links_opened is required.
 * No submission completes without authorisation_level.
 */
export async function logMandateSubmission(
  data: Omit<InsertMandateSubmission, "submissionId" | "createdAt" | "timestamp">,
  req: any
): Promise<{ submissionId: string; success: boolean }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Generate immutable submission ID
  const submissionId = nanoid();

  // Extract metadata from request
  const userAgent = req.headers["user-agent"] || "";
  const ipAddress = req.ip || req.connection.remoteAddress || "";

  const submission: InsertMandateSubmission = {
    submissionId,
    institutionName: data.institutionName,
    authorisationLevel: data.authorisationLevel,
    capitalRange: data.capitalRange,
    sector: data.sector,
    modeViewed: data.modeViewed || "Executive",
    frictionPoint: data.frictionPoint,
    anchorLinksOpened: data.anchorLinksOpened,
    declarationText: data.declarationText,
    userAgent,
    ipAddress,
  };

  try {
    await db.insert(mandateSubmissions).values(submission);
    return {
      submissionId,
      success: true,
    };
  } catch (error) {
    console.error("[Mandate Log] Failed to log submission:", error);
    throw error;
  }
}

/**
 * Retrieve mandate submissions for audit trail
 * Owner-only access
 */
export async function getMandateSubmissions(limit: number = 100, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const submissions = await db
      .select()
      .from(mandateSubmissions)
      .orderBy((t) => t.timestamp)
      .limit(limit)
      .offset(offset);

    return submissions;
  } catch (error) {
    console.error("[Mandate Log] Failed to retrieve submissions:", error);
    throw error;
  }
}

/**
 * Get mandate submission count
 */
export async function getMandateSubmissionCount(): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.execute(
      "SELECT COUNT(*) as count FROM mandate_submissions"
    );
    return (result[0] as any).count || 0;
  } catch (error) {
    console.error("[Mandate Log] Failed to get count:", error);
    throw error;
  }
}
