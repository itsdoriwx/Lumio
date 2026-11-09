function Hero({ site, products }) { 
  
  const [on, setOn] = useState(true); //стан лампи
  const [kelvin, setKelvin] = useState(5600); // початкове значення температури світла
  const rgb = kelvinRgb(kelvin);
  const glow = `rgb(${rgbStr(rgb)})`; // колір світіння лампи
  const hero = site.hero;
  const maxLumens = products.reduce((m, p) => Math.max(m, p.lumens), 0); 

  return h("section", { className: "hero", id: "top" },
      h("div", {
          className: "hero-glow",
          style: {
              background: `radial-gradient(55% 70% at 72% 46%, rgba(${rgbStr(rgb)},.42), transparent 70%)`,
              opacity: on ? 1 : 0
          },
          "aria-hidden": "true",
      }),
      h("div", { className: "wrap hero-grid" },
          h("div", { className: "hero-copy" },
              h("p", { className: "eyebrow" }, hero.eyebrow),
              h("h1", null, hero.title),
              h("p", { className: "lead" }, hero.text),
              h("div", { className: "hero-actions" },
                  h("a", {
                      className: "btn btn-primary",
                      href: "#catalog",
                      onClick: (e) => goTo(e, "#catalog")
                  }, "До каталогу"),
                  h("a", {
                      className: "btn btn-light",
                      href: "#guide",
                      onClick: (e) => goTo(e, "#guide")
                  }, "Підібрати світло")
              ),
              h("dl", { className: "hero-stats" },
                  h("div", null,
                      h("dt", null, "Моделей"),
                      h("dd", null, h(CountUp, { value: String(products.length) }))
                  ),
                  h("div", null,
                      h("dt", null, "До"),
                      h("dd", null, h(CountUp, { value: maxLumens + " лм" }))
                  ),
                  h("div", null,
                      h("dt", null, "Діапазон"),
                      h("dd", null, h(CountUp, { value: "2200 – 6500 K" }))
                  )
              )
          ),
          h("div", { className: "hero-stage" },
              h("div", { className: "hero-lamp" },
                  h(Lamp, {
                      id: "hero",
                      type: "table",
                      shade: "#5AA9FF",
                      body: "#0F2A52",
                      glow,
                      level: on ? 1 : 0,
                      label: "Інтерактивна настільна лампа"
                  })
              ),
              h("div", { className: "dial" },
                  h("div", { className: "dial-top" },
                      h("button", {
                          className: "switch" + (on ? " is-on" : ""),
                          role: "switch",
                          "aria-checked": on,
                          onClick: () => setOn(!on)
                      },
                          h("span", { className: "switch-knob" }),
                          h("span", { className: "sr" }, "Увімкнути лампу")
                      ),
                      h("div", { className: "dial-read" },
                          h("b", null, on ? kelvin + " K" : "Вимкнено"),
                          h("span", null, on ? kelvinName(kelvin) : "Натисніть перемикач")
                      )
                  ),
                  h("input", {
                      id: "kelvin",
                      className: "range range-kelvin",
                      type: "range",
                      min: "2200",
                      max: "6500",
                      step: "100",
                      value: kelvin,
                      onChange: (e) => {
                          setKelvin(+e.target.value);
                          setOn(true);
                      },
                      "aria-label": "Температура світла",
                  }),
                  h("div", { className: "dial-scale" },
                      h("span", null, "2200 K"),
                      h("span", null, "6500 K")
                  )
              )
          )
      )
  );
}