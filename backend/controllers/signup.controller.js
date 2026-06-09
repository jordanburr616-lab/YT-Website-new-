import supabase from "../utils/supabase.js";

export async function handleSignup(req, res) {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email required",
      });
    }

    const { error } = await supabase
      .from("subscribers")
      .insert([
        {
          email,
          source: source || "unknown",
        },
      ]);

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Signup failed",
    });
  }
}