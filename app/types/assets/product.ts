export enum ProductStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
}

export enum InventoryStatus {
    OUT_OF_STOCK = "out_of_stock",
    LOW_STOCK = "low_stock",
    IN_STOCK = "in_stock",
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
    description?: string;
    nutritional_facts_url?: string;
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

// Trucks create/update via multipart form data (avatar uploaded inline).
export interface ProductPayload {
    plate_number: string;
    owned_at: string;
    status?: string;
    avatar?: File;
}
