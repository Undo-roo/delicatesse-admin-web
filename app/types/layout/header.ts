export interface HeaderNavItem {
    label: string;
    to?: string;
    active?: boolean;
    children?: HeaderNavItem[];
}

export interface HeaderProfileItem {
    label: string;
    to?: string;
}

export interface Header {
    brand?: string;
    subtitle?: string;
    logo?: string;
    navItems?: HeaderNavItem[];
    avatar?: string;
    name?: string;
    profileItems?: HeaderProfileItem[];
}
