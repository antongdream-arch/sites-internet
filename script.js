document.addEventListener("DOMContentLoaded", () => {
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

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
            cartPriceElement.textContent = total;
        });
    });

    document.getElementById("order-form").addEventListener("submit", (e) => {
        e.preventDefault();
        if (total === 0) {
            /* MODIFIABLE : Message d'erreur panier vide */
            alert("Veuillez ajouter au moins un plat à votre commande.");
            return;
        }
        /* MODIFIABLE : Message de confirmation après commande */
        alert(`Votre commande a été envoyée ! Montant à régler lors du retrait : ${total} €.`);
    });
});
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