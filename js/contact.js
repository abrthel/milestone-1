/**
 * Given an input HTMLElement object, this function will find the elements parent
 * then proceed to delete all child div tags under that parent.
 *
 * Div tags in our contact form hold our error messages.
 *
 * @param  {HTMLElement} input - The input to clear of errors
 */
function clearErrors(input) {
  const parent = input.parentElement;
  const errors = parent.querySelectorAll("div");

  for(const error of errors) {
    error.remove();
  }
}

/**
 * Builds a new error element and attaches it to the given input.
 *
 * @param  {HTMLElement} input - Input which errors should be attached to
 * @param  {string} message - Message to put in newly built element
 */
function buildInputError(input, message) {
  const parent = input.parentElement;
  const element = document.createElement("div");
  const messageElement = document.createElement("p");

  element.classList.add("formError");
  messageElement.textContent = message;

  element.appendChild(messageElement);
  parent.appendChild(element);
}

/**
 * Determines if the content within the contact form is valid.
 *
 * @returns {bool} - True if the contact form is valid otherwise false.
 */
function validateContactForm() {
  const emailInput   = document.getElementById("emailInput");
  const subjectInput = document.getElementById("subjectInput");
  const messageInput = document.getElementById("messageInput");
  const swears =  ["feldercarb", "frack", "skinjob", "vulgacarb"];
  const messageValue = messageInput.value.trim().toLowerCase();


  let isValid = true; // Assume valid unless determined otherwise.
  let swearCount = 0;
  let containsSwear = false;
  let swear = "";

  // Clear previous errors
  clearErrors(emailInput);
  clearErrors(subjectInput);
  clearErrors(messageInput);

  if(!emailInput.value.trim()) {
    isValid = false;
    buildInputError(emailInput, "Oops! You must provide an email.");
  }

  if(!subjectInput.value.trim()) {
    isValid = false;
    buildInputError(subjectInput, "Oops! You must provide a message subject.");
  }

  if(!messageValue) {
    isValid = false;
    buildInputError(messageInput, "Oops! You must provide a message.");
  }

  do {
    swear = swears[swearCount];
    swearCount++;

    if(messageValue.includes(swear)) {
      isValid = false;
      containsSwear = true;
      buildInputError(messageInput, "Notice: I am a professional and I will not tolerate unprofessional language.");
    }
  } while(!containsSwear && swearCount < swears.length)

  return isValid;
}


// Event Handler for the ContactForm Submit Event.
document
  .getElementById("contactForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const email   = document.getElementById("emailInput").value.trim()
    const subject = document.getElementById("subjectInput").value.trim();

    const emailSubject =  encodeURIComponent(`[${email}] ${subject}`);
    const message = encodeURIComponent(
                      document.getElementById("messageInput").value.trim()
                    );

    const isValid = validateContactForm();
    const link = `mailto:example@example.com?&subject=${emailSubject}&body=${message}`

    if(isValid) {
      window.location = link;
    }
  })
