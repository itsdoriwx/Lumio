function Guide({ site, products, onAdd }) {
  
  const [roomId, setRoomId] = useState("living");
  const room = site.rooms.find((r) => r.id === roomId);
  const matches = products.filter((p) => p.kelvin[0] <= room.kelvin[1] && p.kelvin[1] >= room.kelvin[0]);
  const pos = (k) => ((k - 2200) / 4300) * 100;

  return h("section", { className: "section section-tint", id: "guide" },
      h("div", { className: "wrap" },
          h("div", { className: "section-head" },
              h("p", { className: "eyebrow eyebrow-dark" }, "Підбір світла"),
              h("h2", null, "Яке світло потрібне вам?")
          ),
          h("div", {
              className: "chips",
              role: "tablist",
              "aria-label": "Кімнати"
          },
              site.rooms.map((r) => // кнопки для вибору кімнати
                  h("button", {
                      key: r.id,
                      role: "tab",
                      "aria-selected": roomId === r.id,
                      className: "chip" + (roomId === r.id ? " is-on" : ""), // підсвічування активної кнопки
                      onClick: () => setRoomId(r.id)
                  }, r.label)
              )
          ),
          h("div", { className: "guide-grid" },
              h("div", { className: "guide-card" },
                  h("h3", null, room.label),
                  h("p", null, room.text),
                  h("div", {
                      className: "kscale",
                      "aria-hidden": "true"
                  },
                      h("div", { className: "kscale-bar" },
                          h("span", {
                              className: "kscale-zone",
                              style: {
                                  left: pos(room.kelvin[0]) + "%", 
                                  width: pos(room.kelvin[1]) - pos(room.kelvin[0]) + "%"
                              }
                          })
                      ),
                      h("div", { className: "kscale-ticks" },
                          h("span", null, "2200"),
                          h("span", null, "3000"),
                          h("span", null, "4000"),
                          h("span", null, "5000"),
                          h("span", null, "6500 K")
                      )
                  ),
                  h("p", { className: "spec" }, rangeText(room.kelvin), " · ", room.lumens)
              ),
              h("div", { className: "guide-list" },
                  h("p", { className: "guide-count" }, "Підходить: ", matches.length, " з ", products.length),
                  h("ul", null,
                      matches.map((p) =>
                          h("li", { key: p.id },
                              h("span", {
                                  className: "dot",
                                  style: { background: p.shade },
                                  "aria-hidden": "true"
                              }),
                              h("span", { className: "li-name" },
                                  p.name,
                                  h("small", null, TYPE_NAMES[p.type], " · ", rangeText(p.kelvin))
                              ),
                              h("b", { className: "price" }, money(p.price)),
                              h("button", {
                                  className: "btn btn-ghost btn-sm",
                                  onClick: () => onAdd(p)
                              }, "У кошик")
                          )
                      )
                  )
              )
          )
      )
  );
}