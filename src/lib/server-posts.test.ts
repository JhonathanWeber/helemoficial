import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPublishedPostsPaginatedServer, getPublishedPostsServer } from "./server-posts";

describe("server-posts", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("returns published posts when backend responds successfully", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => [{ id: "1", title: "Post", content: "ok", slug: "post", published: true, createdAt: "2026-01-01", updatedAt: "2026-01-01" }],
            })
        );

        const data = await getPublishedPostsServer();
        expect(data).toHaveLength(1);
        expect(data[0].title).toBe("Post");
    });

    it("returns empty list when backend fails", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

        const data = await getPublishedPostsServer();
        expect(data).toEqual([]);
    });

    it("returns paginated payload when backend responds successfully", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    data: [{ id: "1", title: "Paginado", content: "ok", slug: "paginado", published: true, createdAt: "2026-01-01", updatedAt: "2026-01-01" }],
                    pagination: { page: 2, limit: 9, total: 19, totalPages: 3, hasNext: true, hasPrev: true },
                }),
            })
        );

        const result = await getPublishedPostsPaginatedServer(2, 9);
        expect(result.pagination.page).toBe(2);
        expect(result.data[0].title).toBe("Paginado");
    });

    it("returns safe fallback on request errors", async () => {
        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

        const result = await getPublishedPostsPaginatedServer(3, 9);
        expect(result.data).toEqual([]);
        expect(result.pagination.page).toBe(3);
        expect(result.pagination.hasNext).toBe(false);
    });
});
