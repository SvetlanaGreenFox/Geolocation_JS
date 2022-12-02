export default function showErrorMessage() {
  if (document.querySelector('.modal__error-message')) return;
  const wrapper = document.createElement('div');
  wrapper.classList.add('modal__error-message');
  wrapper.innerHTML = '<p>* Проверьте правильность введенных координат</p>';

  const input = document.querySelector('.timeline__modal_input');

  input.insertAdjacentElement('beforebegin', wrapper);

  input.addEventListener('keydown', () => {
    wrapper.remove();
  });
}
