export default function pasteMessage(newElem) {
  const parent = document.querySelector('.timeline__wrapper');

  const timelineItems = document.querySelectorAll('.timeline__wrapper_item');
  if (Array.from(timelineItems).length > 0) {
    const firstElem = parent.querySelector('.timeline__wrapper_item');
    parent.insertBefore(newElem, firstElem);
  } else {
    parent.appendChild(newElem);
  }
}
