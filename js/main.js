// active

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}



// mobile menu

var sideMenu = document.getElementById("sidemenu");

function openmenu() {
    sideMenu.style.right = "0";
}
function closemenu() {
    sideMenu.style.right = "-200px";
}


//using selectors inside the element

const questions = document.querySelectorAll('.question');
questions.forEach(function (question) {
    // questions.log(question);
    const btn = question.querySelector(".question-btn");
    // console.log(btn);
    btn.addEventListener("click", function () {

        questions.forEach(function (item) {
            if (item !== question) {
                item.classList.remove("show-text");
            }
        });

        question.classList.toggle("show-text");
    });
});

const cards = document.querySelectorAll('.skill-card');
const highlighted = document.getElementById('highlighted');
const highlightedTitle = document.getElementById('highlighted-title');
const highlightedDesc = document.getElementById('highlighted-desc');
const highlightedIcon = document.getElementById('highlighted-icon');

// helper to set highlighted content
function setHighlighted(title, desc, iconHTML, cardEl) {
    highlightedTitle.textContent = title;
    highlightedDesc.textContent = desc;
    highlightedIcon.innerHTML = iconHTML || '<i class="fa-solid fa-star"></i>';

    // toggle active class visually
    cards.forEach(c => c.classList.remove('card-active', 'bg-[#e7c07a]'));
    if (cardEl) {
        cardEl.classList.add('card-active');
    }
}

// attach click & keyboard support
cards.forEach(card => {
    card.addEventListener('click', () => {
        setHighlighted(card.dataset.title, card.dataset.desc, card.dataset.icon, card);
    });
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setHighlighted(card.dataset.title, card.dataset.desc, card.dataset.icon, card);
        }
    });
});

// mark the Ubuntu card as active by default
// find the card with data-title "Ubuntu" (case sensitive)
const defaultCard = Array.from(cards).find(c => c.dataset.title === 'Ubuntu');
if (defaultCard) {
    setHighlighted(defaultCard.dataset.title, defaultCard.dataset.desc, defaultCard.dataset.icon, defaultCard);
}

// Tab-switching for skill category panels
(function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.tab-panel');

    function showPanel(id) {
        panels.forEach(p => p.classList.add('hidden'));
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
        tabButtons.forEach(b => {
            if (b.dataset.target === id) {
                b.classList.add('bg-yellow-500', 'text-gray-900');
                b.classList.remove('bg-gray-800', 'text-gray-300');
            } else {
                b.classList.remove('bg-yellow-500', 'text-gray-900');
                b.classList.add('bg-gray-800', 'text-gray-300');
            }
        });
    }

    tabButtons.forEach(b => {
        b.addEventListener('click', () => {
            const target = b.dataset.target;
            if (target === 'panel-all') {
                panels.forEach(p => p.classList.remove('hidden'));
                tabButtons.forEach(btn => {
                    btn.classList.remove('bg-yellow-500', 'text-gray-900');
                    btn.classList.add('bg-gray-800', 'text-gray-300');
                });
                b.classList.add('bg-yellow-500', 'text-gray-900');
            } else {
                showPanel(target);
            }
        });
    });

    // default open frontend panel
    showPanel('panel-frontend');
})();

function filterSkills(category) {
        // 1. Manage Tab Styles
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => {
            // Reset all buttons to inactive style
            btn.classList.remove('bg-[#f6c47e]', 'text-gray-900', 'shadow-[0_0_15px_rgba(246,196,126,0.4)]');
            btn.classList.add('bg-[#2b2d32]', 'text-gray-400', 'border-gray-700');
            
            // Set active button style
            if (btn.getAttribute('onclick').includes(category)) {
                btn.classList.remove('bg-[#2b2d32]', 'text-gray-400', 'border-gray-700');
                btn.classList.add('bg-[#f6c47e]', 'text-gray-900', 'shadow-[0_0_15px_rgba(246,196,126,0.4)]');
            }
        });

        // 2. Filter the Grid Items
        const items = document.querySelectorAll('.filter-item');
        
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.classList.add('block', 'animate-fade-in'); // Optional animation class
            } else {
                item.classList.add('hidden');
                item.classList.remove('block');
            }
        });
    }

    // Optional: Add a simple fade-in animation in your CSS
    // <style>
    //   @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    //   .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
    // </style>