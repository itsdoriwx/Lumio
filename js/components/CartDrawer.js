function CartDrawer({ items, freeFrom, onClose, onQty, onClear }) {
  
  const [done, setDone] = useState(false);
  const total = items.reduce((s, it) => s + it.p.price * it.qty, 0);
  const left = Math.max(0, freeFrom - total);
  const progress = Math.min(100, (total / freeFrom) * 100);

  let content;
  if (done) {
      content = h("div", { className: "drawer-empty" },
          h("p", null, h("b", null, "Дякуємо за замовлення!")),
          h("button", {
              className: "btn btn-primary",
              onClick: () => {
                  setDone(false);
                  onClose();
              }
          }, "Повернутися до каталогу")
      );
  } else if (items.length === 0) {
      content = h("div", { className: "drawer-empty" },
          h("p", null, h("b", null, "У кошику порожньо.")),
          h("p", null, "Додайте лампу з каталогу."),
          h("button", {
              className: "btn btn-ghost",
              onClick: onClose
          }, "Закрити")
      );
  } else {
      content = h(React.Fragment, null,
          h("div", { className: "ship" },
              h("p", null, left > 0 ? h(React.Fragment, null, "До безкоштовної доставки ще ", h("b", null, money(left))) : h("b", null, "Доставка безкоштовна!")),
              h("div", { className: "bar" },
                  h("span", { style: { width: progress + "%" } })
              )
          ),
          h("ul", { className: "lines" },
              items.map(({ p, qty }) =>
                  h("li", { key: p.id },
                      h("span", {
                          className: "dot dot-lg",
                          style: { background: p.shade },
                          "aria-hidden": "true"
                      }),
                      h("div", { className: "line-info" },
                          h("b", null, p.name),
                          h("small", null, TYPE_NAMES[p.type], " · ", money(p.price))
                      ),
                      h("div", { className: "qty" },
                          h("button", {
                              onClick: () => onQty(p.id, qty - 1),
                              "aria-label": "Менше"
                          }, "−"),
                          h("span", null, qty),
                          h("button", {
                              onClick: () => onQty(p.id, qty + 1),
                              "aria-label": "Більше"
                          }, "+")
                      ),
                      h("b", { className: "line-sum" }, money(p.price * qty))
                  )
              )
          ),
          h("div", { className: "drawer-foot" },
              h("div", { className: "total" },
                  h("span", null, "Разом:"),
                  h("b", null, money(total))
              ),
              h("button", {
                  className: "btn btn-primary btn-block",
                  onClick: () => {
                      onClear();
                      setDone(true);
                  }
              }, "Оформити замовлення"),
              h("button", {
                  className: "link-btn",
                  onClick: onClear
              }, "Очистити кошик")
          )
      );
  }

  return h("div", {
      className: "overlay overlay-side",
      onClick: onClose
  },
      h("aside", {
          className: "drawer",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Кошик",
          onClick: (e) => e.stopPropagation()
      },
          h("div", { className: "drawer-head" },
              h("h3", null, "Кошик"),
              h("button", {
                  className: "icon-btn",
                  onClick: onClose,
                  "aria-label": "Закрити"
              }, Icon.close)
          ),
          content
      )
  );
}