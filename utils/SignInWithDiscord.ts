import { supabase } from "./supabaseClient";

export default async function signInWithDiscord(loc: any) {
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
