// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};


// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if(top >= offset && top < offset + height) {
        navLinks.forEach(links => {
          links.classList.remove('active');
          document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        });
      };
    })


    // sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);


    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');



};


// scroll reveal
ScrollReveal({
  reset: false,
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading, .about-img-wrapper', { origin: 'top' });
ScrollReveal().reveal('.home-img, .about-content, .skills-column, .education-column, .projects-box, .contact form', { origin: 'bottom' });



//typed js
const typed = new Typed('.multiple-text', {
  strings: ['Web Developer', 'Digital Creator', 'Problem Solver', 'AI/ML Enthusiast', 'Creative Designer', 'Tech Explorer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});



// skills animation
function animateSkills() {
  document.querySelectorAll('.progress .bar span').forEach(bar => {
    let target = parseInt(bar.getAttribute('data-value'));
    let percentText = bar.parentElement.previousElementSibling.querySelector('span');
    let current = 0;

    let interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
      } else {
        current++;
        bar.style.width = current + '%';
        percentText.textContent = current + '%';
      }
    }, 25);
  });
}

function resetSkills() {
  document.querySelectorAll('.progress .bar span').forEach(bar => {
    bar.style.width = '0%';
    bar.parentElement.previousElementSibling.querySelector('span').textContent = '0%';
  });
}

// scroll-into-view trigger with reset
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => animateSkills(), 100);
    } else {
      resetSkills();
      }
  });
}, { threshold: 0.3 });

observer.observe(skillsSection);



