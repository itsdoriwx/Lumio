function CountUp({ value }) {
    
  const ref = useRef(null);
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [text, setText] = useState(reduce ? value : value.replace(/\d/g, "0"));

    useEffect(() => {
        if (reduce || !ref.current) return;
        let timer = null;
        let done = false;

        const run = () => {
            const start = Date.now();
            let digitIndex;
            timer = setInterval(() => { //кожні 60 мс оновлюємо текст, поки не закінчиться анімація
                const elapsed = Date.now() - start;
                digitIndex = 0;
                let allSettled = true;
                const next = value.split("").map((ch) => {
                    if (!/\d/.test(ch)) return ch;
                    const settleAt = 900 + digitIndex * 250;
                    digitIndex++;
                    if (elapsed >= settleAt) return ch;
                    allSettled = false;
                    return String(Math.floor(Math.random() * 10));
                }).join("");
                setText(next);
                if (allSettled) {
                    clearInterval(timer);
                    setText(value);
                }
            }, 60);
        };

        const io = new IntersectionObserver((entries) => {
            if (!done && entries.some((e) => e.isIntersecting)) {
                done = true;
                io.disconnect();
                run();
            }
        }, { threshold: 0.6 });
        io.observe(ref.current);

        return () => {
            io.disconnect();
            if (timer) clearInterval(timer);
        };
    }, [value]);

    return h("b", {
        ref,
        role: "img",
        "aria-label": value
    }, text);
}