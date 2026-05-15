"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (e: any) {
      setError(e.message || "حدث خطأ");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">مرحبا بك</h1>
          <p className="text-gray-500">سجل دخولك للمتابعة</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50"
        >
          {loading ? "جاري التحميل..." : "تسجيل الدخول بحساب Google"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET"}
          </p>
          <p className="text-xs text-gray-400">
            Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT SET"}
          </p>
        </div>
      </div>
    </div>
  );
}
