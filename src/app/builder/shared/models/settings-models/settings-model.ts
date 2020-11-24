export default interface SettingsModel {
    type: string;
    settingsItems: SettingsItem[];
}

export interface SettingsItem {
    prop: string;
    displayName: string;
    type: string;
    values?: SettingsItemValue[];
    subType?: string;
    parent?: ParentItem;
    translateTab?:boolean
}

export interface SettingsItemValue {
    value: string;
    displayName: string;
}

export interface ParentItem {
    key: string;
    displayName: string;
}
