function About({ site }) {
  const about = site.about;

  return h("section", { className: "section", id: "about" },
      h("div", { className: "wrap about-grid" },
          h("div", null,
              h("p", { className: "eyebrow eyebrow-dark" }, "Про нас"),
              h("h2", null, about.title),
              h("p", { className: "about-text" }, about.text)
          ),
          h("ul", { className: "facts" },
              about.facts.map((f) =>
                  h("li", { key: f.label },
                      h(CountUp, { value: f.value }),
                      h("span", null, f.label)
                  )
              )
          )
      )
  );
}