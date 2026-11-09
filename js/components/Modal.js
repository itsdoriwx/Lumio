function Modal({ p, fav, onFav, onClose, onAdd }) {
  const kMin = p.kelvin[0];
  const kMax = p.kelvin[1];
  const [kelvin, setKelvin] = useState(Math.round((kMin + kMax) / 2 / 100) * 100);
  const closeRef = useRef(null);
  useEffect(() => {
      if (closeRef.current) closeRef.current.focus();
  }, []);

  const glow = `rgb(${rgbStr(kelvinRgb(kelvin))})`; // колір світіння лампи
  const adjustable = kMax > kMin;
  const rows = [
      ["Тип", TYPE_NAMES[p.type]],
      ["Світловий потік", p.lumens + " лм"],
      ["Потужність", p.watts + " Вт"],
      ["Колірна температура", rangeText(p.kelvin)],
      ["Цоколь", p.base],
      ["Матеріал", p.material],
  ];

  return h("div", { className: "overlay", onClick: onClose },
      h("div", {
          className: "modal",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": p.name,
          onClick: (e) => e.stopPropagation() // щоб клік по модальному вікні не закривав його
      },
          h("button", {
              ref: closeRef,
              className: "icon-btn modal-close",
              onClick: onClose,
              "aria-label": "Закрити"
          }, Icon.close),
          h("div", { className: "modal-art" },
              h(Lamp, {
                  id: "m" + p.id,
                  type: p.type,
                  shade: p.shade,
                  body: p.body,
                  glow,
                  level: 1,
                  label: p.name
              }),
              h("div", { className: "modal-k" },
                  h("div", { className: "dial-read" },
                      h("b", null, kelvin + " K"),
                      h("span", null, kelvinName(kelvin)) // назва температури світла (теплий, нейтральний, холодний)
                  ),
                  adjustable
                      ? h("input", {
                          id: "modal-kelvin",
                          className: "range range-kelvin",
                          type: "range",
                          min: kMin,
                          max: kMax,
                          step: "100",
                          value: kelvin,
                          onChange: (e) => setKelvin(+e.target.value),  
                          "aria-label": "Температура світла"
                      })
                      : h("span", { className: "spec" }, "Фіксована температура")
              )
          ),
          h("div", { className: "modal-info" },
              h("p", { className: "card-type" }, TYPE_NAMES[p.type]),
              h("h3", null, p.name),
              h("p", { className: "modal-text" }, p.text),
              h("table", { className: "specs" },
                  h("tbody", null,
                      rows.map(([k, v]) => // створення рядків таблиці з характеристиками лампи
                          h("tr", { key: k },
                              h("th", { scope: "row" }, k),
                              h("td", null, v)
                          )
                      )
                  )
              ),
              h("div", { className: "modal-foot" },
                  h("b", { className: "price price-lg" }, money(p.price)),
                  h("button", {
                      className: "icon-btn fav-inline" + (fav ? " is-on" : ""),
                      onClick: () => onFav(p.id),
                      "aria-pressed": fav,
                      "aria-label": "Обране"
                  }, Icon.heart(fav)), 
                  h("button", {
                      className: "btn btn-primary",
                      onClick: () => onAdd(p)
                  }, "Додати в кошик")
              )
          )
      )
  );
}