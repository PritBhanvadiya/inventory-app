export type Status = "Healthy" | "Warning" | "Critical";

export function getCountStatus(
    count: number,
    warningLimit: number,
    criticalLimit: number
): Status {
    if (count >= criticalLimit) return "Critical";
    if (count >= warningLimit) return "Warning";
    return "Healthy";
}
