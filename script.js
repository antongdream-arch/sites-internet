document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFFET DE TRANSITION NAVBAR AU SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. GESTION DU MENU BURGER / MOBILE
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("open");
            });
        });
    }

    // 3. PANIER / CLICK & COLLECT (Présent sur l'accueil)
    let total = 0;
    const cartItemsContainer = document.getElementById("cart-items");
    const cartPriceElement = document.getElementById("cart-price");

    document.querySelectorAll(".btn-add-inline").forEach(button => {
        button.addEventListener("click", (e) => {
            const plat = e.target.getAttribute("data-plat");
            const prix = parseFloat(e.target.getAttribute("data-prix"));

            if (cartItemsContainer) {
                if (document.querySelector(".empty-cart")) {
                    cartItemsContainer.innerHTML = "";
                }

                const itemElement = document.createElement("div");
                itemElement.style.display = "flex";
                itemElement.style.justifyContent = "space-between";
                itemElement.style.padding = "0.4rem 0";
                itemElement.style.fontSize = "0.9rem";
                itemElement.style.borderBottom = "1px solid var(--border)";
                itemElement.innerHTML = `<span>${plat}</span> <strong>${prix} €</strong>`;
                
                cartItemsContainer.appendChild(itemElement);

                total += prix;
                if (cartPriceElement) cartPriceElement.textContent = total;
            }
        });
    });

    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (total === 0) {
                alert("Veuillez ajouter au moins un plat à votre commande.");
                return;
            }
            alert(`Votre commande a été transmise ! Montant à régler lors du retrait : ${total} €.`);
        });
    }

    // 4. FILTRES DE LA CARTE (Présent sur menu.html)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuBlocks = document.querySelectorAll(".menu-section-block");

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

                menuBlocks.forEach(block => {
                    if (filterValue === "all" || block.getAttribute("data-category") === filterValue) {
                        block.classList.remove("hidden");
                    } else {
                        block.classList.add("hidden");
                    }
                });
            });
        });
    }
});