
const books = [
    {
        id: "B101",
        title: "The Alchemist",
        author: "Paulo Coelho",
        publisher: "HarperOne",
        price: 399,
        category: "Fiction"
    },
    {
        id: "B102",
        title: "Wings of Fire",
        author: "A. P. J. Abdul Kalam",
        publisher: "Universities Press",
        price: 299,
        category: "Biography"
    },
    {
        id: "B103",
        title: "Clean Code",
        author: "Robert C. Martin",
        publisher: "Prentice Hall",
        price: 650,
        category: "Programming"
    },
    {
        id: "B104",
        title: "Learning JavaScript",
        author: "Ethan Brown",
        publisher: "O'Reilly",
        price: 520,
        category: "Programming"
    },
    {
        id: "B105",
        title: "Atomic Habits",
        author: "James Clear",
        publisher: "Avery",
        price: 450,
        category: "Self-help"
    },
    {
        id: "B106",
        title: "Ikigai",
        author: "H. Garcia and F. Miralles",
        publisher: "Penguin",
        price: 275,
        category: "Self-help"
    },
    {
        id: "B107",
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        publisher: "HarperCollins",
        price: 499,
        category: "Fiction"
    },
    {
        id: "B108",
        title: "Database System Concepts",
        author: "Silberschatz et al.",
        publisher: "McGraw Hill",
        price: 720,
        category: "Academic"
    },
    {
        id: "B109",
        title: "Computer Networks",
        author: "Andrew S. Tanenbaum",
        publisher: "Pearson",
        price: 680,
        category: "Academic"
    },
    {
        id: "B110",
        title: "Python Crash Course",
        author: "Eric Matthes",
        publisher: "No Starch Press",
        price: 590,
        category: "Programming"
    }
];

function money(price) {
    return "₹" + price.toFixed(2);
}

function getCart() {
    return JSON.parse(localStorage.getItem("bookCart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("bookCart", JSON.stringify(cart));
}

function addToCart(id) {
    let cart = getCart();
    let item = cart.find(item => item.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ id: id, qty: 1 });
    }

    saveCart(cart);
    alert("Book added to cart!");
}

function renderBooks(targetId) {
    let target = document.getElementById(targetId);

    if (!target) return;

    target.innerHTML = books.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p>Book ID: ${book.id}</p>
            <p>Author: ${book.author}</p>
            <p>Publisher: ${book.publisher}</p>
            <p>Category: ${book.category}</p>
            <p>Price: ${money(book.price)}</p>

            <a class="button"
               href="details.html?id=${book.id}">
               View Details
            </a>

            <button onclick="addToCart('${book.id}')">
                Add to Cart
            </button>
        </div>
    `).join("");
}

function renderFeatured() {
    renderBooks("featured");
}

function showBookDetails() {
    let id = new URLSearchParams(location.search).get("id") || "B101";
    let book = books.find(item => item.id === id) || books[0];

    document.getElementById("bookDetails").innerHTML = `
        <h2>${book.title}</h2>
        <p>Book ID: ${book.id}</p>
        <p>Author: ${book.author}</p>
        <p>Publisher: ${book.publisher}</p>
        <p>Category: ${book.category}</p>
        <p>Price: ${money(book.price)}</p>
        <p>Description: Learn more about ${book.title}.</p>
        <p>Availability: In Stock</p>

        <button onclick="addToCart('${book.id}')">
            Add to Cart
        </button>
    `;
}

function renderCart() {
    let body = document.getElementById("cartRows");
    let totalElement = document.getElementById("cartTotal");

    if (!body || !totalElement) return;

    let cart = getCart();
    let total = 0;

    body.innerHTML = "";

    if (cart.length === 0) {
        body.innerHTML =
            '<tr><td colspan="5">Your cart is empty.</td></tr>';
    }

    cart.forEach(item => {
        let book = books.find(book => book.id === item.id);

        if (!book) return;

        let subtotal = book.price * item.qty;
        total += subtotal;

        body.innerHTML += `
            <tr>
                <td>${book.title}</td>
                <td>${money(book.price)}</td>
                <td>
                    <input type="number" min="1"
                        value="${item.qty}"
                        onchange="updateQty('${book.id}', this.value)">
                </td>
                <td>${money(subtotal)}</td>
                <td>
                    <button onclick="removeFromCart('${book.id}')">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });

    totalElement.textContent = money(total);
}

function updateQty(id, quantity) {
    let cart = getCart();
    let item = cart.find(item => item.id === id);

    if (item) {
        item.qty = Math.max(1, parseInt(quantity) || 1);
    }

    saveCart(cart);
    renderCart();
}

function removeFromCart(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

function validateRegistration() {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value;

    let message = document.getElementById("regMessage");

    if (name === "" || email === "" || password.length < 8) {
        message.textContent =
            "Enter your name, email, and a password of at least 8 characters.";
    } else {
        message.textContent =
            "Registration form validated successfully (demo only).";
    }

    return false;
}

function validateLogin() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;
    let message = document.getElementById("loginMessage");

    if (email === "" || password === "") {
        message.textContent = "Please enter email and password.";
    } else {
        message.textContent =
            "Login form checked (demo only; no real authentication).";
    }

    return false;
}

function validateContact() {
    let name = document.getElementById("contactName").value.trim();
    let text = document.getElementById("contactText").value.trim();
    let message = document.getElementById("contactMessage");

    if (name === "" || text === "") {
        message.textContent = "Please enter your name and message.";
    } else {
        message.textContent =
            "Thank you! Your message passed validation.";
    }

    return false;
}