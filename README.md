## ✅ Prerequisites

* You already ran: `npx create-next-app@latest`
* Your project uses the **App Router** (`src/app/` structure)
* You have Google credentials from [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

---

## ✅ 1. Install NextAuth

```bash
npm install next-auth
```

---

## ✅ 2. Setup `.env.local`

Create `.env.local` in your root:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_string
NEXTAUTH_URL=http://localhost:3000
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

---

## ✅ 3. Create NextAuth route (API)

**File:** `src/app/api/auth/[...nextauth]/route.ts`

```ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
```

---

## ✅ 4. Create a Client-Side `<SessionProviderWrapper />`

**File:** `src/components/SessionProviderWrapper.tsx`

```tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

---

## ✅ 5. Wrap your app with session provider

**Update:** `src/app/layout.tsx`

```tsx
import "./globals.css";
import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Google Sign-In App",
  description: "Google auth using NextAuth + App Router",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
```

---

## ✅ 6. Create Google Sign-In UI in a Client Component

**File:** `src/components/GoogleAuthClient.tsx`

```tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function GoogleAuthClient() {
  const { data: session } = useSession();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {session?.user ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <img
            src={session.user.image || ""}
            alt="profile"
            width={60}
            style={{ borderRadius: "50%" }}
          />
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )}
    </div>
  );
}
```

---

## ✅ 7. Show the UI on the homepage

**Update:** `src/app/page.tsx`

```tsx
import GoogleAuthClient from "@/components/GoogleAuthClient";

export default function Home() {
  return (
    <main>
      <GoogleAuthClient />
    </main>
  );
}
```

---

## ✅ 8. Run your app

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## ✅ What You’ve Got

| Feature             | Status |
| ------------------- | ------ |
| Google Sign-In      | ✅      |
| App Router support  | ✅      |
| Secure Session flow | ✅      |
| Working Client Hook | ✅      |
| No server errors    | ✅      |

