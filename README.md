# iiseneu.org

The website for IISE at Northeastern University, the Northeastern chapter of the
Institute of Industrial & Systems Engineers. Live at **https://iiseneu.org**.

This guide is for whoever runs the site. You don't need to know how to code: edits are
made by asking Claude Code for changes in plain English, checking them in a preview, and
publishing when they look right.

## Who owns what

Everything is owned by the club, through the club Gmail
(**iisenortheastern@gmail.com**), so nothing depends on one person's accounts.

| What | Where | Owner login |
|---|---|---|
| Code and hosting | GitHub repo `IISENEU/site`, published with GitHub Pages | GitHub account **IISENEU** |
| Domain `iiseneu.org` | Cloudflare (registrar and DNS) | Cloudflare account under the club Gmail |
| Visitor stats | Cloudflare Web Analytics | Same Cloudflare account |
| Google search listing | Google Search Console | Club Gmail (verified owner) |

Passwords, the IISENEU two-factor setup key, and its recovery codes are kept wherever
the club stores shared logins. Get them from the outgoing webmaster at handoff.

**Domain renewal:** iiseneu.org is paid through **October 8, 2027** and set to
auto-renew. Auto-renew only works if the club's Cloudflare account has a payment method
on file (Manage Account → Billing). Check this before every October.

**Don't change** the DNS records in Cloudflare unless you know why. All of them are
"DNS only" (grey cloud):

| Type | Name | Points to |
|---|---|---|
| A ×4 | iiseneu.org | 185.199.108.153, .109.153, .110.153, .111.153 (GitHub Pages) |
| CNAME | www | iiseneu.github.io |
| TXT ×2 | iiseneu.org | `google-site-verification=…` (Search Console ownership) |

## Getting set up (new webmaster)

1. Get a GitHub account, and have the outgoing webmaster add it as a collaborator:
   sign in as IISENEU → `site` repo → Settings → Collaborators → Add people.
2. Install the Claude desktop app (or Claude Code in a terminal) and git.
3. Clone the repo: `git clone https://github.com/IISENEU/site.git`, then open that folder
   in Claude Code. Claude reads `CLAUDE.md` automatically, so it already knows how the
   site is built and the rules to follow.
4. Ask Claude to start the preview. The site opens at http://localhost:8765 and updates
   as you make changes.

## Making changes

1. Ask for what you want ("add a resume workshop on Feb 3 at 6 pm in IV 022", "swap
   Jane's headshot for this photo", "make the buttons a bit rounder").
2. Look at the preview at computer and phone sizes.
3. When you're happy, say "push". It goes live at iiseneu.org within a minute or two.
   If a page still looks old, refresh it.

Things that usually need updating each semester:

- **Events:** the full list for the new semester (dates, times, rooms).
- **Leadership:** names, roles, headshots, and LinkedIn links for the new e-board.
- **Semester project:** the new client, with the previous one moved to "Past projects".
- **Certifications:** when the next Lean or Six Sigma Green Belt course is announced.
- **Meeting time or room**, if it changes.

## Unfinished work

**Mailing list:** a finished set of "Join the mailing list" buttons is saved on the
`mailing-list` branch but isn't live yet, because the sign-up form doesn't exist.
Once it does, ask Claude to "finish the mailing list on the mailing-list branch with
this link: …".

## Handing off to the next webmaster

- [ ] Add the new person to the `site` repo as a collaborator.
- [ ] Share the IISENEU GitHub login, its two-factor setup key, and recovery codes.
- [ ] Share the club Gmail login (it owns Cloudflare and Search Console).
- [ ] Check the Cloudflare payment method and the domain's auto-renew.
- [ ] Have them make one small change, push it, and see it live while you're around.
- [ ] Remove your own access once they're set up.
