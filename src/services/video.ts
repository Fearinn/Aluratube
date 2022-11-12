import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://szaruafpiauzxitymguy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YXJ1YWZwaWF1enhpdHltZ3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjE4NDgsImV4cCI6MTk4Mzc5Nzg0OH0.t0Bfs0pKt2LtGwQb5BE9AB7OoK8hWkdsNs5wqvzHSak";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const videoService = () => {
 return {
    getAllVideos: () => {
      return supabase.from("video").select("*");
    },
  };
}

export default videoService