import type { LAYOUT_SLOT } from '../constants/LayoutSlotsConstants';

export type LayoutSlotType = (typeof LAYOUT_SLOT)[keyof typeof LAYOUT_SLOT];
