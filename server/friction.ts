import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { InsertFrictionAnalytic, frictionAnalytics } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Log a friction analytics event
 * 
 * Three events matter:
 * 1. Mode selection - which view does institutional reader select first?
 * 2. Anchor link opens - which external sources are accessed, when?
 * 3. Friction point interaction - time spent on 720h vs 24h reconciliation
 */
export async function logFrictionEvent(
  data: Omit<InsertFrictionAnalytic, "eventId" | "timestamp">,
  req: any
): Promise<{ eventId: string; success: boolean }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const eventId = nanoid();
  const userAgent = req.headers["user-agent"] || "";
  const ipAddress = req.ip || req.connection.remoteAddress || "";

  const event: InsertFrictionAnalytic = {
    eventId,
    eventType: data.eventType,
    modeSelected: data.modeSelected,
    anchorLinkType: data.anchorLinkType,
    sectionName: data.sectionName,
    durationMs: data.durationMs,
    scrollPosition: data.scrollPosition,
    sessionId: data.sessionId,
    userAgent,
    ipAddress,
  };

  try {
    await db.insert(frictionAnalytics).values(event);
    return {
      eventId,
      success: true,
    };
  } catch (error) {
    console.error("[Friction Analytics] Failed to log event:", error);
    throw error;
  }
}

/**
 * Analyze friction points from the audit trail
 * Returns where institutional belief breaks
 */
export async function analyzeFrictionPoints() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Get mode selection patterns
    const modeSelections = await db.execute(
      `SELECT 
        mode_selected, 
        COUNT(*) as count,
        AVG(UNIX_TIMESTAMP(timestamp)) as avg_timestamp
      FROM friction_analytics 
      WHERE event_type = 'mode_selection'
      GROUP BY mode_selected
      ORDER BY count DESC`
    );

    // Get anchor link access patterns
    const anchorLinkAccess = await db.execute(
      `SELECT 
        anchor_link_type, 
        COUNT(*) as count,
        AVG(scroll_position) as avg_scroll_position
      FROM friction_analytics 
      WHERE event_type = 'anchor_link_open'
      GROUP BY anchor_link_type
      ORDER BY count DESC`
    );

    // Get friction point dwell times
    const frictionPointDwell = await db.execute(
      `SELECT 
        section_name,
        COUNT(*) as interactions,
        AVG(duration_ms) as avg_dwell_ms,
        MAX(duration_ms) as max_dwell_ms,
        MIN(duration_ms) as min_dwell_ms
      FROM friction_analytics 
      WHERE event_type IN ('friction_point_enter', 'friction_point_exit')
      GROUP BY section_name
      ORDER BY avg_dwell_ms DESC`
    );

    // Get form conversion rates
    const formEvents = await db.execute(
      `SELECT 
        event_type,
        COUNT(*) as count
      FROM friction_analytics 
      WHERE event_type IN ('form_start', 'form_submit', 'form_abandon')
      GROUP BY event_type`
    );

    return {
      modeSelections,
      anchorLinkAccess,
      frictionPointDwell,
      formEvents,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[Friction Analytics] Failed to analyze:", error);
    throw error;
  }
}

/**
 * Get friction events for a specific session
 */
export async function getSessionFrictionEvents(sessionId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const events = await db
      .select()
      .from(frictionAnalytics)
      .where(eq(frictionAnalytics.sessionId, sessionId))
      .orderBy(frictionAnalytics.timestamp);

    return events;
  } catch (error) {
    console.error("[Friction Analytics] Failed to get session events:", error);
    throw error;
  }
}
