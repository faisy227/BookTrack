
  // Modal functionality
        const showGoalsBtn = document.getElementById('showGoalsBtn');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalContent = document.getElementById('modalContent');
        const closeBtn = document.getElementById('closeBtn');
        const cancelBtn = document.getElementById('cancelBtn');

        showGoalsBtn.addEventListener('click', function() {
            modalOverlay.classList.add('active');
            modalContent.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeModal() {
            modalOverlay.classList.remove('active');
            modalContent.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        modalOverlay.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        // Close modal when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });

        // Progress calculation
        const goalTarget = document.getElementById('goalTarget');
        const currentProgress = document.getElementById('currentProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const goalTargetText = document.getElementById('goalTargetText');
        const allBooks = document.querySelector(".all-books");
        const allPages = document.querySelector(".pages");
        const percent = document.querySelector(".percent");
        const realProgressGoalFill = document.querySelector(".goal-progress-fill");
    
        console.log(allBooks);


        function updateProgress() {
            const target = parseInt(goalTarget.value) || 0;
            const progress = parseInt(currentProgress.value) || 0;
            const percentage = target > 0 ? Math.min(Math.round((progress / target) * 100), 100) : 0;
            
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${percentage}%`;
            goalTargetText.textContent = target;


            allBooks.textContent = `${progress}/${target}`;
            percent.textContent = `${percentage}% completed`;
            allPages.textContent = `${progress * 300}/15,000`;
            realProgressGoalFill.style.width = `${percentage}%`;
        }

        goalTarget.addEventListener('input', updateProgress);
        currentProgress.addEventListener('input', updateProgress);

        // Form submission
        const goalForm = document.getElementById('goalForm');
        
        goalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the data to your backend
            // For this demo, we'll just show an alert and close the modal
            alert('Reading goal saved successfully!');
            closeModal();
            
            // Reset form
            goalForm.reset();
            progressFill.style.width = '0%';
            progressText.textContent = '0%';
            goalTargetText.textContent = '0';
        });

        // Initialize with current date
        document.getElementById('startDate').valueAsDate = new Date();
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1);
        document.getElementById('endDate').valueAsDate = endDate;