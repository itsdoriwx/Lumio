function Catalog({ site, products, favs, onFav, onOpen, onAdd }) {
  
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [onlyFavs, setOnlyFavs] = useState(false);

  const counts = useMemo(() => { // підрахунок кількості ламп у кожній категорії
      const c = { all: products.length };
      products.forEach((p) => {
          c[p.type] = (c[p.type] || 0) + 1;
      });
      return c;
  }, [products]);

  const list = useMemo(() => {  // підрахунок відфільтрованого та відсортованого списку
      const q = query.trim().toLowerCase();
      let out = products.filter((p) =>
          (cat === "all" || p.type === cat) &&
          (!onlyFavs || favs.includes(p.id)) &&
          (q === "" || p.name.toLowerCase().includes(q))
      );
      if (sort === "asc") out = [...out].sort((a, b) => a.price - b.price); 
      if (sort === "desc") out = [...out].sort((a, b) => b.price - a.price);
      if (sort === "lumens") out = [...out].sort((a, b) => b.lumens - a.lumens); 
      return out;
  }, [products, cat, query, sort, onlyFavs, favs]);

  const reset = () => {
      setCat("all");
      setQuery("");
      setOnlyFavs(false);
  };

  return h("section", { className: "section", id: "catalog" }, 
      h("div", { className: "wrap" },
          h("div", { className: "section-head" },
              h("p", { className: "eyebrow eyebrow-dark" }, "Каталог"),
              h("h2", null, "Лампи для кожної кімнати")
          ),
          h("div", { className: "tools" },
              h("div", {
                  className: "chips",
                  role: "tablist",
                  "aria-label": "Категорії"
              },
                  site.categories.map((c) =>
                      h("button", {
                          key: c.id,
                          role: "tab",
                          "aria-selected": cat === c.id,
                          className: "chip" + (cat === c.id ? " is-on" : ""),
                          onClick: () => setCat(c.id)
                      },
                          c.label, " ", h("span", { className: "chip-n" }, counts[c.id] || 0)
                      )
                  )
              ),
              h("div", { className: "tools-row" },
                  h("label", {
                      className: "search",
                      htmlFor: "q"
                  },
                      Icon.search,
                      h("input", {
                          id: "q",
                          type: "search",
                          placeholder: "Пошук за назвою",
                          value: query,
                          onChange: (e) => setQuery(e.target.value)
                      })
                  ),
                  h("label", {
                      className: "select-wrap",
                      htmlFor: "sort"
                  },
                      h("span", { className: "sr" }, "Сортування"),
                      h("select", {
                          id: "sort",
                          value: sort,
                          onChange: (e) => setSort(e.target.value)
                      },
                          h("option", { value: "default" }, "За замовчуванням"),
                          h("option", { value: "asc" }, "Спочатку дешевші"),
                          h("option", { value: "desc" }, "Спочатку дорожчі"),
                          h("option", { value: "lumens" }, "Найяскравіші")
                      )
                  ),
                  h("button", {
                      className: "chip" + (onlyFavs ? " is-on" : ""),
                      "aria-pressed": onlyFavs,
                      onClick: () => setOnlyFavs(!onlyFavs)
                  },
                      "Обране ", h("span", { className: "chip-n" }, favs.length)
                  )
              )
          ),
          list.length === 0 ? h("div", { className: "empty" },
                  h("p", null, h("b", null, "Нічого не знайдено.")),
                  h("p", null, onlyFavs && favs.length === 0 ? "Додайте лампи в обране серцем на картці." : "Спробуйте інше слово або іншу категорію."),
                  h("button", {
                      className: "btn btn-ghost btn-sm",
                      onClick: reset
                  }, "Скинути фільтри")
              )
              : h("div", { className: "grid" },
                  list.map((p) =>
                      h(Card, {
                          key: p.id,
                          p,
                          fav: favs.includes(p.id),
                          onFav,
                          onOpen,
                          onAdd
                      })
                  )
              )
      )
  );
}