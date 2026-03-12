export function sanitizeHtml(input: string): string {
    if (!input) return "";

    return input
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
        .replace(/<(iframe|object|embed|link|meta|base|form|input|button|textarea|select)[\s\S]*?>[\s\S]*?<\/\1>/gi, "")
        .replace(/<(iframe|object|embed|link|meta|base|form|input|button|textarea|select)[^>]*\/?>(?!<\/\1>)/gi, "")
        .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
        .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*("|')/gi, "$1=\"#\"")
        .trim();
}

export function stripHtml(input: string): string {
    if (!input) return "";
    return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
