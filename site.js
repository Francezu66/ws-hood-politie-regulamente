(() => {
  const cards = [...document.querySelectorAll(".document-card")];
  const filters = [...document.querySelectorAll(".filter-button")];
  const search = document.querySelector("#search");
  const emptyState = document.querySelector("#empty-state");
  let activeFilter = "all";

  function normalizeSearchText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("ro");
  }

  function updateCards() {
    const query = normalizeSearchText(search.value.trim());
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const searchableText = normalizeSearchText(`${card.textContent} ${card.dataset.search}`);
      const matchesSearch = !query || searchableText.includes(query);
      const visible = matchesCategory && matchesSearch;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    emptyState.hidden = visibleCount > 0;
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      activeFilter = filter.dataset.filter;
      filters.forEach((button) => {
        const selected = button === filter;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      updateCards();
    });
  });

  search.addEventListener("input", updateCards);
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== search && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === "Escape" && document.activeElement === search) {
      search.value = "";
      updateCards();
      search.blur();
    }
  });
})();
