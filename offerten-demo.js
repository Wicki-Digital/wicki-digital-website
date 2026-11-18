(() => {
  const form = document.querySelector('#offerten-formular');
  const fallback = document.querySelector('#offerten-beispiel');
  const total = document.querySelector('#offerten-total');
  const feedback = document.querySelector('#offerten-fehler');
  const fields = [...form.querySelectorAll('input')];
  const formatChf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' });

  function readHundredths(field) {
    const value = field.value.trim();
    if (!field.required && value === '') return 0;
    if (!/^(?:[0-9]{1,5}(?:[.,][0-9]{1,2})?|[.,][0-9]{1,2})$/.test(value)) return null;

    const [whole, decimals = ''] = value.split(/[.,]/);
    return Number(whole) * 100 + Number(decimals.padEnd(2, '0'));
  }

  function calculate() {
    const values = fields.map(readHundredths);
    const invalid = fields[values.indexOf(null)];

    feedback.textContent = '';
    if (invalid) {
      invalid.setAttribute('aria-invalid', 'true');
      feedback.textContent = `Gib für «${invalid.labels[0].textContent.trim()}» eine Zahl von 0 bis 99’999.99 mit höchstens zwei Nachkommastellen ein.`;
      total.value = 'Beispieltotal –';
      return invalid;
    }

    const [hours, rate, materials] = values;
    const labor = Math.round(hours * rate / 100);
    total.value = `Beispieltotal ${formatChf.format((labor + materials) / 100)}`;
    return null;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculate()?.focus();
  });

  form.addEventListener('input', (event) => {
    event.target.removeAttribute('aria-invalid');
    feedback.textContent = '';
    total.value = 'Beispieltotal –';
  });

  calculate();
  form.hidden = false;
  fallback.hidden = true;
})();
