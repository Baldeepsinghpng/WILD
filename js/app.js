document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       WILD 2.0 — APP ENGINE
       ============================== */

    const plants = [
        {
            name: "Snake Plant",
            keywords: "snake sansevieria indoor low light easy",
            type: "Indoor",
            light: "Low",
            difficulty: "Easy",
            price: 299
        },
        {
            name: "Aloe Vera",
            keywords: "aloe vera indoor outdoor sunlight easy",
            type: "Indoor",
            light: "Bright",
            difficulty: "Easy",
            price: 199
        },
        {
            name: "Peace Lily",
            keywords: "peace lily indoor low light flowering",
            type: "Indoor",
            light: "Low",
            difficulty: "Medium",
            price: 349
        },
        {
            name: "ZZ Plant",
            keywords: "zz zamioculcas indoor low light easy",
            type: "Indoor",
            light: "Low",
            difficulty: "Easy",
            price: 399
        },
        {
            name: "Money Plant",
            keywords: "money plant pothos indoor easy",
            type: "Indoor",
            light: "Medium",
            difficulty: "Easy",
            price: 149
        },
        {
            name: "Spider Plant",
            keywords: "spider plant indoor easy beginner",
            type: "Indoor",
            light: "Medium",
            difficulty: "Easy",
            price: 249
        },
        {
            name: "Areca Palm",
            keywords: "areca palm indoor bright tropical",
            type: "Indoor",
            light: "Bright",
            difficulty: "Medium",
            price: 499
        },
        {
            name: "Jade Plant",
            keywords: "jade succulent outdoor sunlight easy",
            type: "Outdoor",
            light: "Bright",
            difficulty: "Easy",
            price: 299
        }
    ];


    /* ==============================
       SEARCH
       ============================== */

    const search =
        document.querySelector(
            'input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]'
        );

    const cards =
        document.querySelectorAll(
            ".plant-card"
        );

    if (search && cards.length) {

        search.addEventListener("input", () => {

            const query =
                search.value
                    .toLowerCase()
                    .trim();

            let found = 0;

            cards.forEach(card => {

                const text =
                    card.innerText.toLowerCase();

                const match =
                    text.includes(query);

                card.style.display =
                    match ? "" : "none";

                if (match) found++;
            });

            showSearchResult(query, found);
        });
    }


    /* ==============================
       FAVORITES
       ============================== */

    let favorites =
        JSON.parse(
            localStorage.getItem("wildFavorites")
        ) || [];


    document
        .querySelectorAll(".heart")
        .forEach(button => {

            const card =
                button.closest(".plant-card");

            if (!card) return;

            const title =
                card.querySelector("h3");

            if (!title) return;

            const name =
                title.innerText.trim();


            if (favorites.includes(name)) {
                button.innerHTML = "♥";
                button.classList.add("saved");
            }


            button.addEventListener("click", event => {

                event.preventDefault();

                if (favorites.includes(name)) {

                    favorites =
                        favorites.filter(
                            item => item !== name
                        );

                    button.innerHTML = "♡";
                    button.classList.remove("saved");

                    notify(
                        `${name} removed from favorites`
                    );

                } else {

                    favorites.push(name);

                    button.innerHTML = "♥";
                    button.classList.add("saved");

                    notify(
                        `${name} added to favorites ❤️`
                    );
                }


                localStorage.setItem(
                    "wildFavorites",
                    JSON.stringify(favorites)
                );
            });
        });


    /* ==============================
       CARD ANIMATION
       ============================== */

    document
        .querySelectorAll(".plant-card")
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.style.transform =
                        "translateY(-8px)";
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "translateY(0)";
                }
            );
        });


    /* ==============================
       SCROLL REVEAL
       ============================== */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "wild-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12
            }
        );


    document
        .querySelectorAll(
            "section, .plant-card, .category-card, .nursery-card"
        )
        .forEach(element => {

            observer.observe(element);
        });


    /* ==============================
       BACK TO TOP
       ============================== */

    const topButton =
        document.createElement("button");

    topButton.className =
        "wild-top";

    topButton.innerHTML = "↑";

    topButton.title =
        "Back to top";

    document.body.appendChild(
        topButton
    );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );
            }
        }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );


    /* ==============================
       WELCOME MESSAGE
       ============================== */

    setTimeout(() => {

        notify(
            "🌱 Welcome to WILD"
        );

    }, 1000);

});


/* =================================
   SEARCH RESULT MESSAGE
   ================================= */

function showSearchResult(
    query,
    count
) {

    let message =
        document.querySelector(
            ".wild-search-result"
        );


    if (!message) {

        message =
            document.createElement(
                "div"
            );

        message.className =
            "wild-search-result";


        const search =
            document.querySelector(
                'input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]'
            );


        if (
            search &&
            search.parentElement
        ) {

            search.parentElement.appendChild(
                message
            );
        }
    }


    if (!query) {

        message.innerHTML = "";
        return;
    }


    message.innerHTML =
        count > 0

            ? `🌿 ${count} plant${count === 1 ? "" : "s"} found`

            : `🌱 No plants found for "${query}"`;
}


/* =================================
   NOTIFICATION
   ================================= */

function notify(text) {

    const old =
        document.querySelector(
            ".wild-notification"
        );

    if (old) old.remove();


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "wild-notification";


    notification.textContent =
        text;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 20);


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

        setTimeout(
            () => notification.remove(),
            300
        );

    }, 2500);
}
