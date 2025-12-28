// Оберните код в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  // Добавьте отладочный вывод
  console.log('Форма найдена:', contactForm);
  console.log('Элемент сообщения:', formMessage);

  if (!contactForm) {
    console.error(' Форма не найдена! Проверьте id="contactForm"');
    return;
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log(' Отправка формы...');

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString()
    };

    console.log('Данные:', formData);

    try {
      const response = await fetch('https://formspree.io/f/xzdpvpaw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('Ответ сервера:', response.status, response.statusText);

      if (response.ok) {
        formMessage.textContent = 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block'; // Добавьте эту строку
        contactForm.reset();
        console.log('Успешно!');
      } else {
        console.error('Ошибка сервера:', await response.text());
        throw new Error('Ошибка отправки формы');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      formMessage.textContent = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.';
      formMessage.className = 'form-message error';
      formMessage.style.display = 'block'; // Добавьте эту строку
    }

    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  });

  // Тестовый вызов для проверки
  console.log('Обработчик формы установлен');
});