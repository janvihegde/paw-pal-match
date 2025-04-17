
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

// Set up CORS headers for browser access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Create a Supabase client with the service role key (admin access)
    // This allows us to bypass RLS policies
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    if (req.method === "POST") {
      const { email } = await req.json();

      if (!email) {
        return new Response(
          JSON.stringify({ error: "Email is required" }),
          {
            status: 400,
            headers: { ...corsHeaders },
          }
        );
      }

      // Find the user by email
      const { data: users, error: userError } = await supabaseClient
        .from("auth.users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (userError || !users) {
        console.error("Error finding user:", userError);
        return new Response(
          JSON.stringify({ error: "Failed to find user" }),
          {
            status: 404,
            headers: { ...corsHeaders },
          }
        );
      }

      const userId = users.id;

      // Get the admin role id
      const { data: roles, error: roleError } = await supabaseClient
        .from("roles")
        .select("id")
        .eq("role_name", "admin")
        .single();

      if (roleError || !roles) {
        console.error("Error finding admin role:", roleError);
        return new Response(
          JSON.stringify({ error: "Failed to find admin role" }),
          {
            status: 500,
            headers: { ...corsHeaders },
          }
        );
      }

      const adminRoleId = roles.id;

      // Check if the user already has the admin role
      const { data: existingRole, error: existingRoleError } = await supabaseClient
        .from("user_roles")
        .select("id")
        .eq("user_id", userId)
        .eq("role_id", adminRoleId)
        .maybeSingle();

      if (!existingRoleError && existingRole) {
        return new Response(
          JSON.stringify({ message: "User already has admin role", success: true }),
          {
            status: 200,
            headers: { ...corsHeaders },
          }
        );
      }

      // Assign admin role to the user
      const { error: insertError } = await supabaseClient
        .from("user_roles")
        .insert([
          { user_id: userId, role_id: adminRoleId }
        ]);

      if (insertError) {
        console.error("Error assigning admin role:", insertError);
        return new Response(
          JSON.stringify({ error: "Failed to assign admin role" }),
          {
            status: 500,
            headers: { ...corsHeaders },
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          message: "Admin role assigned successfully",
          success: true 
        }),
        {
          status: 200,
          headers: { ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders },
      }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders },
      }
    );
  }
});
