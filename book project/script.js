// المنت های لازم برای چک باکس مخفی کردن کتاب
const checkBox = document.querySelector(".container-checkbox #check");
const bookList = document.querySelector(".book-list .list");
const titleBookList = document.querySelector(".box-container .title");

// المنت های فرم اضافه کردن کتاب
const addInput = document.querySelector(".add-input");
const addBtn = document.querySelector(".add-btn");
const ul = document.querySelector(".book-list .list");

// المنت اینپوت سرچ
const inputSearch = document.querySelector("#search-input");

// المنت دکمه حذف
const spanDelete = `<button type="button" class="item-btn">حذف</button>`;

// کد های مربوط به مخفی کردن کتاب
checkBox.addEventListener("change", function (e) {
  if (checkBox.checked) {
    titleBookList.style.display = "none";
    bookList.style.display = "none";
  } else {
    titleBookList.style.display = "block";
    bookList.style.display = "flex";
  }
});

inputSearch.addEventListener("keyup", function () {
  for (let book of ul.children) {
    if (book.firstElementChild.textContent.indexOf(inputSearch.value) !== -1) {
      book.style.display = "flex";
    } else {
      book.style.display = "none";
    }
  }
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // دریافت نام کتاب و حذف فاصله‌های اضافی
  const bookName = addInput.value.trim();

  // جلوگیری از ثبت کتاب خالی
  if (bookName === "") {
    return;
  }

  // بررسی تکراری نبودن نام کتاب
  const books = Array.from(ul.children);

  const isDuplicate = books.some((book) => {
    const currentName = book.querySelector("span").textContent.trim();

    return currentName.toLowerCase() === bookName.toLowerCase();
  });

  // اگر کتاب تکراری بود، ثبت نشود
  if (isDuplicate) {
    alert("این کتاب قبلاً در فهرست وجود دارد!");
    return;
  }

  // ساخت عنصر کتاب
  const liName = document.createElement("li");
  const spanName = document.createElement("span");

  liName.className = "item";
  spanName.textContent = bookName;

  liName.appendChild(spanName);
  liName.insertAdjacentHTML("beforeend", spanDelete);

  // اضافه کردن کتاب به فهرست
  ul.appendChild(liName);

  // ذخیره کتاب در localStorage
  saveToLocalStorage(bookName);

  // خالی کردن ورودی پس از ثبت موفق
  addInput.value = "";
  e.preventDefault();
});
ul.addEventListener("click", function (e) {
  if (e.target.className === "item-btn") {
    e.target.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.children[0].textContent);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }

  for (let item of tasks) {
    const spanName = document.createElement("span");
    const liName = document.createElement("li");
    liName.className = "item";
    spanName.textContent = item;
    liName.appendChild(spanName);
    liName.innerHTML += spanDelete;
    ul.appendChild(liName);
  }
});

function saveToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }

  tasks.push(task);
  localStorage.setItem("tasks", tasks);
}

function removeFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] === task) {
      tasks.splice(i, 1);
    }
  }

  if (tasks.length === 0) {
    localStorage.clear();
  } else {
    localStorage.setItem("tasks", tasks);
  }
}
