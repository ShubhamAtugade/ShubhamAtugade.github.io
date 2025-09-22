document.addEventListener('DOMContentLoaded', function() {

    // --- Contact Form Submission Script ---
    const contactForm = document.getElementById('contact-Form');
    const responseMessage = document.getElementById('responseMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the default redirect

            const formData = new FormData(contactForm);
            responseMessage.innerHTML = "Sending...";
            responseMessage.style.color = "white";

            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    responseMessage.innerHTML = data.message;
                    responseMessage.style.color = "#4ade80"; // Green
                    contactForm.reset();
                } else {
                    responseMessage.innerHTML = "Oops! " + data.message;
                    responseMessage.style.color = "#f87171"; // Red
                }
            })
            .catch(error => {
                console.error('Error:', error);
                responseMessage.innerHTML = "Oops! Something went wrong.";
                responseMessage.style.color = "#f87171"; // Red
            });
        });
    }


    // --- Scroll to Top Button Script ---
    const scrollToTopButton = document.getElementById("scrollToTop");

    if (scrollToTopButton) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) {
                scrollToTopButton.style.display = "flex";
            } else {
                scrollToTopButton.style.display = "none";
            }
        });

        scrollToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- Select Navbar Elements (we need them in two places) ---
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const navMenu = document.querySelector(".links");
    const navLinks = document.querySelectorAll('.nav-button');


    // --- Smooth Scroll & CLOSE MENU for Navbar Links Script ---
   

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // --- [START] MODIFIED THIS LOGIC ---

                // 1. Get the height of your sticky header.
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;

                // 2. Convert 2rem to pixels for an accurate calculation.
                const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
                const extraSpace = 2 * remInPixels; // This is your 2rem padding

                // 3. Calculate the final scroll position.
                //    It's the top of the section, minus the header's height, minus the extra space.
                const scrollPosition = targetSection.offsetTop - headerHeight - extraSpace;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });

                // This part for closing the mobile menu also remains the same
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburgerIcon.classList.remove('ri-close-line');
                    hamburgerIcon.classList.add('ri-align-justify');
                }
            }
        });
    });

    // --- Hamburger Icon Click Script ---
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            if (hamburgerIcon.classList.contains("ri-align-justify")) {
                hamburgerIcon.classList.remove("ri-align-justify");
                hamburgerIcon.classList.add("ri-close-line");
            } else {
                hamburgerIcon.classList.remove("ri-close-line");
                hamburgerIcon.classList.add("ri-align-justify");
            }
        });
    }
});


