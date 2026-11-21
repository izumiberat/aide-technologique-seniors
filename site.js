// Formulaire de contact (Formspree) : envoi sans quitter la page, messages dans la langue de la page.
(function () {
  var MSG = {
    fr: { sending: 'Envoi en cours…', sent: '✓ Message envoyé', thanks: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.', retry: 'Erreur – Réessayer', error: "L'envoi n'a pas fonctionné. Appelez-moi directement au 07 84 52 99 22." },
    en: { sending: 'Sending…', sent: '✓ Message sent', thanks: 'Thank you for your message! I will get back to you very soon.', retry: 'Error – Try again', error: 'Your message could not be sent. Please call me directly on +33 7 84 52 99 22.' },
    ja: { sending: '送信中…', sent: '✓ 送信しました', thanks: 'お問い合わせありがとうございます。できるだけ早くご連絡いたします。', retry: 'エラー – もう一度お試しください', error: '送信できませんでした。お手数ですが、お電話（+33 7 84 52 99 22）でご連絡ください。' }
  };
  var t = MSG[(document.documentElement.lang || 'fr').slice(0, 2)] || MSG.fr;
  var form = document.getElementById('techAidForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.textContent;
    btn.textContent = t.sending;
    btn.disabled = true;
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('network');
        btn.textContent = t.sent;
        btn.style.backgroundColor = 'var(--success-color)';
        setTimeout(function () {
          form.reset();
          btn.textContent = label;
          btn.style.backgroundColor = '';
          btn.disabled = false;
          var p = document.createElement('p');
          p.setAttribute('role', 'status');
          p.style.cssText = 'color: var(--success-color); font-weight: bold; text-align: center; margin-top: 1rem;';
          p.textContent = t.thanks;
          form.appendChild(p);
          p.scrollIntoView({ behavior: 'smooth' });
          setTimeout(function () { p.remove(); }, 5000);
        }, 1500);
      })
      .catch(function () {
        btn.textContent = t.retry;
        btn.style.backgroundColor = 'var(--accent-color)';
        setTimeout(function () {
          btn.textContent = label;
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 2000);
        var err = form.querySelector('.form-error');
        if (!err) {
          err = document.createElement('p');
          err.className = 'form-error';
          err.setAttribute('role', 'alert');
          err.style.cssText = 'color: var(--accent-color); font-weight: 700; text-align: center; margin-top: 1rem;';
          form.appendChild(err);
        }
        err.textContent = t.error;
      });
  });
})();
