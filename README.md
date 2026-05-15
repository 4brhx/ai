# نظام تسجيل الدخول بحساب Google

نظام مصادقة باستخدام Google OAuth عبر Supabase و Next.js، جاهز للنشر على Vercel.

## التقنيات المستخدمة

- **Next.js 14** - إطار عمل React
- **Supabase** - قاعدة البيانات والمصادقة
- **Tailwind CSS** - التصميم
- **Vercel** - الاستضافة

## إعداد المشروع

### 1. تثبيت المتطلبات

```bash
npm install
```

### 2. إعداد متغيرات البيئة

أنشئ ملف `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://svwcyzlxokckahkonyrb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 3. إعداد Google OAuth في Supabase

1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك > Authentication > Providers
3. فعّل Google
4. أضف Client ID و Client Secret من Google Cloud Console:
   - Client ID: `YOUR_GOOGLE_CLIENT_ID`
   - Client Secret: `YOUR_GOOGLE_CLIENT_SECRET`

### 4. إعداد Redirect URI في Google Cloud Console

أضف هذا الرابط في Google Cloud Console > OAuth 2.0 Client > Authorized redirect URIs:

```
https://svwcyzlxokckahkonyrb.supabase.co/auth/v1/callback
```

### 5. تشغيل المشروع محلياً

```bash
npm run dev
```

## النشر على Vercel

### 1. ربط المستودع بـ Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. اربط حساب GitHub
3. Import المستودع `4brhx/ai`

### 2. إضافة متغيرات البيئة في Vercel

أضف المتغيرات التالية في Vercel Dashboard > Settings > Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL` = `https://svwcyzlxokckahkonyrb.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = مفتاح Anon Key من Supabase

### 3. تحديث Redirect URI

بعد النشر، أضف رابط الموقع في:
- Google Cloud Console: `https://YOUR-DOMAIN.vercel.app` في Authorized JavaScript Origins
- Supabase Dashboard > Authentication > URL Configuration > Site URL: `https://YOUR-DOMAIN.vercel.app`

## هيكل المشروع

```
src/
├── app/
│   ├── auth/
│   │   ├── callback/route.ts  # معالجة OAuth callback
│   │   └── signout/route.ts   # تسجيل الخروج
│   ├── login/page.tsx          # صفحة تسجيل الدخول
│   ├── page.tsx                # الصفحة الرئيسية (محمية)
│   ├── layout.tsx              # التخطيط العام
│   └── globals.css             # الأنماط
├── lib/
│   └── supabase/
│       ├── client.ts           # Supabase client (browser)
│       └── server.ts           # Supabase client (server)
└── middleware.ts               # حماية الصفحات
```
