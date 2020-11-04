import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Horario } from 'src/app/clases/horario';

@Component({
  selector: 'app-horarios-profesional',
  templateUrl: './horarios-profesional.component.html',
  styleUrls: ['./horarios-profesional.component.scss']
})
export class HorariosProfesionalComponent implements OnInit {
  @Input() listado: any [];
  dataSource: MatTableDataSource<Horario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['fecha', 'maniana', 'tarde', 'noche'];

  constructor(public dialog: MatDialog) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh() {
    this.dataSource = new MatTableDataSource(this.listado);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
