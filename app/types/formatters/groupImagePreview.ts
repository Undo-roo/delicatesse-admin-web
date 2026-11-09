export interface GroupImagePreview {
    /** Ordered image URLs: front, back, side, then any additional ("Any Image"). */
    images: string[];
    /** Fixed thumbnail width in px. When omitted, tiles fill the container responsively. */
    size?: number;
    /** Product name (used for alt text). */
    name?: string;
}
