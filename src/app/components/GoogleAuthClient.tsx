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
          <button 
           style={{
          background: "#e8098bff",
          color: "#ff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }} 
          onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button style={{
          background: "#35eac6ff",
          color: "#000",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }} onClick={() => signIn("google")}>Sign in with Google</button>
      )}
    </div>
  );
}
