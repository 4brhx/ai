import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
        {user.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="w-20 h-20 mx-auto mb-4 rounded-full"
          />
        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {user.user_metadata?.full_name || "مستخدم"}
        </h1>
        <p className="text-gray-500 mb-6">{user.email}</p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700 font-medium">تم تسجيل الدخول بنجاح!</p>
        </div>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            تسجيل الخروج
          </button>
        </form>
      </div>
    </div>
  );
}
