import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "node:crypto";
import shellHtml from "../admin/shell.html?raw";

const COOKIE = "cq_admin";

function getPassword() {
  return process.env.ADMIN_PASSWORD || "cityqlo2026";
}

function token() {
  return createHash("sha256")
    .update("cq::" + getPassword())
    .digest("hex");
}

function getCookie(req: Request, name: string) {
  const header = req.headers.get("cookie") || "";
  const match = header.split(/;\s*/).find((c) => c.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

function loginPage(error?: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="robots" content="noindex,nofollow"/>
<title>Cityqlo · Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  :root{--obsidian:#1A1C1E;--pearl:#F3F5F8;--linen:#DBE1E8;--ash:#6B7280;--ink:#1E293B;--logo-blue:#235A90;--accent-gold:#D4A017;}
  *{margin:0;padding:0;box-sizing:border-box;}
  body{min-height:100vh;background:var(--pearl);font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;color:var(--ink);}
  .card{background:#fff;border:0.5px solid var(--linen);padding:42px 38px;width:360px;}
  .mark{display:flex;align-items:center;gap:10px;margin-bottom:28px;}
  .logo-mark{width:32px;height:32px;background:var(--logo-blue);border:1px solid var(--accent-gold);border-radius:2px;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:15px;color:var(--accent-gold);}
  .brand{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:14px;letter-spacing:0.12em;text-transform:uppercase;}
  .sub{font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:var(--ash);margin-top:2px;}
  h1{font-family:'Cormorant Garamond',serif;font-weight:400;font-style:italic;font-size:28px;line-height:1.2;margin-bottom:6px;}
  p.lede{font-size:12px;color:var(--ash);margin-bottom:24px;line-height:1.6;}
  label{display:block;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:var(--ash);margin-bottom:6px;}
  input{width:100%;padding:10px 0;border:0;border-bottom:1px solid var(--linen);font-family:inherit;font-size:14px;color:var(--ink);background:transparent;outline:none;transition:border-color 200ms;}
  input:focus{border-bottom-color:var(--accent-gold);}
  button{margin-top:24px;width:100%;padding:12px;background:var(--obsidian);color:var(--accent-gold);border:0;font-family:inherit;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;cursor:pointer;transition:opacity 200ms;}
  button:hover{opacity:0.9;}
  .err{margin-top:14px;font-size:11px;color:#9b4423;font-style:italic;}
</style></head><body>
<form class="card" method="POST" action="/admin">
  <div class="mark"><div class="logo-mark">CQ</div><div><div class="brand">Cityqlo</div><div class="sub">Admin</div></div></div>
  <h1>Restricted access.</h1>
  <p class="lede">Enter the advisor passphrase to continue.</p>
  <label for="p">Passphrase</label>
  <input id="p" name="password" type="password" autofocus autocomplete="current-password"/>
  ${error ? `<div class="err">${error}</div>` : ""}
  <button type="submit">Unlock Admin →</button>
</form>
</body></html>`;
}

export const Route = createFileRoute("/admin")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const cookie = getCookie(request, COOKIE);
        if (cookie === token()) {
          return new Response(shellHtml as string, {
            status: 200,
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "no-store",
              "X-Robots-Tag": "noindex, nofollow",
            },
          });
        }
        return new Response(loginPage(), {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow",
          },
        });
      },
      POST: async ({ request }) => {
        const form = await request.formData();
        const submitted = String(form.get("password") || "");
        if (submitted && submitted === getPassword()) {
          return new Response(null, {
            status: 303,
            headers: {
              Location: "/admin",
              "Set-Cookie": `${COOKIE}=${token()}; Path=/admin; HttpOnly; SameSite=Lax; Max-Age=43200`,
            },
          });
        }
        return new Response(loginPage("Incorrect passphrase. Try again."), {
          status: 401,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      },
    },
  },
});