 // Color picker functionality
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Update theme preview
                const color = this.style.backgroundColor;
                document.querySelector('.theme-preview-header').style.backgroundColor = color;
                document.querySelector('.theme-preview-sidebar').style.backgroundColor = lightenColor(color, 30);
            });
        });

        // Helper function to lighten color
        function lightenColor(color, percent) {
            const num = parseInt(color.replace("#", ""), 16),
                amt = Math.round(2.55 * percent),
                R = (num >> 16) + amt,
                G = (num >> 8 & 0x00FF) + amt,
                B = (num & 0x0000FF) + amt;
            return "#" + (
                0x1000000 +
                (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                (B < 255 ? B < 1 ? 0 : B : 255)
            ).toString(16).slice(1);
        }