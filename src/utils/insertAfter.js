export default function insertAfter(newElement, targetElement){
  if(!targetElement) {
    alert('can\'t find target element');
  }
  const parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}