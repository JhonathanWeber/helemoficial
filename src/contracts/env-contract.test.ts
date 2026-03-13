import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const FRONTEND_ALLOWED_ENV_VARS = ["NEXT_PUBLIC_API_URL"] as const;

function collectFilesRecursively(dirPath: string, extensions: string[]) {
    const result: string[] = [];

    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            result.push(...collectFilesRecursively(fullPath, extensions));
            continue;
        }

        if (extensions.some((extension) => fullPath.endsWith(extension))) {
            result.push(fullPath);
        }
    }

    return result;
}

function extractEnvVarsFromContent(content: string) {
    const vars = new Set<string>();
    const regex = /process\.env\.([A-Z0-9_]+)/g;

    for (const match of content.matchAll(regex)) {
        vars.add(match[1]);
    }

    return vars;
}

describe("frontend env contract", () => {
    it("does not introduce undocumented environment variables in code", () => {
        const projectRoot = process.cwd();
        const srcRoot = path.join(projectRoot, "src");
        const files = collectFilesRecursively(srcRoot, [".ts", ".tsx"]);
        files.push(path.join(projectRoot, "next.config.ts"));

        const discovered = new Set<string>();
        for (const filePath of files) {
            const content = fs.readFileSync(filePath, "utf8");
            for (const envVar of extractEnvVarsFromContent(content)) {
                discovered.add(envVar);
            }
        }

        expect([...discovered].sort()).toEqual([...FRONTEND_ALLOWED_ENV_VARS].sort());
    });

    it("keeps technical documentation aligned with allowed env variables", () => {
        const projectRoot = process.cwd();
        const docPath = path.join(projectRoot, "DOCUMENTACAO_TECNICA.md");
        const doc = fs.readFileSync(docPath, "utf8");

        for (const envVar of FRONTEND_ALLOWED_ENV_VARS) {
            expect(doc).toContain(envVar);
        }
    });
});