/// ================= CONTACT FORM + EMAIL OTP =================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");
    const successBox = document.getElementById("form-success");

    // ================= CUSTOM ALERT =================

    const customAlert = document.getElementById("custom-alert");
    const customAlertMessage = document.getElementById("custom-alert-message");
    const customAlertOk = document.getElementById("custom-alert-ok");

    function showCustomAlert(message, type = "success") {
        customAlertMessage.textContent = message;

        const icon = customAlert.querySelector(".custom-alert-icon");
        const title = document.getElementById("custom-alert-title");
        const alertBox = customAlert.querySelector(".custom-alert-box");

        alertBox.classList.remove("alert-success", "alert-error");

        if (type === "error") {
            alertBox.classList.add("alert-error");
            icon.innerHTML = "<i class='bx bx-x'></i>";
            title.textContent = "Invalid";
        } else {
            alertBox.classList.add("alert-success");
            icon.innerHTML = "<i class='bx bx-check'></i>";
            title.textContent = "Success";
        }
        customAlert.style.display = "flex";
    }

    customAlertOk.addEventListener("click", () => {
        customAlert.style.display = "none";
    });

    const otpSection = document.getElementById("otp-section");
    const otpInput = document.getElementById("otp");
    const verifyOtpBtn = document.getElementById("verify-otp");
    const resendOtpBtn = document.getElementById("resend-otp");
    const otpDigits = document.querySelectorAll(".otp-digit");

    function activateOtpMode() {
        form.classList.add("otp-active");

        // Remove focus from any background field
        document.activeElement?.blur();

        // Lock background fields
        form.querySelectorAll("input, textarea, button").forEach(element => {
            if (!element.closest("#otp-section")) {

                if (element.tagName === "BUTTON") {
                    element.dataset.otpDisabled = "true";
                    element.disabled = true;
                } else {
                    element.dataset.otpReadonly = "true";
                    element.readOnly = true;
                }
            }
        });

        // Focus first OTP box
        setTimeout(() => {
            otpDigits[0]?.focus();
        }, 50);
    }

    function updateOtpValue() {
        otpInput.value = Array.from(otpDigits)
            .map(input => input.value)
            .join("");
    }




    /// ========= Input OTP Digit ========= ///
    otpDigits.forEach((input, index) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g, "");

            if (input.value && index < otpDigits.length - 1) {
                otpDigits[index + 1].focus();
            }
            updateOtpValue();
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && index > 0) {
                otpDigits[index - 1].focus();
            }
        });

        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const pasteOtp = e.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, 6);
            
            pasteOtp.split("").forEach((digit, i) => {
                if (otpDigits[i]) {
                    otpDigits[i].value = digit;
                }
            });

            updateOtpValue();

            if (pasteOtp.length > 0) {
                const focusIndex = Math.min(
                    pasteOtp.length,
                    otpDigits.length - 1
                );

                otpDigits[focusIndex].focus();
            }
        });
    });


    let otpSent = false;
    let resendTimer = null;
    let resendSeconds = 60;

    if (!form) return;

    function startResendCountdown() {
        clearInterval(resendTimer);

        resendSeconds = 60;
        resendOtpBtn.disabled = true;

        resendOtpBtn.textContent =
            `Resend OTP in ${resendSeconds}s`;

        resendTimer = setInterval(() => {
            resendSeconds--;

            if (resendSeconds <= 0) {
                clearInterval(resendTimer);
                resendTimer = null;

                resendOtpBtn.disabled = false;
                resendOtpBtn.textContent = "Resend OTP";
                return;
            }

            resendOtpBtn.textContent =
                `Resend OTP in ${resendSeconds}s`;
        }, 1000);
    }




    // ================= SEND OTP =================

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // If OTP has already been sent, don't send again
        if (otpSent) {
            return;
        }

        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const phone = form.querySelector('[name="phone"]').value.trim();
        const subject = form.querySelector('[name="subject"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        // if (!name || !email || !phone || !subject || !message) {
        //     alert("Please fill in all fields.");
        //     return;
        // }


        // ================= FORM VALIDATION =================

        // Name: at least two words, letters only
        const namePattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;

        if (!namePattern.test(name.trim())) {
            showCustomAlert(
                "Please enter a valid full name, e.g. Alex Grey.",
                "error"
            );
            return;
        }

        // Mobile: exactly 10 digits, starting from 6-9
        const mobilePattern = /^[6-9]\d{9}$/;

        if (!mobilePattern.test(phone.trim())) {
            showCustomAlert(
                "Please enter a valid 10-digit mobile number.",
                "error"
            );
            return;
        }

        // Subject: required, any text is allowed
        if (!subject.trim()) {
            showCustomAlert(
                "Please enter a subject.",
                "error"
            );
            return;
        }

        // Message: at least 3 words
        const messageWords = message.trim().split(/\s+/);

        if (messageWords.length < 3) {
            showCustomAlert(
                "Please enter at least a few words in your message.",
                "error"
            );
            return;
        }



        try {
            const { error } = await supabaseClient.auth.signInWithOtp({
                email: email,
                options: {
                    shouldCreateUser: true
                }
            });

            if (error) {
                console.error("OTP error:", error);
                alert("Unable to send OTP: " + error.message);
                return;
            }

            otpSent = true;
            otpSection.style.display = "block";
            activateOtpMode();
            startResendCountdown();

            showCustomAlert("A 6-digit OTP has been sent to your Email.");

        } catch (error) {

            console.error(error);
            alert("Something went wrong while sending OTP.");

        }
    });





    // ================= ENTER KEY → VERIFY OTP =================

    otpDigits.forEach((input) => {
        input.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {
                e.preventDefault();
                verifyOtpBtn.click();
            }

        });
    });





    // ================= VERIFY OTP =================

    verifyOtpBtn.addEventListener("click", async () => {

        const email = form.querySelector('[name="email"]').value.trim();
        const otp = otpInput.value.trim();

        if (!otp || otp.length !== 6) {
            alert("Please enter the 6-digit OTP.");
            return;
        }

        verifyOtpBtn.disabled = true;
        verifyOtpBtn.textContent = "Verifying...";
        try {
            const { data, error } =
                await supabaseClient.auth.verifyOtp({
                    email: email,
                    token: otp,
                    type: "email"
                });

            if (error) {
                console.error("OTP verification error:", error);

                showCustomAlert("Invalid or expired OTP.");
                verifyOtpBtn.disabled = false;
                verifyOtpBtn.textContent = "Verify OTP";
                return;
            }





            // ================= SAVE MESSAGE =================

            const { error: insertError } =
                await supabaseClient
                    .from("contact_messages")
                    .insert([
                        {
                            full_name: form.querySelector('[name="name"]').value.trim(),
                            email: email,
                            mobile: form.querySelector('[name="phone"]').value.trim(),
                            subject: form.querySelector('[name="subject"]').value.trim(),
                            message: form.querySelector('[name="message"]').value.trim()
                        }
                    ]);

            if (insertError) {
                console.error("Database error:", insertError);
                alert(
                    "Email verified, but the message could not be saved."
                );

                verifyOtpBtn.disabled = false;
                verifyOtpBtn.textContent = "Verify OTP";
                return;
            }





            // ================= EMAILJS → OWNER =================

            await emailjs.sendForm(
                "service_ty7fdf4",
                "template_54juhpb",
                form
            );





            // ================= EMAILJS → USER =================

            await emailjs.send(
                "service_ty7fdf4",
                "template_a2egls4",
                {
                    name: form.querySelector('[name="name"]').value.trim(),
                    email: email,
                    subject: form.querySelector('[name="subject"]').value.trim(), 
                    message: form.querySelector('[name="message"]').value.trim()
                }
            );





            // ================= SUCCESS =================

            successBox.textContent =
                "Message Sent Successfully!";
            successBox.classList.add("show");

            form.reset();
            otpSection.style.display = "none";

            otpSent = false;

            verifyOtpBtn.disabled = false;
            verifyOtpBtn.textContent = "Verify OTP";
            setTimeout(() => {
                successBox.classList.remove("show");
            }, 4000);

        } catch (error) {
            console.error("Confirmation email error:", error);
            alert(
                "Confirmation email error:\n" +
                "Status: " + (error.status || "Unknown") +
                "\nMessage: " + (error.text || error.message || "Unknown error")
            );
            verifyOtpBtn.disabled = false;
            verifyOtpBtn.textContent = "Verify OTP";
        }
    });





    // ================= RESEND OTP =================

    resendOtpBtn.addEventListener("click", async () => {
        const email = form.querySelector('[name="email"]').value.trim();
        if (!email) {
            alert("Please enter your email address first.");
            return;
        }
        resendOtpBtn.disabled = true;
        resendOtpBtn.textContent = "Sending...";
        try {
            const { error } =
                await supabaseClient.auth.signInWithOtp({
                    email: email,
                    options: {
                        shouldCreateUser: true
                    }
                });
            if (error) {
                showCustomAlert("Could not resend OTP: " + error.message);
            } else {
                startResendCountdown();
                showCustomAlert("A new OTP has been sent to your Email.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
        resendOtpBtn.disabled = false;
        resendOtpBtn.textContent = "Resend OTP";
    });





    // ================= ENTER KEY =================

    const textarea = form.querySelector("textarea");
    if (textarea) {
        textarea.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (e.shiftKey) {
                    return;
                }
                e.preventDefault();
                form.dispatchEvent(
                    new Event("submit", { cancelable: true })
                );
            }
        });
    }



    // ========== ABOUT READ MORE ========== //
    const aboutText = document.querySelector(".about-text");
    const aboutToggle = document.querySelector(".about-toggle");

    if (aboutText && aboutToggle) {
        aboutToggle.addEventListener("click", (e) => {
            e.preventDefault();

            aboutText.classList.toggle("expanded");

            if (aboutText.classList.contains("expanded")) {
                aboutToggle.textContent = "Read Less";
            } else {
                aboutToggle.textContent = "Read More";
            }
        });
    }



});





// Visitor Counter Database Connection
const SUPABASE_URL = "https://znwndwaatefykhtrkquu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_vvH7tObzf103oYyZWgdSNg_NGhvTwJx";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

async function updateVisitorCount() {
    const counter = document.getElementById("visitor-count");

    if (!counter) return;

    const { data, error } = await supabaseClient.rpc(
        "increment_visitor_count"
    );

    if (error) {
        console.error("Visitor counter error:", error);
        counter.textContent = "—";
        return;
    }

    counter.textContent = data;
}

updateVisitorCount();