const $ = (selector) => document.querySelector(selector);
const products = [
  {
    name: "Dus Ka'bah Paket Hemat",
    price: "Rp 150.000",
    image: "images/DUS KA'BAH PAKET HEMAT.jpeg",
    isDus: true,
    variants: [
      {
        name: "Dus Ka'bah + Candini",
        price: "Rp 135.000",
        image: "images/DUS KA'BAH + CANDINI.jpeg",
      },
      {
        name: "Dus Ka'bah + Coklat",
        price: "Rp 140.000",
        image: "images/DUS KA'BAH + COKLAT.jpeg",
      },
      {
        name: "Dus Ka'bah + Pistachio",
        price: "Rp 165.000",
        image: "images/DUS KA'BAH + PISTACHIO.jpeg",
      },
      {
        name: "Dus Ka'bah Paket Hemat",
        price: "Rp 150.000",
        image: "images/DUS KA'BAH PAKET HEMAT.jpeg",
      },
    ],
  },
  {
    name: "Dus Kotak Hemat",
    price: "Rp 135.000",
    image: "images/DUS KOTAK HEMAT.jpeg",
    isDus: true,
    variants: [
      {
        name: "Dus Kotak + Almond",
        price: "Rp 120.000",
        image: "images/DUS KOTAK + ALMOND.jpeg",
      },
      {
        name: "Dus Kotak + Coklat",
        price: "Rp 125.000",
        image: "images/DUS KOTAK + COKLAT.jpeg",
      },
      {
        name: "Dus Kotak + Pistachio",
        price: "Rp 150.000",
        image: "images/DUS KOTAK + PISTACHIO.jpeg",
      },
      {
        name: "Dus Kotak Hemat",
        price: "Rp 135.000",
        image: "images/DUS KOTAK HEMAT.jpeg",
      },
    ],
  },
  { name: "Air ZamZam", price: "Rp 350.000", image: "images/ZAM ZAM.jpeg" },
  { name: "Kurma", price: "Rp 60.000", image: "images/KURMA.jpeg" },
  { name: "Pistachio", price: "Rp 370.000", image: "images/PISTACHIO.jpeg" },
  { name: "Kismis", price: "Rp 110.000", image: "images/KISMIS.jpeg" },
  {
    name: "Coklat Kerikil",
    price: "Rp 95.000",
    image: "images/COKLAT KERIKIL.jpeg",
  },
  { name: "Kacang Arab", price: "Rp 45.000", image: "images/KACANG ARAB.jpeg" },
  { name: "Almond", price: "Rp 70.000", image: "images/ALMOND.jpeg" },
];
const getCart = () =>
  JSON.parse(localStorage.getItem("arabianSnackCart")) || products[0];
