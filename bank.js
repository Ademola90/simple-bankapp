function LogIn(page) {
    if (page === "login") {
        window.location.href = "login.html"
    } else if (page === "signup") {
        window.location.href = "create-account.html"
    } else if (page === "logOut") {
        window.location.href = "login.html"
    }

}

function generateRandomAccountNumber() {
    // Generate a random 10-digit account number
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

function generateAccountNumber() {
    const accountNumberInput = document.getElementById("accountNumber");
    accountNumberInput.value = generateRandomAccountNumber();
}

function createAccount() {
    const usernameInput = document.getElementById("createUsername");
    const passwordInput = document.getElementById("createPassword");
    const accountNumberInput = document.getElementById("accountNumber");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const accountNumber = accountNumberInput.value;

    // Check if the username already exists in local storage
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
        alert("You already have an account. Please login.");
    } else if (username && password && accountNumber) {
        // Save username, password, and initial total amount in local storage
        localStorage.setItem(username, JSON.stringify({ password, accountNumber, totalAmount: 0 }));

        // Redirect to the login page
        window.location.href = "login.html";
    } else {
        alert("Please fill in all the fields.");
    }
}

// function createAccount() {
//     const usernameInput = document.getElementById("createUsername");
//     const passwordInput = document.getElementById("createPassword");
//     const accountNumberInput = document.getElementById("accountNumber");

//     const username = usernameInput.value;
//     const password = passwordInput.value;
//     const accountNumber = accountNumberInput.value;

//     // Check if the username already exists in local storage
//     const existingUser = localStorage.getItem(username);
//     if (existingUser) {
//         alert("You already have an account. Please login.");
//     } else if (username && password && accountNumber) {
//         // Save username and password in local storage
//         localStorage.setItem(username, JSON.stringify({ password, accountNumber }));

//         // Redirect to the login page
//         window.location.href = "login.html";
//     } else {
//         alert("Please fill in all the fields.");
//     }
// }


function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if the entered username exists in local storage
    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const storedPassword = JSON.parse(storedUser).password;

        // Check if the entered password matches the stored password
        if (password === storedPassword) {
            // Redirect to the home page with the username as a query parameter
            window.location.href = `home-page.html?username=${username}`;
        } else {
            alert("Incorrect password. Please try again.");
        }
    } else {
        alert("No account found with the entered username. Please create an account.");
    }
}


// function login() {
//     const usernameInput = document.getElementById("username");
//     const passwordInput = document.getElementById("password");

//     const username = usernameInput.value;
//     const password = passwordInput.value;

//     // Check if the entered username exists in local storage
//     const storedUser = localStorage.getItem(username);

//     if (storedUser) {
//         const storedPassword = JSON.parse(storedUser).password;

//         // Check if the entered password matches the stored password
//         if (password === storedPassword) {
//             // Redirect to the home page with the username as a query parameter
//             window.location.href = `home-page.html?username=${username}`;
//         } else {
//             alert("Incorrect password. Please try again.");
//         }
//     } else {
//         alert("No account found with the entered username. Please create an account.");
//     }
// }

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function initHomePage() {
    const username = getQueryParam("username");
    const user = JSON.parse(localStorage.getItem(username));

    if (user) {
        document.getElementById("usernamePlaceholder").innerText = username;
        document.getElementById("balance").innerText = user.totalAmount.toFixed(2);
    }
}

// function initHomePage() {
//     const username = getQueryParam("username");
//     document.getElementById("usernamePlaceholder").innerText = username;
// }

// function initHomePage() {
//     const username = getQueryParam("username");
//     document.getElementById("usernamePlaceholder").innerText = username;
// }

function deposit() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount) && amount > 0) {
        updateBalance(amount);
        amountInput.value = ""; // Clear the input field
    } else {
        alert("Invalid amount. Please enter a positive number.");
    }
}



function withdraw() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);
    const balanceElement = document.getElementById("balance");
    let currentBalance = parseFloat(balanceElement.innerText);

    if (!isNaN(amount) && amount > 0 && amount <= currentBalance) {
        updateBalance(-amount);
        amountInput.value = ""; // Clear the input field
    } else if (amount > currentBalance) {
        alert("Insufficient funds. You cannot withdraw more than your balance.");
    } else {
        alert("Invalid amount. Please enter a positive number.");
    }
}


function updateBalance(amount) {
    const username = getQueryParam("username");
    const user = JSON.parse(localStorage.getItem(username));

    if (user) {
        user.totalAmount += amount;
        localStorage.setItem(username, JSON.stringify(user));
        document.getElementById("balance").innerText = user.totalAmount.toFixed(2);
    }
}
// Check if the current page is home-page.html and initialize it
if (window.location.pathname.includes("home-page.html")) {
    initHomePage();
}


function deleteAccount() {
    const username = getQueryParam("username");
    const confirmation = confirm(`Are you sure you want to delete the account for ${username}?`);

    if (confirmation) {
        // Remove user data from local storage
        localStorage.removeItem(username);
        // Redirect to the login page
        window.location.href = "login.html";
    }
}

// function logout() {
//     // Redirect to the login page
//     window.location.href = "login.html";
// }


// for password reset

function resetPassword() {
    const usernameOrEmailInput = document.getElementById("usernameOrEmail");
    const usernameOrEmail = usernameOrEmailInput.value;

    // Check if the username or email exists in local storage
    const storedUser = localStorage.getItem(usernameOrEmail);

    if (storedUser) {
        // Generate a temporary password (for simplicity)
        const temporaryPassword = generateTemporaryPassword();

        // Update the stored user data with the temporary password
        const user = JSON.parse(storedUser);
        user.password = temporaryPassword;
        localStorage.setItem(usernameOrEmail, JSON.stringify(user));

        alert(`Your password has been reset. Your temporary password is: ${temporaryPassword}`);
    } else {
        alert("No account found with the entered username or email.");
    }
}

function generateTemporaryPassword() {
    // Generate a 5-digit random temporary password
    const temporaryPassword = Math.floor(10000 + Math.random() * 90000);
    return temporaryPassword.toString();
}


function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const button = document.querySelector(`[onclick="togglePasswordVisibility('${inputId}')"]`);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        button.textContent = "";
    } else {
        passwordInput.type = "password";
        button.textContent = "";
    }
}
