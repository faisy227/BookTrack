// Modal functionality
const showGoalsBtn = document.getElementById("showGoalsBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const closeBtn = document.getElementById("closeBtn");
const cancelBtn = document.getElementById("cancelBtn");

showGoalsBtn.addEventListener("click", function () {
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
cancelBtn.addEventListener("click", closeModal);

// Close modal when pressing Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

// Progress calculation
const goalTarget = document.getElementById("goalTarget");
const currentProgress = document.getElementById("currentProgress");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const goalTargetText = document.getElementById("goalTargetText");
const allBooks = document.querySelector(".all-books");
const allPages = document.querySelector(".pages");
const percent = document.querySelector(".percent");
const realProgressGoalFill = document.querySelector(".goal-progress-fill");
const goalForm = document.getElementById("goalForm");
// console.log(allBooks);

goalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formValidation();
});

const formValidation = () => {
  let values = [currentProgress.value, goalTarget.value];

  const allFieldsFilled = values.every((value) => !!value);

  if (allFieldsFilled) {
    alert("Reading goal saved successfully!");
    closeModal();

    // Reset form
    readGoal();
    goalForm.reset();
    progressFill.style.width = "0%";
    progressText.textContent = "0%";
    goalTargetText.textContent = "0";
  } else {
    alert("Not Saved");
  }
};

let goalData = {
  currentProgress: currentProgress.value,
  targetGoal: goalTarget.value,
};

console.log(goalData);
const readGoal = () => {
  goalData.currentProgress = currentProgress.value;
  goalData.targetGoal = goalTarget.value;
    console.log("From Read" + goalData.currentProgress, goalData.targetGoal);
  localStorage.setItem("reading", JSON.stringify(goalData));
  updateChallenge(goalData);
};

function updateChallenge(goalData) {
  const target = parseInt(goalData.targetGoal) || 0;
  const progress = parseInt(goalData.currentProgress) || 0;

  console.log(target, progress);

  const percentage =
    target > 0 ? Math.min(Math.round((progress / target) * 100), 100) : 0;

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}%`;
  goalTargetText.textContent = target;

  allBooks.textContent = `${progress}/${target}`;
  percent.textContent = `${percentage}% completed`;
  allPages.textContent = `${progress * 300}/${target * 300}`;
  realProgressGoalFill.style.width = `${percentage}%`;
}

function updateProgress() {
  const target = parseInt(goalTarget.value) || 0;
  const progress = parseInt(currentProgress.value) || 0;
  const percentage =
    target > 0 ? Math.min(Math.round((progress / target) * 100), 100) : 0;

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}%`;
  goalTargetText.textContent = target;

 
}

goalTarget.addEventListener("input", updateProgress);
currentProgress.addEventListener("input", updateProgress);

(() => {
    goalData = JSON.parse(localStorage.getItem("reading") || {});
    updateChallenge(goalData);
})()
