function Lamp({ id, type, shade, body, glow, level = 1, label }) {
  const glowId = "g-" + id;
  const beamId = "b-" + id;
  const glowStyle = { opacity: level, transition: "opacity .45s ease" };
  const shadeGlowStyle = { opacity: level * 0.6, transition: "opacity .45s ease" };
  let art;

  if (type === "table") {
      const d = "M60 120 L75 50 Q100 40 125 50 L140 120 Z";
      art = h("g", null,
          h("circle", { cx: "100", cy: "88", r: "92", fill: `url(#${glowId})`, style: glowStyle }),
          h("ellipse", { cx: "100", cy: "202", rx: "44", ry: "8", fill: body }),
          h("rect", { x: "96", y: "118", width: "8", height: "84", rx: "4", fill: body }),
          h("path", { d, fill: shade }),
          h("path", { d, fill: glow, style: shadeGlowStyle }),
          h("ellipse", { cx: "100", cy: "120", rx: "40", ry: "6", fill: "#fff", opacity: ".35" })
      );
  } else if (type === "floor") {
      const d = "M68 70 L80 20 Q100 12 120 20 L132 70 Z";
      art = h("g", null,
          h("circle", { cx: "100", cy: "58", r: "88", fill: `url(#${glowId})`, style: glowStyle }),
          h("ellipse", { cx: "100", cy: "208", rx: "38", ry: "6", fill: body }),
          h("rect", { x: "98", y: "70", width: "4", height: "138", rx: "2", fill: body }),
          h("path", { d, fill: shade }),
          h("path", { d, fill: glow, style: shadeGlowStyle }),
          h("ellipse", { cx: "100", cy: "70", rx: "32", ry: "5", fill: "#fff", opacity: ".35" })
      );
  } else if (type === "pendant") {
      const d = "M58 108 A42 42 0 0 1 142 108 Z";
      art = h("g", null,
          h("polygon", { points: "86 108 114 108 182 216 18 216", fill: `url(#${beamId})`, style: glowStyle }),
          h("line", { x1: "100", y1: "0", x2: "100", y2: "58", stroke: body, strokeWidth: "2" }),
          h("rect", { x: "91", y: "56", width: "18", height: "10", rx: "3", fill: body }),
          h("path", { d, fill: shade }),
          h("path", { d, fill: glow, style: shadeGlowStyle }),
          h("ellipse", {
              cx: "100",
              cy: "109",
              rx: "20",
              ry: "5",
              fill: "#fff",
              style: { opacity: 0.4 + level * 0.5, transition: "opacity .45s ease" }
          })
      );
  } else {
      const d = "M66 170 A34 34 0 0 1 134 170 Z";
      art = h("g", null,
          h("circle", { cx: "100", cy: "150", r: "72", fill: `url(#${glowId})`, style: glowStyle }),
          h("rect", { x: "64", y: "170", width: "72", height: "12", rx: "6", fill: body }),
          h("path", { d, fill: shade }),
          h("path", { d, fill: glow, style: shadeGlowStyle }),
          h("ellipse", { cx: "100", cy: "170", rx: "30", ry: "4", fill: "#fff", opacity: ".35" })
      );
  }

  return h("svg", {
      viewBox: "0 0 200 220",
      className: "lamp",
      role: "img",
      "aria-label": label
  },
      h("defs", null,
          h("radialGradient", { id: glowId },
              h("stop", { offset: "0", stopColor: glow, stopOpacity: ".85" }),
              h("stop", { offset: ".55", stopColor: glow, stopOpacity: ".25" }),
              h("stop", { offset: "1", stopColor: glow, stopOpacity: "0" })
          ),
          h("linearGradient", {
              id: beamId,
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1"
          },
              h("stop", { offset: "0", stopColor: glow, stopOpacity: ".7" }),
              h("stop", { offset: "1", stopColor: glow, stopOpacity: "0" })
          )
      ),
      art
  );
}