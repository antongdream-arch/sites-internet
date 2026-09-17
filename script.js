document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GESTION DU MENU HAMBURGER MOBILE
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        // Fermer le menu au clic sur un lien
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    // 2. ANIMATION AU SCROLL (IntersectionObserver)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // 3. PANIER CLICK & COLLECT SIMPLIFIÉ
    let total = 0;
    const cartItemsContainer = document.getElementById("cart-items");
    const cartPriceElement = document.getElementById("cart-price");

    document.querySelectorAll(".btn-add-inline").forEach(button => {
        button.addEventListener("click", (e) => {
            const plat = e.target.getAttribute("data-plat");
            const prix = parseFloat(e.target.getAttribute("data-prix"));

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
        });
    });

    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (total === 0) {
                /* MODIFIABLE : Message d'erreur panier vide */
                alert("Veuillez ajouter au moins un plat à votre commande.");
                return;
            }
            /* MODIFIABLE : Confirmation de commande */
            alert(`Votre commande a été transmise ! Montant à régler lors du retrait : ${total} €.`);
        });
    }

    // 4. FILTRES DE LA PAGE CARTE (menu.html)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuBlocks = document.querySelectorAll(".menu-section-block");

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
});