function logout() {
  localStorage.removeItem("arabianSnackRole");
  location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "login") login();
  if (page === "shop") shop();
  if (page === "cart") cart();
  if (page === "checkout") checkout();
  if (page === "payment") payment();
  if (page === "success") success();
  if (page === "admin") admin();
});
function login() {
  let role = "user";
  const modal = $("#loginModal");
  const openModal = () => {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(() => $("#email").focus(), 50);
  };
  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    $("#openLogin").focus();
  };
  $("#openLogin").onclick = openModal;
  document
    .querySelectorAll("[data-close-login]")
    .forEach((button) => (button.onclick = closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
  document.querySelectorAll(".role").forEach(
    (button) =>
      (button.onclick = () => {
        role = button.dataset.role;
        document
          .querySelectorAll(".role")
          .forEach((item) => item.classList.toggle("active", item === button));
        $("#loginButton").textContent =
          `Masuk sebagai ${role === "admin" ? "Admin" : "Pengguna"}`;
      }),
  );
  $("#loginForm").onsubmit = (event) => {
    event.preventDefault();
    const email = $("#email").value.trim(),
      password = $("#password").value;
    const valid =
      role === "admin"
        ? email === "admin@gmail.com" && password === "admin123"
        : email === "user@gmail.com" && password === "user123";
    if (!valid) {
      $("#error").textContent = "Email atau password tidak sesuai.";
      return;
    }
    localStorage.setItem("arabianSnackRole", role);
    location.href = role === "admin" ? "admin.html" : "index.html";
  };
}
function shop() {
  if (localStorage.getItem("arabianSnackRole") !== "user") {
    location.replace("login.html");
    return;
  }
  $("#products").innerHTML = products
    .map(
      (product, index) =>
        `<article class="product card"><div class="product-visual"><img src="${product.image}" alt="${product.name}"></div><div class="product-info"><h3>${product.name}</h3><p class="price">${product.price}</p><button class="btn add" data-id="${index}">${product.isDus ? "Pilih Paket" : "Tambah ke Keranjang"}</button></div></article>`,
    )
    .join("");
  document.querySelectorAll(".add").forEach(
    (button) =>
      (button.onclick = () => {
        localStorage.setItem(
          "arabianSnackCart",
          JSON.stringify(products[button.dataset.id]),
        );
        location.href = "cart.html";
      }),
  );
}
function cart() {
  const item = getCart();
  $("#cartImage").src = item.image;
  $("#cartImage").alt = item.name;
  $("#cartName").textContent = item.name;
  $("#cartPrice").textContent = item.price;
  if (!item.isDus) return;
  $("#dusOptions").hidden = false;
  $("#variantList").innerHTML = item.variants
    .map(
      (variant, index) =>
        `<button class="variant-option ${variant.name === item.name ? "active" : ""}" data-id="${index}"><img src="${variant.image}" alt="${variant.name}"><span>${variant.name}<small>${variant.price}</small></span></button>`,
    )
    .join("");
  document.querySelectorAll(".variant-option").forEach(
    (button) =>
      (button.onclick = () => {
        const variant = item.variants[button.dataset.id];
        item.name = variant.name;
        item.price = variant.price;
        item.image = variant.image;
        $("#cartImage").src = item.image;
        $("#cartName").textContent = item.name;
        $("#cartPrice").textContent = item.price;
        document
          .querySelectorAll(".variant-option")
          .forEach((choice) =>
            choice.classList.toggle("active", choice === button),
          );
        localStorage.setItem("arabianSnackCart", JSON.stringify(item));
      }),
  );
}
function checkout() {
  const item = getCart();
  $("#checkoutName").textContent = item.name;
  $("#checkoutPrice").textContent = item.price;
}
function payment() {
  const item = getCart();
  $("#payPrice").textContent = item.price;
  let selected = false;
  document.querySelectorAll(".method").forEach(
    (button) =>
      (button.onclick = () => {
        document
          .querySelectorAll(".method")
          .forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        selected = true;
      }),
  );
  $("#payButton").onclick = () =>
    selected
      ? (location.href = "success.html")
      : alert("Silakan pilih metode pembayaran.");
}
function success() {
  const item = getCart();
  $("#successDetail").textContent = `${item.name} - ${item.price}`;
}

function admin() {
  if (localStorage.getItem("arabianSnackRole") !== "admin") {
    location.replace("login.html");
    return;
  }
  const labels = {
    dashboard: ["Dashboard Admin", "Ringkasan toko hari ini."],
    produk: ["Produk", "Kelola katalog dan stok produk."],
    pesanan: ["Pesanan", "Pantau status pesanan pelanggan."],
    pengguna: ["Pengguna", "Daftar pengguna yang terdaftar."],
  };
  const sidebar = document.querySelector(".sidebar"),
    toggle = $("#menuToggle"),
    overlay = $("#sidebarOverlay");
  const closeMenu = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.onclick = () => {
    const open = sidebar.classList.toggle("open");
    overlay.classList.toggle("show", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  overlay.onclick = closeMenu;
  document.querySelectorAll(".nav button").forEach(
    (button) =>
      (button.onclick = () => {
        const panel = button.dataset.panel;
        document
          .querySelectorAll(".nav button")
          .forEach((item) => item.classList.toggle("active", item === button));
        document
          .querySelectorAll(".admin-panel")
          .forEach((item) => (item.hidden = item.id !== panel));
        $("#adminTitle").textContent = labels[panel][0];
        $("#adminSubtitle").textContent = labels[panel][1];
        closeMenu();
      }),
  );
}
