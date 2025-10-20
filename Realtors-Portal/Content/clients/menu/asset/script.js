const menuToggle = document.querySelector(".mobile-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    menu.classList.remove("active");
  }
});
// Mở / đóng menu mobile
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

// Xử lý tìm kiếm
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    alert(`Bạn vừa tìm kiếm: "${query}"`);
  } else {
    alert("Vui lòng nhập từ khóa cần tìm!");
  }
});
