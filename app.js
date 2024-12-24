const bookGrid = document.getElementById('bookGrid');
const bookDetails = document.getElementById('bookDetails');
const overlay = document.getElementById('overlay');

let books = [];

// Cargar datos desde books.json
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        books = data;
        displayBooks(books);
        history.replaceState({ page: 'main' }, '', ''); // Estado inicial
    })
    .catch(error => console.error('Error loading books:', error));

// Mostrar libros dinámicamente
function displayBooks(bookList) {
    bookGrid.innerHTML = ''; // Limpiar el contenedor
    bookList.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <div class="book-cover">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="book-info">
                <p>${book.title}</p>
                <p>${book.author}</p>
            </div>
        `;
        // Mostrar detalles al hacer clic
        bookItem.addEventListener('click', () => showDetails(index));
        bookGrid.appendChild(bookItem);
    });
}

// Mostrar detalles del libro y añadir al historial
function showDetails(index) {
    const book = books[index];
    document.getElementById('detailsTitle').innerText = book.title;
    document.getElementById('detailsImage').src = book.image;
    document.getElementById('detailsAuthor').innerText = `Author: ${book.author}`;
    document.getElementById('detailsDate').innerText = `Date Read: ${book.dateRead}`;
    document.getElementById('detailsDescription').innerText = book.description;

    bookDetails.style.display = 'block';
    overlay.style.display = 'block';

    // Añadir una nueva entrada al historial
    history.pushState({ page: 'details', bookIndex: index }, '', `#book-${index}`);
}

// Cerrar el modal
function closeModal() {
    bookDetails.style.display = 'none';
    overlay.style.display = 'none';

    // Volver al estado inicial
    history.replaceState({ page: 'main' }, '', '');
}

// Manejar el botón Atrás
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page === 'details') {
        // Si estamos en detalles, mostrar el libro nuevamente
        showDetails(event.state.bookIndex);
    } else {
        // Si estamos en el estado inicial, cerrar el modal
        closeModal();
    }
});

// Cerrar el modal al hacer clic en el fondo oscuro
overlay.addEventListener('click', closeModal);


// Ordenar libros
sortOptions.addEventListener('change', (e) => {
    const option = e.target.value;
    if (option === 'title') {
        books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'dateRead') {
        books.sort((a, b) => new Date(b.dateRead) - new Date(a.dateRead));
    }
    displayBooks(books);
});
