// Дані розкладу уроків для кожного дня
let lessonsData = {
    "Понеділок": [],
    "Вівторок": [],
    "Середа": [],
    "Четвер": [],
    "П'ятниця": [],
    "Субота": [],
    "Неділя": []
};

// Функція для оновлення відображення уроків для обраного дня
function updateLessonDisplay(selectedDay) {
    const lessonList = document.getElementById('lesson-list');
    lessonList.innerHTML = '';

    lessonsData[selectedDay].forEach((lesson, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${lesson.name} <br> <strong>Домашнє завдання:</strong> ${lesson.homework}`;
        lessonList.appendChild(li);
    });
}

// Функція для додавання уроку
function addLesson() {
    const selectedDay = document.getElementById('selected-day').textContent;
    const lessonName = document.getElementById('lesson-input').value;
    const homework = document.getElementById('homework-input').value;

    if (lessonName && homework) {
        lessonsData[selectedDay].push({ name: lessonName, homework: homework });

        document.getElementById('lesson-input').value = '';
        document.getElementById('homework-input').value = '';

        updateLessonDisplay(selectedDay);
        saveToLocalStorage();
    } else {
        alert('Будь ласка, введіть назву уроку та домашнє завдання');
    }
}

// Функція для видалення всіх уроків
function deleteAllLessons() {
    const selectedDay = document.getElementById('selected-day').textContent;
    lessonsData[selectedDay] = [];
    updateLessonDisplay(selectedDay);
    saveToLocalStorage();
}

// Збереження даних у localStorage
function saveToLocalStorage() {
    localStorage.setItem('lessonsData', JSON.stringify(lessonsData));
}

// Завантаження даних з localStorage
function loadFromLocalStorage() {
    const storedData = localStorage.getItem('lessonsData');
    if (storedData) {
        lessonsData = JSON.parse(storedData);
        updateLessonDisplay('Понеділок');
    }
}

// Обробник зміни дня тижня
document.querySelectorAll('#day-list li').forEach((li) => {
    li.addEventListener('click', function () {
        const selectedDay = this.getAttribute('data-day');
        document.getElementById('selected-day-title').textContent = selectedDay;
        document.getElementById('selected-day').textContent = selectedDay;
        updateLessonDisplay(selectedDay);
    });
});

// Обробники для кнопок
document.getElementById('add-lesson').addEventListener('click', addLesson);
document.getElementById('delete-all-lessons').addEventListener('click', deleteAllLessons);

// Ініціалізація
loadFromLocalStorage();
updateLessonDisplay('Понеділок');


