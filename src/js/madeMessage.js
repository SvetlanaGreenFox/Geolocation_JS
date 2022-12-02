export default function madeMessage(message, coords) {
  const date = new Date().toLocaleString();

  const { latitude, longitude } = coords;

  const newItem = document.createElement('div');
  newItem.classList.add('timeline__wrapper_item');
  newItem.innerHTML = `<p class="item_date-time">${date}</p>
  <p class="item_message">${message}</p>
  <p class="item_coords">${latitude}, ${longitude}</p>`;

  return newItem;
}
