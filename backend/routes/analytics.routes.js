import express from "express";
import supabase from "../utils/supabase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { event_name, page, metadata = {}, session_id } = req.body;

    if (!event_name) {
      return res.status(400).json({
        error: "event_name is required",
      });
    }

    const userAgent = req.headers["user-agent"] || null;

    const { error } = await supabase
      .from("analytics_events")
      .insert([
        {
          event_name,
          page,
          metadata,
          session_id,
          user_agent: userAgent,
        },
      ]);

    if (error) {
      console.error(error);

      return res.status(500).json({
        error: "Failed to save analytics event",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error("Analytics error:", err);

    res.status(500).json({
      error: "Analytics failed",
    });
  }
});

export default router;