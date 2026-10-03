export interface DropdownItem {
    label: string;
    to?: string;
}

export interface Dropdown {
    items?: DropdownItem[];
    trigger?: 'hover' | 'click';
    align?: 'left' | 'right';
    triggerClass?: string;
    menuClass?: string;
    panelClass?: string;
    itemClass?: string;
}
