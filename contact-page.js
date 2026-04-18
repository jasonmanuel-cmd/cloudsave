/**
 * Contact funnel → Next.js /api/contact (Supabase contact_leads).
 * Build with VITE_CONTACT_API_URL=https://your-next-deployment.example (no trailing slash).
 */

const baseUrl = (import.meta.env.VITE_CONTACT_API_URL || '').replace(/\/$/, '');
const apiUrl = baseUrl ? `${baseUrl}/api/contact` : '';

const state = {
  intent: '',
  category: '',
  name: '',
  email: '',
  message: '',
};

function $(id) {
  return document.getElementById(id);
}

function showStep(n) {
  for (let i = 1; i <= 3; i += 1) {
    const el = $(`funnel-step-${i}`);
    if (el) el.hidden = i !== n;
  }
  for (let i = 1; i <= 3; i += 1) {
    const dot = $(`funnel-dot-${i}`);
    if (dot) dot.classList.toggle('active', i <= n);
  }
}

function setStatus(kind, text) {
  const box = $('funnel-status');
  if (!box) return;
  box.hidden = kind === 'idle';
  box.dataset.kind = kind;
  box.textContent = text || '';
}

function wire() {
  const missing = $('contact-api-missing');
  const formWrap = $('contact-funnel-root');
  if (!apiUrl) {
    if (missing) missing.hidden = false;
    if (formWrap) formWrap.hidden = true;
    return;
  }
  if (missing) missing.hidden = true;
  if (formWrap) formWrap.hidden = false;

  $('pick-customer')?.addEventListener('click', () => {
    state.intent = 'Customer';
    showStep(2);
  });
  $('pick-business')?.addEventListener('click', () => {
    state.intent = 'Business';
    showStep(2);
  });

  $('pick-store')?.addEventListener('click', () => {
    state.category = 'Store / Reservation';
    showStep(3);
  });
  $('pick-bizcat')?.addEventListener('click', () => {
    state.category = 'Business / Wholesale';
    showStep(3);
  });

  $('funnel-back-2')?.addEventListener('click', () => showStep(1));
  $('funnel-back-3')?.addEventListener('click', () => showStep(2));

  $('contact-funnel-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    state.name = ($('field-name')?.value || '').trim();
    state.email = ($('field-email')?.value || '').trim();
    state.message = ($('field-message')?.value || '').trim();

    if (!state.intent || !state.category || !state.name || !state.email || !state.message) {
      setStatus('error', 'Complete all steps and fields.');
      return;
    }

    const btn = $('funnel-submit');
    if (btn) btn.disabled = true;
    setStatus('idle', '');

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: state.intent,
          category: state.category,
          name: state.name,
          email: state.email,
          message: state.message,
          source: 'vite_contact',
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      $('contact-funnel-root').hidden = true;
      const ok = $('funnel-success');
      if (ok) ok.hidden = false;
    } catch (err) {
      console.error(err);
      setStatus('error', err.message || 'Something went wrong. Try again or use Instagram.');
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  $('funnel-reset')?.addEventListener('click', () => {
    state.intent = '';
    state.category = '';
    state.name = '';
    state.email = '';
    state.message = '';
    const form = $('contact-funnel-form');
    if (form) form.reset();
    $('funnel-success').hidden = true;
    $('contact-funnel-root').hidden = false;
    showStep(1);
    setStatus('idle', '');
  });

  showStep(1);
}

document.addEventListener('DOMContentLoaded', wire);
