const API_BASE_URL = 'http://localhost:8000'; 

// UI elements
const loginContainer = document.getElementById('login-container');
const passwordListContainer = document.getElementById('password-list-container');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const searchInput = document.getElementById('search-input');
const passwordListEl = document.getElementById('password-list');
const noPasswordsEl = document.getElementById('no-passwords');
const autofillBtn = document.getElementById('autofill-btn');
const masterPasswordModal = document.getElementById('master-password-modal');
const masterPasswordInput = document.getElementById('master-password');
const confirmFillBtn = document.getElementById('confirm-fill-btn');
const closeModalBtn = document.querySelector('.close-btn');

let currentCredentials = [];
let currentURL = '';
let selectedPassword = null;

// --- Helper Functions ---

async function getJwtToken() {
  const result = await chrome.storage.local.get('accessToken');
  return result.accessToken;
}

async function generateAndStoreKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const publicKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privateKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);

  await chrome.storage.local.set({
    publicKey: publicKeyJwk,
    privateKey: privateKeyJwk
  });
  
  return { publicKeyJwk, privateKeyJwk };
}

function saveJwtToken(token) {
  chrome.storage.local.set({ accessToken: token });
}

function clearJwtToken() {
  chrome.storage.local.remove('accessToken');
}


async function fetchPasswords() {
  const token = await getJwtToken();
  if (!token) return;

  try {
    const response = await fetch(`${API_BASE_URL}/password/allpasswords`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch passwords.');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching passwords:', error);
    return [];
  }
}


// Update the confirmFillBtn event listener
confirmFillBtn.addEventListener('click', async () => {
  const masterPassword = masterPasswordInput.value;
  if (!masterPassword) {
    alert("Please enter your master password.");
    return;
  }
  
  // You would need a master password check here, but we'll assume it's correct for now.
  
  try {
    const { id } = selectedPassword;
    const { publicKey, privateKey } = await chrome.storage.local.get(['publicKey', 'privateKey']);
    const token = await getJwtToken();

    const response = await fetch(`${API_BASE_URL}/password/getpassword/${id}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text: publicKey }), // `publicKey` should be a plain string
    });
    
    const data = await response.json();

    if (response.ok) {
      const { encryptedPassword, username, email } = data.data;
      const decryptedPassword = await decryptPassword(encryptedPassword, privateKey);
      
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "fillForm",
            data: {
              username: username,
              email: email,
              password: decryptedPassword // Use the decrypted password
            }
          });
        }
      });
      
      masterPasswordModal.style.display = 'none';
      window.close();
    } else {
      alert("Error fetching or decrypting password.");
      masterPasswordModal.style.display = 'none';
    }
  } catch (error) {
    console.error('Error fetching/decrypting password:', error);
    alert('An unexpected error occurred.');
    masterPasswordModal.style.display = 'none';
  }
});

async function decryptPassword(encryptedPassword, privateKeyJwk) {
  const privateKey = await window.crypto.subtle.importKey(
    "jwk",
    privateKeyJwk,
    { name: "RSA-OAEP", hash: "SHA-256" },
    true,
    ["decrypt"]
  );

  const decryptedBytes = await window.crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    _base64ToArrayBuffer(encryptedPassword)
  );

  return new TextDecoder().decode(decryptedBytes);
}

function _base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function displayPasswords(passwords) {
  passwordListEl.innerHTML = '';
  if (passwords.length === 0) {
    noPasswordsEl.style.display = 'block';
  } else {
    noPasswordsEl.style.display = 'none';
    passwords.forEach(pw => {
      const item = document.createElement('div');
      item.className = 'password-item';
      item.innerHTML = `
        <p><strong>${pw.websiteName}</strong></p>
        <p class="username">${pw.username}</p>
        <p class="email">${pw.email}</p>
      `;
      item.addEventListener('click', () => {
        document.querySelectorAll('.password-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
        selectedPassword = pw;
        masterPasswordModal.style.display = 'flex'; 
      });
      passwordListEl.appendChild(item);
    });
  }
}

// --- Event Listeners ---

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, password }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) { 
      const { accessToken } = data.data;
      saveJwtToken(accessToken);
      showPasswordList();
      console.log("Logged in successfully!");
      
    } else {
      const errorMessage = data?.message || 'Invalid credentials.';
    }
  } catch (error) {
    console.error(error);
  }
});

logoutBtn.addEventListener('click', () => {
  clearJwtToken();
  loginContainer.style.display = 'block';
  passwordListContainer.style.display = 'none';
});

confirmFillBtn.addEventListener('click', async () => {
  const masterPassword = masterPasswordInput.value;
  // TODO: Implement master password verification on the client-side
  // For this example, we'll assume it's correct for now.
  if (masterPassword) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "fillForm",
          data: {
            username: selectedPassword.username,
            password: selectedPassword.password
          }
        });
      }
    });
    masterPasswordModal.style.display = 'none';
    window.close();
  }
});

closeModalBtn.addEventListener('click', () => {
  masterPasswordModal.style.display = 'none';
});

// --- Initialization ---

async function init() {
  const token = await getJwtToken();
  if (token) {
    showPasswordList();
  } else {
    loginContainer.style.display = 'block';
  }
}

async function showPasswordList() {
    loginContainer.style.display = 'none';
    passwordListContainer.style.display = 'block';
    currentCredentials = await fetchPasswords();
    displayPasswords(currentCredentials.data);
}

document.addEventListener('DOMContentLoaded', init);