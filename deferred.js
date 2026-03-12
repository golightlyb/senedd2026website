

/*component:main-navigation [deferred]*/
if (usedScripts.indexOf('component:main-navigation [deferred]') >= 0) {


(function() {
    const nav = document.getElementById("js-main-navigation");
    const links = document.getElementById("js-main-navigation__links");
    const dropdown = document.getElementById("js-main-navigation__dropdown");
    const headings = links.querySelectorAll("li");
    let submenus = {}; let activeSubmenu = null;

    function mousedo(e, f) {
        g = function () {
            if (!deferredStylesHaveLoaded()) { return; }
            f();
        }
        e.addEventListener("mouseenter", g);
        e.addEventListener("mousemove",  g);
        e.addEventListener("mouseleave", g);
    }

    function activateSubmenu(heading) {
        headings.forEach(function(e) {
            // unset all except heading
            if (e === heading) { return; }
            e.classList.remove("active");
            if ((e.dataset.section) && (activeSubmenu == e.dataset.section) && dropdown.firstElementChild) {
                dropdown.firstElementChild.remove()
                dropdown.classList.remove("active");
            }
        });
        if (!heading) {
            activeSubmenu = null;
            return
        }

        let name = heading.dataset.section;
        let submenu = submenus[name];
        if (submenu) {
            activeSubmenu = name;
            dropdown.appendChild(submenu);
            dropdown.classList.add("active");

            if (submenu.classList.contains("wide")) {
                dropdown.classList.add("wide");
            } else {
                dropdown.classList.remove("wide");
            }

            /* don't go past end of page if wide on a narrow screen */
            let r = heading.getBoundingClientRect();
            let right = document.documentElement.clientWidth - r.right;
            if (dropdown.classList.contains("wide") && (r.right < 720)) {
                dropdown.style.right = "";
                dropdown.style.left = "0px";
            } else {
                right -= 20;
                if (right < 0) { right = 0; }
                dropdown.style.left = "";
                dropdown.style.right = right + "px";
            }
        }
    }

    // dim background below navigation if hovering over a menu item
    {
        const fade = document.getElementById("js-main-navigation__fader");
        mousedo(nav, function() {
            if (nav.parentElement.querySelector(":hover") == nav) {
                fade.classList.add("active");
            } else {
                fade.classList.remove("active");
                activateSubmenu(null);
            }
        });
    }

    // remove submenu templates for attaching later
    headings.forEach(function(e) {
        let name = e.dataset.section;
        if (!name) { return; }
        t = document.getElementById("js-main-navigation__"+name+"-dropdown");
        t.remove();
        submenus[name] = t;
    });

    // attach submenu on hover
    headings.forEach(function(heading) {
        mousedo(heading, function() {
            if (heading.classList.contains("active")) { return; }
            heading.classList.add("active");
            activateSubmenu(heading);
        });
    });
})();


}







