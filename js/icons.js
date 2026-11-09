const svgBase = {
  viewBox: "0 0 24 24",
  width: "20",
  height: "20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
};

const Icon = {
  cart: h("svg", svgBase, h("path", { d: "M3 4h2.2l2 11h10.2l2-8H6.4" }), h("circle", { cx: "9", cy: "19.5", r: "1.3" }), h("circle", { cx: "17", cy: "19.5", r: "1.3" })
  ),
  heart: (on) => h("svg", {...svgBase, fill: on ? "currentColor" : "none"}, h("path", { d: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" })),
  moon: h("svg", svgBase, h("path", { d: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" })),
  sun: h("svg", svgBase, h("circle", { cx: "12", cy: "12", r: "4" }), h("path", { d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" })
  ),
  close: h("svg", svgBase, h("path", { d: "M5 5l14 14M19 5L5 19" }) ),
  
  menu: h("svg", {
      ...svgBase,
      width: "22",
      height: "22"
  },
      h("path", { d: "M4 7h16M4 12h16M4 17h16" })
  ),
  search: h("svg", {...svgBase, width: "18", height: "18"
  },
      h("circle", { cx: "11", cy: "11", r: "6.5" }),
      h("path", { d: "M16 16l4 4" })
  ),
};

const SocialIcon = {
  Instagram: h("svg", svgBase,
      h("rect", {
          x: "3.5",
          y: "3.5",
          width: "17",
          height: "17",
          rx: "5"
      }),
      h("circle", { cx: "12", cy: "12", r: "4" }),
      h("circle", {
          cx: "17.2",
          cy: "6.8",
          r: ".6",
          fill: "currentColor"
      })
  ),
  Facebook: h("svg", svgBase,
      h("path", { d: "M14 8.5h2.5V5H14a4 4 0 0 0-4 4v2.5H7.5V15H10v5h3.5v-5H16l.5-3.5h-3V9.3c0-.5.3-.8.5-.8z" })
  ),
  Telegram: h("svg", svgBase,
      h("path", { d: "M21.5 3.5 2.8 10.7l5.6 2.1 2.1 5.6 3-3.8 4.6 3.4z" }),
      h("path", { d: "M8.4 12.8l8.6-5.6" })
  ),
  Pinterest: h("svg", svgBase,
      h("circle", { cx: "12", cy: "12", r: "9" }),
      h("path", { d: "M10.6 20.5 12 13.5M9.2 13.8c-.9-2.8.5-5.8 3.2-5.8 2 0 3.100 1.400 3.100 3 0 1.900-1 3.600-2.700 3.600-.900 0-1.500-.600-1.600-1.200" })
  ),
};