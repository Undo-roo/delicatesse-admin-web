export type ProgressBarVariant = 'default' | 'emergency' | 'danger' | 'success';

export interface ProgressBar {
    label?: string;
    current?: number;
    total?: number;
    variant?: ProgressBarVariant;
    showLabel?: boolean;
    showIcon?: boolean;
    showRatio?: boolean;
    showPercentage?: boolean;
    showBar?: boolean;
}
