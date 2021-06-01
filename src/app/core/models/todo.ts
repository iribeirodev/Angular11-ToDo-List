import { SubItem } from "./subitem";

export class ToDo {
    id:         number;
    title:      string;
    content:    string;
    createdAt:  Date;
    data?:      SubItem
}
