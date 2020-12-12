interface Alert {
    errorId: string,
    errorSeverity: "critical" | "caution" | "serious",
    errorCategory: string,
    errorMessage: string,
    longMessage: string,
    errorTime: number,
    selected: boolean,
    new: boolean,
    expanded: boolean,
    details: string,
}
