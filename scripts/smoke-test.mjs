
import assert from "node:assert/strict";

const base = "http://127.0.0.1:8080";
const id = Date.now().toString(36);

const user = {
  username: `ci_${id}`,
  fullname: "CI Test User",
  email: `ci_${id}@example.invalid`,
  password: "TestPassword_12345!",
};

async function post(path, body) {
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  assert.equal(res.status, 200, `${path} failed`);
  return res.json();
}

// Test 1: Register user and save in MongoDB
await post("/users/register", user);
console.log("PASS: User registration");

// Test 2: Login and receive JWT token
const data = await post("/users/login", {
  text: user.email,
  password: user.password,
});

const token = data.data?.accessToken;
assert.ok(token, "Access token was not returned");
console.log("PASS: User login");

// Test 3: Access a protected API
const res = await fetch(`${base}/users/getcurrentuser`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

assert.equal(res.status, 200, "Protected API failed");
console.log("PASS: Authenticated API access");

console.log("All smoke tests passed!");
