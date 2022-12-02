import getCoordinates from './getCoordinates';
import pasteMessage from './pasteMessage';
import checkCoordinates from './checkCoordinates';
import madeMessage from './madeMessage';
import prepareCoords from './prepareCoords';

const input = document.querySelector('.timeline__input');

let message;

function showModal() {
  const modal = document.createElement('section');
  modal.classList.add('timeline__modal');
  modal.innerHTML = `
  <div class="timeline__modal_message">
    <p>Что-то пошло не так.</p>
    <p>К сожалению, нам не удалось определить Ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите кооринаты вручную.</p>
    <p>Широта и долгота через запятую.</p>
  </div>
  <input type="text" class="timeline__modal_input" />
  <div class="modal__btns">
    <button class="modal__cancel modal__btn">Отмена</button>
    <button class="modal__ok modal__btn">OK</button>
  </div>`;
  document.querySelector('.timeline').appendChild(modal);

  const inputModal = modal.querySelector('.timeline__modal_input');
  const button = modal.querySelector('.modal__ok');
  const cancelBtn = modal.querySelector('.modal__cancel');
  inputModal.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      const value = this.value;
      if (checkCoordinates(value)) {
        const coords = prepareCoords(value);
        const newItem = madeMessage(message, coords);
        pasteMessage(newItem);
        document.querySelector('.timeline__modal').remove();
      }
    }
  });
  button.addEventListener('click', () => {
    const { value } = inputModal;
    if (checkCoordinates(value)) {
      const coords = prepareCoords(value);
      const newItem = madeMessage(message, coords);
      pasteMessage(newItem);
      document.querySelector('.timeline__modal').remove();
    }
  });
  cancelBtn.addEventListener('click', () => {
    modal.remove();
  });
}

input.addEventListener('keydown', async (e) => {
  if (e.keyCode === 13) {
    const { value } = e.target;
    if (value.length === 0) return;
    message = value;
    if (navigator.geolocation) {
      const result = await getCoordinates();

      if (result.success) {
        const newItem = madeMessage(message, result.coords);

        pasteMessage(newItem);
      }
      if (!result.success) {
        showModal();
      }
    }
    e.target.value = '';
  }
});
