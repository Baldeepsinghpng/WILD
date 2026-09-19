/* =========================================================
   WILD 2.0 — GOD MODE INTERACTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- SMOOTH SCROLL ---------- */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* ---------- SEARCH ENGINE ---------- */

    const searchInput =
        document.querySelector('input[type="search"]') ||
        document.querySelector('input[placeholder*="Search"]');

    const cards =
        document.querySelectorAll(
            ".plant-card, .plant-card-container, .plant-item, article"
        );

    if (searchInput && cards.length) {

        searchInput.addEventListener("input", () => {

            const query = searchInput.value
                .toLowerCase()
                .trim();

            let visible = 0;

            cards.forEach(card => {

                const text =
                    card.innerText.toLowerCase();

                if (!query || text.includes(query)) {

                    card.style.display = "";
                    visible++;

                    card.animate(
                        [
                            { opacity: 0.3, transform: "scale(.97)" },
                            { opacity: 1, transform: "scale(1)" }
                        ],
                        {
                            duration: 220,
                            easing: "ease-out"
                        }
                    );

                } else {

                    card.style.display = "none";
                }
            });

            showSearchMessage(query, visible);
        });
    }


    /* ---------- FAVORITES SYSTEM ---------- */

    const savedPlants =
        JSON.parse(localStorage.getItem("wildFavorites")) || [];

    document.querySelectorAll(".heart").forEach(button => {

        const card = button.closest(
            ".plant-card, article, .plant-item"
        );

        if (!card) return;

        const plantName =
            card.querySelector("h3, h2, h4")?.innerText?.trim();

        if (!plantName) return;

        if (savedPlants.includes(plantName)) {
            button.classList.add("saved");
            button.innerHTML = "♥";
        }

        button.addEventListener("click", e => {

            e.preventDefault();
            e.stopPropagation();

            const index =
                savedPlants.indexOf(plantName);

            if (index === -1) {

                savedPlants.push(plantName);

                button.classList.add("saved");
                button.innerHTML = "♥";

                notify(`🌿 ${plantName} saved`);

            } else {

                savedPlants.splice(index, 1);

                button.classList.remove("saved");
                button.innerHTML = "♡";

                notify(`${plantName} removed`);
            }

            localStorage.setItem(
                "wildFavorites",
                JSON.stringify(savedPlants)
            );
        });
    });


    /* ---------- CARD HOVER EFFECT ---------- */

    document.querySelectorAll(
        ".plant-card, article"
    ).forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transition =
                "transform .25s ease, box-shadow .25s ease";

            card.style.transform =
                "translateY(-7px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0)";
        });
    });


    /* ---------- SCROLL REVEAL ---------- */

    const revealElements =
        document.querySelectorAll(
            "section, .plant-card, article"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "wild-visible"
                        );

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.08
            }
        );

    revealElements.forEach(el =>
        observer.observe(el)
    );


    /* ---------- ACTIVE NAVIGATION ---------- */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            'nav a[href^="#"]'
        );

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.getBoundingClientRect().top;

            if (top <= 150) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                current &&
                link.getAttribute("href") === "#" + current
            ) {
                link.classList.add("active");
            }
        });
    });


    /* ---------- BACK TO TOP ---------- */

    const topButton =
        document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.className = "wild-top";

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {

        topButton.classList.toggle(
            "show",
            window.scrollY > 600
        );
    });

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* ---------- WELCOME ---------- */

    setTimeout(() => {

        notify("🌱 Welcome to WILD 2.0");

    }, 700);

});


/* =========================================================
   SEARCH MESSAGE
   ========================================================= */

function showSearchMessage(query, count) {

    let message =
        document.querySelector(".wild-search-message");

    if (!message) {

        message =
            document.createElement("div");

        message.className =
            "wild-search-message";

        const search =
            document.querySelector(
                'input[type="search"], input[placeholder*="Search"]'
            );

        if (search) {
            search.parentElement.appendChild(message);
        }
    }

    if (!query) {

        message.innerHTML = "";
        return;
    }

    message.innerHTML =
        count
            ? `🌿 ${count} plant${count === 1 ? "" : "s"} found`
            : `🌱 No plants found for "${query}"`;
}


/* =========================================================
   TOAST NOTIFICATIONS
   ========================================================= */

function notify(message) {

    const old =
        document.querySelector(".wild-toast");

    if (old) old.remove();

    const toast =
        document.createElement("div");

    toast.className = "wild-toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => toast.remove(), 300);

    }, 2200);
}
