export function setupMenu() {
  const storiesLink = document.getElementById('stories-link');
  storiesLink.addEventListener('click', storiesLinkClickHandler);

  function storiesLinkClickHandler(event) {
    event.preventDefault();
    const menu = document.getElementById('menu');
    menu.innerHTML = `
      <ul>
        <li><a href="#">Coniglino Bim Bim</a></li>
        <li><a href="#" id="back-link">Indietro</a></li>
      </ul>
    `;

    const backLink = document.getElementById('back-link');
    backLink.addEventListener('click', (event) => {
      event.preventDefault();
      menu.innerHTML = `
        <ul>
          <li><a href="#games">Giochi</a></li>
          <li><a href="#stories" id="stories-link">Storie</a></li>
        </ul>
      `;
      // Reattach the event listener for the "Storie" link
      document.getElementById('stories-link').addEventListener('click', storiesLinkClickHandler);
    });
  }
}
