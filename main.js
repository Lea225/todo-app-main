document.addEventListener("DOMContentLoaded", () => {
  const sunIcon = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');
  const htmlElement = document.documentElement;
  const nbrItem = document.querySelector('.nbrItem'); // Sélectionne le span pour le nombre de tâches
  const navLinks = document.querySelectorAll('a'); // Sélectionne tous les liens de navigation
  const main = document.querySelector('main'); // Sélectionne l'élément main
  const clearCompletedLink = document.querySelector('.clear-completed');

  let itemCount = 5; // Initialisation du nombre de tâches

  // Initialisation avec le thème sombre
  htmlElement.setAttribute('data-theme', 'dark');
  updateBackground();
  sunIcon.style.display = 'block';

  sunIcon.addEventListener('click', () => {
    htmlElement.setAttribute('data-theme', 'light');
    updateBackground();
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  });

  moonIcon.addEventListener('click', () => {
    htmlElement.setAttribute('data-theme', 'dark');
    updateBackground();
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  });

  const inputTodo = document.querySelector('input[type="text"]');

  inputTodo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && inputTodo.value.trim() !== '') {
      addTodoItem(inputTodo.value.trim());
      inputTodo.value = ''; // Clear input field
    }
  });

  function addTodoItem(todoText) {
    const todoContainer = document.createElement('div');
    todoContainer.className = 'checkbox-container';

    const label = document.createElement('label');

    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.name = 'theme';
    inputCheckbox.id = 'dark-theme';
    inputCheckbox.addEventListener('change', updateItemCount);

    const checkmark = document.createElement('div');
    checkmark.className = 'checkmark';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '11');
    svg.setAttribute('height', '9');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#FFF');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', 'M1 4.304L3.696 7l6-6');
    svg.appendChild(path);
    checkmark.appendChild(svg);

    const p = document.createElement('p');
    p.textContent = todoText;

    const deleteIcon = document.createElement('div');
    deleteIcon.className = 'delete-icon';
    const img = document.createElement('img');
    img.src = 'images/icon-cross.svg';
    img.alt = 'icon-cross';
    img.addEventListener('click', () => {
      todoContainer.remove();
      updateItemCount();
    });
    deleteIcon.appendChild(img);

    label.appendChild(inputCheckbox);
    label.appendChild(checkmark);
    label.appendChild(p);
    label.appendChild(deleteIcon);
    todoContainer.appendChild(label);
    main.appendChild(todoContainer);

    updateItemCount();
  }

  function updateItemCount() {
    itemCount = document.querySelectorAll('.checkbox-container input[type="checkbox"]:not(:checked)').length;
    nbrItem.textContent = itemCount; // Met à jour le nombre de tâches restantes dans le span
  }

  function updateBackground() {
    const isDarkTheme = htmlElement.getAttribute('data-theme') === 'dark';
    const isMobile = window.innerWidth <= 768;

    if (isDarkTheme && isMobile) {
      document.body.style.backgroundImage = "url('images/bg-mobile-dark.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "top";
    } else if (isDarkTheme && !isMobile) {
      document.body.style.backgroundImage = "url('images/bg-desktop-dark.jpg')";
    } else if (!isDarkTheme && isMobile) {
      document.body.style.backgroundImage = "url('images/bg-mobile-light.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "top";
    } else {
      document.body.style.backgroundImage = "url('images/bg-desktop-light.jpg')";
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.classList.contains('all') ? 'all' : link.textContent.toLowerCase();
      filterTodos(filter);
    });
  });

  function filterTodos(filter) {
    const todos = document.querySelectorAll('.checkbox-container');

    todos.forEach(todo => {
      const checkbox = todo.querySelector('input[type="checkbox"]');
      switch (filter) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'active':
          if (!checkbox.checked) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
        case 'completed':
          if (checkbox.checked) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
      }
    });
  }

  clearCompletedLink.addEventListener('click', (e) => {
    e.preventDefault();
    const completedTodos = document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked');
    completedTodos.forEach(todo => {
      todo.closest('.checkbox-container').remove();
    });
    updateItemCount();
  });

  // Mettre à jour le background lors du chargement initial
  updateBackground();

  // Ajout des tâches initiales
  addTodoItem('Jog around the park 3x');
  addTodoItem('10 minutes meditation');
  addTodoItem('Read for 1 hour');
  addTodoItem('Pick up groceries');
  addTodoItem('Complete Todo App on Frontend Mentor');
});
