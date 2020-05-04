export interface Alert {
    errorId: string;
    errorSeverity: string;
    errorCategory: string;
    errorMessage: string;
    longMessage: string;
    errorTime: number;
    selected: boolean;
    new: boolean;
    expanded: boolean;
}

export interface AlertSummary {
    total: number;
    severities: AlertSummarySeverities;
}

export interface AlertSummarySeverities {
    off: number,
    standby: number,
    normal: number,
    caution: number;
    serious: number;
    critical: number;
}




