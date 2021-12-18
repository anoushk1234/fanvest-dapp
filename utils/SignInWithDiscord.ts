import { supabase } from "./supabaseClient";

export default async function signInWithDiscord(loc: any) {
  console.log("signInWithDiscord", loc);
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: "discord",
    },
    {
      redirectTo: loc,
    }
  );
  return { user, session, error };
}
