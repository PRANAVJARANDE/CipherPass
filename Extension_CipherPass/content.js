// Listen for messages from the extension's popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Ensure the message is intended for us and has the 'fillForm' action
  if (request.action === "fillForm" && request.data) {
    const { username, password } = request.data;
    fillForm(username, password);
  }
});

function findLoginFields() {
  const possibleEmailSelectors = [
    'input[type="email"]',
    'input[name*="email"]',
    'input[id*="email"]',
    'input[name*="username"]',
    'input[id*="username"]',
    'input[name*="login"]',
    'input[id*="login"]',
  ];

  const possiblePasswordSelectors = [
    'input[type="password"]',
    'input[name*="pass"]',
    'input[id*="pass"]',
  ];

  let emailField = null;
  for (const selector of possibleEmailSelectors) {
    emailField = document.querySelector(selector);
    if (emailField) break;
  }

  let passwordField = null;
  for (const selector of possiblePasswordSelectors) {
    passwordField = document.querySelector(selector);
    if (passwordField) break;
  }

  return { emailField, passwordField };
}

function fillForm(username, password) {
  const { emailField, passwordField } = findLoginFields();

  if (emailField) {
    emailField.value = username;
    // Dispatch an event to mimic user typing
    emailField.dispatchEvent(new Event('input', { bubbles: true }));
    emailField.dispatchEvent(new Event('change', { bubbles: true }));
  }

  if (passwordField) {
    passwordField.value = password;
    passwordField.dispatchEvent(new Event('input', { bubbles: true }));
    passwordField.dispatchEvent(new Event('change', { bubbles: true }));
  }

  if (emailField || passwordField) {
    console.log("CipherPass: Form fields filled successfully.");
  } else {
    console.warn("CipherPass: Could not find suitable login fields to fill.");
  }
}