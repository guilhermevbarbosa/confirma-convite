import { Injectable } from '@angular/core';
import { WorkBook, WorkSheet, WritingOptions, read, writeFileXLSX as writeFile, utils, version, set_cptable } from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  exportToExcel(data: any, fileName: string): void {
    const worksheet: WorkSheet = utils.json_to_sheet(data);
    const workbook: WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    writeFile(workbook, ExcelService.toExportFileName(fileName));
  }
}
