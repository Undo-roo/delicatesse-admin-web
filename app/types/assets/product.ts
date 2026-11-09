export enum ProductStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
}

export enum InventoryStatus {
    OUT_OF_STOCK = "out_of_stock",
    LOW_STOCK = "low_stock",
    IN_STOCK = "in_stock",
}

export interface ProductNutritionalFacts {
    src: string;
    filename: string;
    media_type: string;
    size: number,
    width: number,
    height: number
    size_display: string,
}

// A truck (asset domain). `status` is one of: draft, available, in_transit, defective.
export interface Product {
    id: string;
    name: string;
    status: ProductStatus;
    price: number;
    sku: string;
    vat_included: boolean;
    uom?: string;
    categories: string;
    category_ids: number[];
    description?: string;
    nutritional_facts_url?: ProductNutritionalFacts;
    images: string[];
}

export interface ProductList {
    id: number;
    name: string;
    avatar?: string;
    inventory_status: string;
    inventory_count: number;
    inventory_threshold: number;
    categories: string;
    revenue: number;
}

// Product create/update payload (JSON). Images and nutritional facts are
// uploaded via separate endpoints, not embedded here.
export interface ProductPayload {
    name: string;
    slug: string;
    description?: string | null;
    sku: string;
    price: number | string;
    uom?: string | null;
    vat_included: boolean;
    category_ids: number[];
}
