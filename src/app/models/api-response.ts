import { info } from "console";
import { Characters } from "./characters";

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Characters[];
}