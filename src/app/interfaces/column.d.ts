import { TemplateRef } from "@angular/core";

interface DataTableColumn {
    name: string,
    cellTemplate?: TemplateRef<any>,
    label: string,
}
