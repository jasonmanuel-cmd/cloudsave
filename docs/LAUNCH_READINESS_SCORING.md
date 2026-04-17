# Launch Readiness Scoring Rubric

**Use:** Score each category **0–3** after intake + implementation. Sum for a **total score / 39**. Use thresholds below to decide go / no-go.

**Scale**

| Score | Meaning |
|-------|--------|
| **0** | Missing or wrong; blocks launch or compliance |
| **1** | Partial; risky for SEO, trust, or ops |
| **2** | Good enough to launch with a documented follow-up |
| **3** | Complete, verified, and consistent |

---

## Categories (13 × max 3 = 39)

### A. Entity & NAP
- **0–3:** Legal name, public name, address or explicit service-area-only statement, phone, email, hours—all **identical** across site footer, contact, and planned GBP.

### B. Fulfillment model
- **0–3:** Clear split: what is local-only vs nationwide; no contradictory checkout copy.

### C. Compliance copy
- **0–3:** Age, ID, no cannabis shipping, returns—**client-approved** text on legal/support pages.

### D. Technical bootability
- **0–3:** Repo runs locally; `npm install` + dev build succeed; no broken `@/` imports.

### E. Security (APIs)
- **0–3:** Webhooks verified; alert/side-effect routes authenticated or rate-limited as agreed.

### F. SEO foundation
- **0–3:** `robots`, `sitemap`, unique titles/descriptions on key URLs; canonicals where needed.

### G. Structured data
- **0–3:** JSON-LD validates; business type matches reality; no fake fields (e.g. fake phone).

### H. Internal linking
- **0–3:** Intent pages (local vs shop vs FAQ/legal) linked from home and nav.

### I. GBP / citations alignment
- **0–3:** GBP categories + service area documented; NAP matches site; duplicates noted.

### J. Analytics & Search Console
- **0–3:** GA4 + GSC property ready or plan + owner named.

### K. Content completeness
- **0–3:** FAQ covers real questions; about/contact not placeholder-only.

### L. Performance & UX (smoke)
- **0–3:** Home + shop + checkout path load; no console errors on critical path.

### M. Launch owner
- **0–3:** Named person for post-launch fixes, key rotation, and content updates.

---

## Total score → decision

| Total | Guidance |
|-------|----------|
| **34–39** | **Green:** Launch; only polish in backlog. |
| **26–33** | **Yellow:** Launch only if remaining gaps are non-blocking and ticketed with owners/dates. |
| **18–25** | **Red:** Delay launch until Critical path items (A–E minimum) reach 2+. |
| **0–17** | **Stop:** Fix foundation (repo, NAP, compliance, security) before public URL. |

---

## Minimum bar (hard gates)

Do **not** launch public marketing to a cold audience if any of these are **0**:

- **A** Entity & NAP  
- **C** Compliance copy (client-approved)  
- **D** Technical bootability  
- **E** Security for payment/webhooks/alerts  

---

## Quick checklist (tick when true)

- [ ] Intake questionnaire returned with Section 1–4 filled or explicitly N/A with approver  
- [ ] NAP matches footer + contact + GBP plan  
- [ ] Legal page reviewed by client or counsel  
- [ ] Repo builds; preview URL signed off  
- [ ] Post-launch owner named  

---

*Revise thresholds with your agency’s risk tolerance; this is a default COAI-style gate.*
