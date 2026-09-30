export type PriceVariant = 'default' | 'decrease' | 'increase';

export interface Price {
    value?: string | number;
    currency?: string;
    variant?: PriceVariant;
}
