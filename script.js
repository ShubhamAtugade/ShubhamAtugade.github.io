document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-Form');
    const responseMessage = document.getElementById('responseMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

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
                    responseMessage.style.color = "#4ade80"; 
                    contactForm.reset();
                } else {
                    responseMessage.innerHTML = "Oops! " + data.message;
                    responseMessage.style.color = "#f87171"; 
                }
            })
            .catch(error => {
                console.error('Error:', error);
                responseMessage.innerHTML = "Oops! Something went wrong.";
                responseMessage.style.color = "#f87171"; 
            });
        });
    }


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
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const navMenu = document.querySelector(".links");
    const navLinks = document.querySelectorAll('.nav-button');
  

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
            
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;

                const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
                const extraSpace = 2 * remInPixels;
                
                const scrollPosition = targetSection.offsetTop - headerHeight - extraSpace;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburgerIcon.classList.remove('ri-close-line');
                    hamburgerIcon.classList.add('ri-align-justify');
                }
            }
        });
    });
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



