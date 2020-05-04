export interface Ialert {
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

export interface IalertSummary {
    total: number;
    severities: IalertSummarySeverities;
}

export interface IalertSummarySeverities {
    off: number,
    standby: number,
    normal: number,
    caution: number;
    serious: number;
    critical: number;
}




