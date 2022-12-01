const input = document.querySelector('.timeline__input');

let message;

function madeMessage(message, coords) {
  const date = new Date().toLocaleString();

  const { latitude, longitude } = coords;

  const newItem = document.createElement('div');
  newItem.classList.add('timeline__wrapper_item');
  newItem.innerHTML = `<p class="item_date-time">${date}</p>
  <p class="item_message">${message}</p>
  <p class="item_coords">${latitude}, ${longitude}</p>`;

  return newItem;
}

function pasteMessage(newElem) {
  const parent = document.querySelector('.timeline__wrapper');

  const timelineItems = document.querySelectorAll('.timeline__wrapper_item');
  if (Array.from(timelineItems).length > 0) {
    const firstElem = parent.querySelector('.timeline__wrapper_item');
    parent.insertBefore(newElem, firstElem);
  } else {
    parent.appendChild(newElem);
  }
}

input.addEventListener('keydown', async function (e) {
  if (e.keyCode === 13) {
    let value = e.target.value;
    if (value.length === 0) return;
    message = value;
    if (navigator.geolocation) {
      const result = await getCoordinates();
      // if (result.success) return result;
      // if (result.success) {
      //   const newItem = madeMessage(message, result.coords);

      //   pasteMessage(newItem);
      // }
      if (result.success) {
        // madeError(result.code);
        showModal();
      }
    }
    e.target.value = '';
  }
});

async function getCoordinates() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          success: true,
          coords: position.coords,
        });
      },
      (error) => {
        resolve({
          success: false,
          error: error,
        });
      }
    );
  });
}

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

  const input = modal.querySelector('.timeline__modal_input');
  const button = modal.querySelector('.modal__ok');
  const cancelBtn = modal.querySelector('.modal__cancel');
  input.addEventListener('keydown', addCoords);
  button.addEventListener('click', () => {
    const value = input.value;
    console.log(value);
    if (checkSymbols(value)) {
      const coords = prepareCoords(value);
      if (coords) {
        if (check_lat_lon(coords)) {
          const newItem = madeMessage(message, coords);
          pasteMessage(newItem);

          document.querySelector('.timeline__modal').remove();
        }
      } else {
        showErrorMessage();
      }
    }
  });
  cancelBtn.addEventListener('click', () => {
    modal.remove();
  });
}

//забрать координаты из инпута модалки и запустить на проверку
function addCoords(e) {
  if (e.keyCode === 13) {
    const value = this.value;
    if (checkSymbols(value)) {
      const coords = prepareCoords(value);
      if (coords) {
        if (check_lat_lon(coords)) {
          const newItem = madeMessage(message, coords);
          pasteMessage(newItem);

          document.querySelector('.timeline__modal').remove();
        }
      } else {
        console.log('Проверьте координаты');
        showErrorMessage();
      }
    }
  }
}

function checkSymbols(str) {
  const cyrillicPattern = /^[\u0400-\u04FF]+$[a-z]/i;
  // const latinPattern = /[a-z]/i;

  return !cyrillicPattern.test(str);
}

//подготовка координат к проверке
function prepareCoords(str) {
  const changeStr = str.replace(/[\[\]']+/g, '');
  const arrFromCoords = changeStr.split(',');

  if (arrFromCoords.length !== 2) {
    console.log('Проверьте координаты');
  } else {
    return {
      latitude: arrFromCoords[0].trim(),
      longitude: arrFromCoords[1].trim(),
    };
  }
}

// console.log(prepareCoords('[56.15447616577148, 37.79811477661133]'));
//проверка координат
function check_lat_lon(coords) {
  const { latitude, longitude } = coords;

  const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  let validLat = regexLat.test(latitude);
  let validLon = regexLon.test(longitude);

  return validLat && validLon;
}

function showErrorMessage() {
  if (document.querySelector('.modal__error-message')) return;
  const wrapper = document.createElement('div');
  wrapper.classList.add('modal__error-message');
  wrapper.innerHTML = '<p>* Проверьте правильность введенных координат</p>';

  const modal = document.querySelector('.timeline__modal');
  const input = document.querySelector('.timeline__modal_input');

  input.insertAdjacentElement('beforebegin', wrapper);

  input.addEventListener('keydown', (e) => {
    wrapper.remove();
  });
}
