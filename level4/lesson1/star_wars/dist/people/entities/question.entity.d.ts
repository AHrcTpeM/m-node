import { Category } from "./category.entity";
export declare class Question {
    id: number;
    title: string;
    text: string;
    categories: Category[];
}
