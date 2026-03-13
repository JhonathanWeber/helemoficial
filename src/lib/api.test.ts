import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiRequest } from "./api";

describe("apiRequest", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("sends JSON body with content-type when body is provided", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ ok: true }),
        });
        vi.stubGlobal("fetch", fetchMock);

        await apiRequest("/posts", {
            method: "POST",
            body: { title: "teste" },
        });

        const [, config] = fetchMock.mock.calls[0];
        expect(config.method).toBe("POST");
        expect(config.credentials).toBe("include");
        expect(config.body).toBe(JSON.stringify({ title: "teste" }));

        const headerMap = new Headers(config.headers as HeadersInit);
        expect(headerMap.get("Content-Type")).toBe("application/json");
    });

    it("returns empty object for 204 responses", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                status: 204,
                json: async () => ({}),
            })
        );

        const result = await apiRequest("/posts/1", { method: "DELETE" });
        expect(result).toEqual({});
    });

    it("throws API message when request fails", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                status: 400,
                json: async () => ({ message: "invalid request" }),
            })
        );

        await expect(apiRequest("/posts")).rejects.toThrow("invalid request");
    });
});
