import { describe, it, expect } from "vitest";
import { sanitizeHtml, stripHtml } from "./sanitize-html";

describe("sanitizeHtml", () => {
    it("remove script tags and inline handlers", () => {
        const dirty = `<div onclick="alert(1)"><script>alert(2)</script><p>Olá</p></div>`;
        const clean = sanitizeHtml(dirty);

        expect(clean).not.toContain("<script");
        expect(clean).not.toContain("onclick=");
        expect(clean).toContain("<p>Olá</p>");
    });

    it("neutralizes javascript: urls", () => {
        const dirty = `<a href="javascript:alert(1)">Clique</a>`;
        const clean = sanitizeHtml(dirty);

        expect(clean).toContain('href="#"');
        expect(clean).not.toContain("javascript:");
    });
});

describe("stripHtml", () => {
    it("returns plain text without html tags", () => {
        const raw = "<h1>Título</h1><p>Texto <strong>forte</strong></p>";
        const stripped = stripHtml(raw);

        expect(stripped).toBe("Título Texto forte");
    });
});
