const topic = document.querySelector('#anfrage-thema');
const composeLink = document.querySelector('#anfrage-email');
const address = document.querySelector('#kontakt-adresse');
const copyButton = document.querySelector('#adresse-kopieren');
const copyStatus = document.querySelector('#kopier-status');

const requestedTopic = new URLSearchParams(window.location.search).get('thema');
if (Array.from(topic.options).some((option) => option.value === requestedTopic)) {
  topic.value = requestedTopic;
}

function updateEmailSubject() {
  const label = topic.selectedOptions[0].textContent;
  const subject = encodeURIComponent(`WICKI DIGITAL – Anfrage: ${label}`);
  composeLink.href = `${address.getAttribute('href')}?subject=${subject}`;
}

topic.addEventListener('change', updateEmailSubject);
updateEmailSubject();
topic.closest('[hidden]').hidden = false;

if (navigator.clipboard?.writeText) {
  copyButton.addEventListener('click', async () => {
    copyStatus.textContent = '';

    try {
      await navigator.clipboard.writeText(address.textContent.trim());
      copyStatus.textContent = 'E-Mail-Adresse kopiert.';
    } catch {
      copyStatus.textContent = 'Kopieren war hier nicht möglich. Du kannst die Adresse markieren und kopieren.';
    }
  });
  copyButton.hidden = false;
}
