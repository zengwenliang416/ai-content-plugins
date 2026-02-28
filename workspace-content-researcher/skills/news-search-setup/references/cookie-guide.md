# Cookie Import Guide

## When You Need Cookies

Some platforms require browser authentication cookies to access their API:
- **Twitter/X**: `auth_token` and `ct0` cookies
- **XiaoHongShu**: QR code login via Docker service (no manual cookie needed)
- **Bilibili**: `SESSDATA` and `bili_jct` for premium content (optional)

## Twitter/X Cookie Setup

### Step 1: Install Cookie-Editor

Install [Cookie-Editor](https://cookie-editor.cgagnier.ca/) browser extension (Chrome/Firefox/Edge).

### Step 2: Export Cookies

1. Open [twitter.com](https://twitter.com) or [x.com](https://x.com) in browser
2. Log in to your account
3. Click Cookie-Editor icon in browser toolbar
4. Click **Export** → **Header String** format
5. Copy the entire string

### Step 3: Configure

```bash
bun skills/news-search/scripts/config.ts parse-cookies '<paste-cookie-string-here>'
```

### Step 4: Verify

```bash
bun skills/news-search/scripts/doctor.ts --json
# twitter should show "ok"
```

## Cookie Expiration

- Twitter cookies expire periodically (typically 1-2 weeks)
- If searches start failing with auth errors, re-export and re-import cookies
- doctor.ts will report "error" status when cookies are expired

## Security Notes

- Cookies are stored in `~/.config/news-search/config.json`
- This file should be readable only by your user
- Never share cookie values or commit them to git
