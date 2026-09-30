export interface HeaderNavItem {
    label: string;
    to?: string;
    active?: boolean;
}

export interface Header {
    brand?: string;
    subtitle?: string;
    logo?: string;
    navItems?: HeaderNavItem[];
    avatar?: string;
    name?: string;
}
