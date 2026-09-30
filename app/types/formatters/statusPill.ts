export type StatusPillVariant = 'default' | 'red' | 'black' | 'blue' | 'gray' | 'green' | 'light-blue' | 'orange' | 'pink' | 'teal' | 'yellow';

export interface StatusPill {
    text?: string;
    variant?: StatusPillVariant;
    showIcon?: boolean;
}
