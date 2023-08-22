function f() {
  const div: HTMLDivElement = document.createElement('div');
  div.innerHTML = "Hello webpack";
  return div;
}

document.body.appendChild(f());