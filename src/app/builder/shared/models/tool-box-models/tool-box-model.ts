export default interface ToolBoxModel {
    name: string;
    toolBoxItems: ToolBoxItem[];
}

export interface ToolBoxItem {
    id?: number;
    text?: string;
    icon?: string;
    type?: string;
    choices?: any[];
    items?: any[];
    columns?: any[];
    rows?: any[];
}
// export interface customWidgets{
//     id: number;
//     text: string;
//     icon: string;
//     type: string;
// }
