function Header({ site, active, onNav, cartCount, onCart, theme, onTheme }) {
  
  const [open, setOpen] = useState(false);

  return h("header", { className: "header" },
      h("div", { className: "wrap header-row" },
          h("a", {
              className: "brand",
              href: "#top",
              onClick: (e) => {
                  goTo(e, "#top");
                  onNav(null);
              }
          },
              h("span", {
                  className: "brand-dot",
                  "aria-hidden": "true"
              }),
              site.brand
          ),
          h("nav", {
              className: "nav" + (open ? " nav-open" : ""),
              "aria-label": "Основне меню"
          },
              site.menu.map((item) =>
                  h("a", {
                      key: item.href,
                      href: item.href,
                      className: "nav-link" + (active === item.href.slice(1) ? " is-active" : ""),
                      onClick: (e) => {
                          goTo(e, item.href);
                          onNav(item.href.slice(1));
                          setOpen(false);
                      }
                  }, item.label)
              )
          ),
          h("div", { className: "header-tools" },
              h("button", {
                  className: "icon-btn",
                  onClick: onTheme,
                  title: "Тема",
                  "aria-label": theme === "dark" ? "Світла тема" : "Темна тема"
              },
                  theme === "dark" ? Icon.sun : Icon.moon
              ),
              h("button", {
                  className: "icon-btn",
                  onClick: onCart,
                  "aria-label": "Кошик, товарів: " + cartCount
              },
                  Icon.cart,
                  cartCount > 0 && h("span", {
                      className: "count",
                      key: cartCount
                  }, cartCount)
              ),
              h("button", {
                  className: "icon-btn burger",
                  onClick: () => setOpen(!open),
                  "aria-label": "Меню",
                  "aria-expanded": open
              },
                  open ? Icon.close : Icon.menu
              )
          )
      )
  );
}