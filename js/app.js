function App() {
  
  const [site, setSite] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useStored("lumio-cart", {});
  const [favs, setFavs] = useStored("lumio-favs", []);
  const [theme, setTheme] = useState(() => load("lumio-theme", null));
  const [openProduct, setOpenProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [active, setActive] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
      Promise.all([fetch("data/site.json"), fetch("data/products.json")]) // завантаження даних сайту
          .then((res) => Promise.all(res.map((r) => { // перевірка статусу відповіді
              if (!r.ok) throw new Error(r.url + " " + r.status);
              return r.json();
          })))
          .then(([s, p]) => {
              setSite(s);
              setProducts(p);
          })
          .catch((err) => setError("Не вдалося завантажити дані: " + err.message));
  }, []);

  useEffect(() => {
      const root = document.documentElement;
      if (theme) root.setAttribute("data-theme", theme);
      else root.removeAttribute("data-theme");
      save("lumio-theme", theme);
  }, [theme]);

  useEffect(() => {
      const onKey = (e) => {
          if (e.key === "Escape") {
              setOpenProduct(null);
              setCartOpen(false);
          }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { // блокування прокрутки сторінки, коли відкрито модальне вікно або кошик
      document.body.style.overflow = openProduct || cartOpen ? "hidden" : "";
  }, [openProduct, cartOpen]);

  const showToast = (msg) => { 
      setToast(msg);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  const addToCart = (p) => {
      setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
      showToast(p.name + " у кошику");
  };

  const setQty = (id, qty) => setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
  });

  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])); // додавання або видалення лампи з обраного

  const systemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); // визначення системної теми користувача
  const currentTheme = theme || systemTheme();
  const toggleTheme = () => setTheme(currentTheme === "dark" ? "light" : "dark");

  const items = products.filter((p) => cart[p.id]).map((p) => ({ p, qty: cart[p.id] }));
  const cartCount = items.reduce((s, it) => s + it.qty, 0);

  if (error) return h("div", { className: "state" }, error);
  if (!site) return h("div", { className: "state" }, "Завантаження…");

  return h(React.Fragment, null,
      h(Header, {
          site,
          active,
          onNav: setActive,
          cartCount,
          onCart: () => setCartOpen(true),
          theme: currentTheme,
          onTheme: toggleTheme
      }),
      h("main", null,
          h(Hero, { site, products }),
          h(Catalog, {
              site,
              products,
              favs,
              onFav: toggleFav,
              onOpen: setOpenProduct,
              onAdd: addToCart
          }),
          h(Guide, { site, products, onAdd: addToCart }),
          h(About, { site })
      ),
      h(Footer, { site }),
      openProduct && h(Modal, {
          p: openProduct,
          fav: favs.includes(openProduct.id),
          onFav: toggleFav,
          onClose: () => setOpenProduct(null),
          onAdd: addToCart
      }),
      cartOpen && h(CartDrawer, {
          items,
          freeFrom: site.free_delivery_from,
          onClose: () => setCartOpen(false),
          onQty: setQty,
          onClear: () => setCart({})
      }),
      h("div", {
          className: "toast" + (toast ? " is-on" : ""),
          role: "status",
          "aria-live": "polite"
      }, toast)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));