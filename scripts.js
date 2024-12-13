document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.createElement('button');
    toggleThemeBtn.innerText = "Toggle Dark Mode";
    toggleThemeBtn.style.position = "fixed";
    toggleThemeBtn.style.bottom = "20px";
    toggleThemeBtn.style.right = "20px";

    document.body.appendChild(toggleThemeBtn);

    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});

