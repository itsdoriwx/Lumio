function Footer({ site }) {
  const c = site.contacts;

  return h("footer", { className: "footer", id: "contacts" },
      h("div", { className: "wrap footer-grid" },
          h("div", null,
              h("a", {
                  className: "brand brand-light",
                  href: "#top",
                  onClick: (e) => goTo(e, "#top")
              }, site.brand),
              h("p", { className: "footer-tag" }, site.tagline)
          ),
          h("address", null,
              h("h4", null, "Контакти"),
              h("p", null, c.address),
              h("p", null, c.phone),
              h("p", null, c.email),
              h("p", null, c.hours)
          ),
          h("div", null,
              h("h4", null, "Ми в соцмережах"),
              h("ul", { className: "social" },
                  site.social.map((s) =>
                      h("li", { key: s.label },
                          h("a", {
                              href: s.href,
                              target: "_blank",
                              rel: "noopener noreferrer"
                          },
                              SocialIcon[s.label],
                              s.label
                          )
                      )
                  )
              )
          )
      ),
      h("div", { className: "wrap footer-bottom" },
          h("span", null, "© 2026 ", site.brand)
      )
  );
}