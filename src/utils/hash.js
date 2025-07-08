import { sha256 } from 'js-sha256';
export const hash = (str) => sha256(str.trim().toLowerCase());
