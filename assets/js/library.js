// Modal functionality
const showHistoryBtn = document.getElementById("showHistoryBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const closeBtn = document.getElementById("closeBtn");
 const bookImage = document.getElementById('bookImage');
const imagePreview = document.getElementById('imagePreview');

showHistoryBtn.addEventListener("click", function () {
  modalOverlay.classList.add("active");
  modalContent.classList.add("active");
  document.body.style.overflow = "hidden";
});

function closeModal() {
  modalOverlay.classList.remove("active");
  modalContent.classList.remove("active");
  document.body.style.overflow = "auto";
}

modalOverlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

// Close modal when pressing Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

// form functionality
const showAddBookBtn = document.getElementById("showAddBookBtn");
const formOverlay = document.getElementById("formOverlay");
const formContent = document.getElementById("formContent");
const formcloseBtn = document.getElementById("formcloseBtn");
const cancelBtn = document.getElementById("cancelBtn");

showAddBookBtn.addEventListener("click", function () {
  formOverlay.classList.add("active");
  formContent.classList.add("active");
  document.body.style.overflow = "hidden";
});

function closeform() {
  formOverlay.classList.remove("active");
  formContent.classList.remove("active");
  document.body.style.overflow = "auto";
}

formOverlay.addEventListener("click", closeform);
formcloseBtn.addEventListener("click", closeform);
cancelBtn.addEventListener("click", closeform);

// Close form when pressing Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && formOverlay.classList.contains("active")) {
    closeform();
  }
});

// Image URL preview
        bookImage.addEventListener('input', () => {
            const imageUrl = bookImage.value.trim();
            if (imageUrl) {
                imagePreview.innerHTML = `<img src="${imageUrl}" alt="Meal preview" onerror="this.src=''; this.alt=''; this.parentElement.innerHTML='<div class=\'image-placeholder\'><div class=\'image-placeholder-icon\'>❌</div><div>Invalid image URL</div></div>'">`;
            } else {
                imagePreview.innerHTML = '<div class="image-placeholder"><div class="image-placeholder-icon">🍽️</div><div>Meal image preview will appear here</div></div>';
            }
        });

// Rating stars functionality
const ratingStars = document.querySelectorAll(".rating-star");
const ratingInput = document.getElementById("rating");
const ratingValue = document.querySelector(".rating-input span");

ratingStars.forEach((star) => {
  star.addEventListener("click", function () {
    const value = parseInt(this.getAttribute("data-value"));
    ratingInput.value = value;
    ratingValue.textContent = value;

    ratingStars.forEach((s, index) => {
      if (index < value) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  });

  star.addEventListener("mouseover", function () {
    const value = parseInt(this.getAttribute("data-value"));
    ratingStars.forEach((s, index) => {
      if (index < value) {
        s.classList.add("hover");
      } else {
        s.classList.remove("hover");
      }
    });
  });

  star.addEventListener("mouseout", function () {
    ratingStars.forEach((s) => {
      s.classList.remove("hover");
    });
  });
});

// Form submission
const addBookForm = document.getElementById("addBookForm");
// need
const bookTitle = document.querySelector("#bookTitle");
const authorName = document.querySelector("#author");
// ratingInput
const currentPages = document.querySelector("#currentPage");
const totalPages = document.querySelector("#pages");

const bookList = document.querySelector(".current");
const finsihedList = document.querySelector(".finished");
const historyList = document.querySelector(".history-list");

addBookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  formValidation();
});

const formValidation = () => {
const selectedStatus = document.querySelector('input[name="status"]:checked');

  let values = [
    bookTitle.value,
    authorName.value,
    ratingInput.value,
    currentPages.value,
    totalPages.value,
    selectedStatus.value,
    bookImage.value
  ];

  const allFieldsFilled = values.every((value) => !!value);

  if (allFieldsFilled) {
    alert("success");
     readData();
    console.log(values);
    // alert("Book added successfully!");
    closeform();

    
    // Reset form
    addBookForm.reset();
    
    ratingStars.forEach((star) => star.classList.remove("active"));
    ratingValue.textContent = "0";
    ratingInput.value = "0";

   
  } else {
    alert("failed");
  }
};

let data = [];

const readData = () => {
  const selectedStatus = document.querySelector('input[name="status"]:checked'); // ✅ now updated correctly

 data.push({
  bookTitle: bookTitle.value,
  authorName: authorName.value,
  ratingInput: ratingInput.value,
  currentPages: currentPages.value,
  totalPages: totalPages.value,
  readingStatus: selectedStatus.value,
  bookImage: bookImage.value // ✅ include it
});


// console.log("New data array:", data);
// console.table(data);
  localStorage.setItem("booksData", JSON.stringify(data));
  createBook();
};

console.log("data"+ data);
const createBook = () => {
  bookList.innerHTML = "";
  finsihedList.innerHTML = "";
  historyList.innerHTML = "";

  let displayReading = data
    .filter((item) => item.readingStatus === "reading") // Only reading status
    .map((item, index) => {
      const bookProgress = (parseInt(item.currentPages) / parseInt(item.totalPages)) * 100;

      return `
        <div class="book-card">
         <div class="book-cover book-${index + 1}" style="background-image: url('${item.bookImage}')">
            <div class="book-progress">
              <div class="book-progress-bar" style="width: ${bookProgress}%;"></div>
            </div>
          </div>
          <div class="book-info">
            <h3>${item.bookTitle}</h3>
            <p>${item.authorName}</p>
            <div class="book-meta">
              <span class="book-rating">${item.ratingInput} ★</span>
              <span class="book-pages">${item.currentPages}/${item.totalPages}</span>
            </div>
          </div>
        </div>
      `;
    });

    let displayFinished = data
    .filter((item) => item.readingStatus === "completed") // Only reading status
    .map((item, index) => {
      const bookProgress = (parseInt(item.currentPages) / parseInt(item.totalPages)) * 100;

      return `
        <div class="book-card">
         <div class="book-cover book-${index + 1}" style="background-image: url('${item.bookImage}')">
            <div class="book-progress">
              <div class="book-progress-bar" style="width: ${bookProgress}%;"></div>
            </div>
          </div>
          <div class="book-info">
            <h3>${item.bookTitle}</h3>
            <p>${item.authorName}</p>
            <div class="book-meta">
              <span class="book-rating">${item.ratingInput} ★</span>
              <span class="book-pages">${item.currentPages}/${item.totalPages}</span>
            </div>
          </div>
        </div>
      `;
    });

  // Now join and insert once
  bookList.innerHTML = displayReading.join("");
  finsihedList.innerHTML = displayFinished.join("");
  historyList.innerHTML = displayFinished.join("");

  console.log("displayFinished:", displayFinished);
};

(() => {
    data = JSON.parse(localStorage.getItem("booksData") || []);
    createBook();
})()
