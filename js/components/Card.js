function Card({ p, fav, onFav, onOpen, onAdd }) {
  
  const [hover, setHover] = useState(false);

  return h("article", {
      className: "card",
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onFocus: () => setHover(true),
      onBlur: () => setHover(false),
  },
      h("div", { className: "card-art" },
          h("button", {
              className: "card-open",
              onClick: () => onOpen(p)
          },
              h(Lamp, {
                  id: "c" + p.id,
                  type: p.type,
                  shade: p.shade,
                  body: p.body,
                  glow: p.shade,
                  level: hover ? 1 : 0.5,
                  label: p.name
              })
          ),
          p.badge && h("span", { className: "badge" }, p.badge),
          h("button", {
              className: "fav" + (fav ? " is-on" : ""),
              onClick: () => onFav(p.id),
              "aria-pressed": fav
          },
              Icon.heart(fav)
          )
      ),
      h("div", { className: "card-body" },
          h("p", { className: "card-type" }, TYPE_NAMES[p.type]),
          h("h3", null, p.name),
          h("p", { className: "spec" }, p.lumens, " лм · ", p.watts, " Вт · ", rangeText(p.kelvin)),
          h("div", { className: "card-foot" },
              h("b", { className: "price" }, money(p.price)),
              h("div", { className: "card-btns" },
                  h("button", {
                      className: "btn btn-ghost btn-sm",
                      onClick: () => onOpen(p)
                  }, "Деталі"),
                  h("button", {
                      className: "btn btn-primary btn-sm",
                      onClick: () => onAdd(p)
                  }, "У кошик")
              )
          )
      )
  );
}