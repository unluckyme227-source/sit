// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileClose = document.getElementById('mobileClose');
  const mobilePanel = document.getElementById('mobilePanel');
  
  // Создаем overlay для затемнения
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);
  
  // Открытие меню
  if (burgerBtn) {
    burgerBtn.addEventListener('click', function() {
      mobilePanel.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Закрытие меню
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }
  
  overlay.addEventListener('click', closeMobileMenu);
  
  function closeMobileMenu() {
    mobilePanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Закрываем все выпадающие меню
    document.querySelectorAll('.mobile-dropdown__content').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
    document.querySelectorAll('.mobile-dropdown__arrow').forEach(arrow => {
      arrow.classList.remove('active');
    });
  }
  
  // Выпадающие меню в мобильной версии
  document.querySelectorAll('.mobile-nav__item--dropdown').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const dropdownContent = this.nextElementSibling;
      const arrow = this.querySelector('.mobile-dropdown__arrow');
      
      dropdownContent.classList.toggle('active');
      arrow.classList.toggle('active');
    });
  });
  
  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.mobile-nav__item, .mobile-dropdown__item').forEach(link => {
    link.addEventListener('click', function() {
      if (!this.classList.contains('mobile-nav__item--dropdown')) {
        closeMobileMenu();
      }
    });
  });
  
  // Закрытие меню при нажатии Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
});
