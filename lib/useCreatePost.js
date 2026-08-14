"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Shared by the Feed and Showcase composers so the actual insert + pending/
// error mechanics exist in exactly one place. Each composer owns its own
// field validation (the two forms don't share a shape) and calls
// createPost() with the row to insert once it's already valid.
export function useCreatePost() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function createPost(payload) {
    setPending(true);
    setError("");

    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("posts")
      .insert(payload)
      .select()
      .single();

    setPending(false);

    if (insertError) {
      setError(insertError.message || "Couldn't post right now. Please try again.");
      return null;
    }

    return data;
  }

  return { createPost, pending, error, setError };
}
