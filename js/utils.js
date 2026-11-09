const { useState, useEffect, useMemo, useRef } = React;
const h = React.createElement;
const money = (n) => new Intl.NumberFormat("uk-UA").format(n) + " ₴";

function load(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {}
}

function useStored(key, initial) {
    const [value, setValue] = useState(() => load(key, initial));
    useEffect(() => save(key, value), [key, value]);
    return [value, setValue];
}

const STOPS = [
    [2200, [255, 176, 102]],
    [3000, [255, 205, 148]],
    [4000, [255, 234, 208]],
    [5000, [226, 238, 255]],
    [6500, [150, 198, 255]],
];

function kelvinRgb(k) {
    if (k <= STOPS[0][0]) return STOPS[0][1];
    for (let i = 1; i < STOPS.length; i++) {
        const [k1, c1] = STOPS[i];
        const [k0, c0] = STOPS[i - 1];
        if (k <= k1) {
            const t = (k - k0) / (k1 - k0);
            return c0.map((v, j) => Math.round(v + (c1[j] - v) * t));
        }
    }
    return STOPS[STOPS.length - 1][1];
}

const rgbStr = (rgb) => rgb.join(",");

function kelvinName(k) {
    if (k < 3200) return "Тепле світло";
    if (k < 4500) return "Нейтральне світло";
    return "Холодне світло";
}

const rangeText = (r) => (r[0] === r[1] ? r[0] + " K" : r[0] + "–" + r[1] + " K");

const TYPE_NAMES = {
    table: "Настільна",
    floor: "Підлогова",
    pendant: "Підвісна",
    night: "Нічник",
};

function goTo(e, selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}