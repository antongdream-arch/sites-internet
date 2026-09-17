document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ANIMATION AU SCROLL (IntersectionObserver)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // 2. LOGIQUE DU PANIER CLICK & COLLECT SIMPLIFIÉ
    let total = 0;
    const cartItemsContainer = document.getElementById("cart-items");
    const cartPriceElement = document.getElementById("cart-price");

    document.querySelectorAll(".btn-select-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const plat = e.target.getAttribute("data-plat");
            const prix = parseFloat(e.target.getAttribute("data-prix"));

            // Supprimer le message "Panier vide" au premier ajout
            if (document.querySelector(".empty-cart")) {
                cartItemsContainer.innerHTML = "";
            }

            // Ajouter l'élément au panier visuel
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item-row";
            itemElement.innerHTML = `<span>${plat}</span> <strong>${prix} €</strong>`;
            cartItemsContainer.appendChild(itemElement);

            // Mise à jour du prix total
            total += prix;
            cartPriceElement.textContent = total;
        });
    });

    // 3. SOUMISSION DU FORMULAIRE DE COMMANDE
    document.getElementById("order-form").addEventListener("submit", (e) => {
        e.preventDefault();
        if (total === 0) {
            alert("Veuillez sélectionner au moins un plat dans la carte.");
            return;
        }
        alert(`Commande validée ! Montant à régler au retrait : ${total} €. Un SMS de confirmation vous a été envoyé.`);
    });
});