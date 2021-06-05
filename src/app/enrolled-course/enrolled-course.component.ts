import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCoursesService } from '../SERVICES/user-courses.service';

import {
  EnrolledCourseDataSource,
  EnrolledCourseItem,
} from './enrolled-course-datasource';

@Component({
  selector: 'app-enrolled-course',
  templateUrl: './enrolled-course.component.html',
  styleUrls: ['./enrolled-course.component.css'],
})
export class EnrolledCourseComponent implements AfterViewInit ,OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EnrolledCourseItem>;
  dataSource: EnrolledCourseDataSource;
  private idColumn1 = 'courseId';
  private idColumn2 = 'mail';
  private dsData: any;
  data: EnrolledCourseItem[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'name',
    'author',
    'language',
    'duration',
    'price',
    'data',
  ];

  constructor(
    public ser: UserCoursesService,
    public router: Router,
    public itemService: UserCoursesService
  ) {
    this.dataSource = new EnrolledCourseDataSource(ser);
  }
  ngOnInit(): void {
//window.location.reload();
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // async deleteData(data: EnrolledCourseItem) {
  //   console.log('delete' + data.courseName);
  //   await this.ser.deleteItem(data);
  //   window.location.reload();
  // }

  public async deleteRecord(recordIds: EnrolledCourseItem) {
    const dsData = this.dataSource.data;
  ////  console.log('dsData' + dsData);
    // For delete confirm dialog in deleteItem to match the db column name to fetch.
    const name1 = 'courseId';
    const name2 = 'courseName';
    //  var record = dsData.find(obj => obj[this.idColumn1] === recordId.courseId);
    const record = dsData.filter(
      (obj) =>
        obj[this.idColumn1] === recordIds.courseId &&
        obj[this.idColumn2] === recordIds.mail
    );
    record.forEach((element) => {
   ////   console.log('id 1 ' + element.courseId),
    ////    console.log('name ' + element.mail);
    });
    const name = 'Delete ' + record[name1] + ' ' + record[name2] + '?';
   //// console.log('name===' + name);
    await this.ser.deleteItem(recordIds);
    this.deleteRowDataTable(
      recordIds.courseId,
      this.idColumn1,
      recordIds.mail,
      this.idColumn2,
      this.paginator,
      this.dataSource
    );
  }

  private async deleteRowDataTable(
    recordId1,
    idColumn1,
    recordId2,
    idColumn2,
    paginator,
    dataSource
  ) {
   //// console.log('checking daw' + recordId1 + idColumn1 + recordId2 + idColumn2);
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(
      (obj) =>
        obj[this.idColumn1] === recordId1 && obj[this.idColumn2] === recordId2
    );
 ////   console.log('item index' + itemIndex);

    dataSource.paginator = paginator;
    dataSource.data.splice(itemIndex, 1);
    this.table.dataSource = this.dataSource.data;
    // await this.router.navigate(['enrolledCourse'])
    // .then(() => {
    //   window.location.reload();
    // });
    // this.router.navigate(['/enrolledCourse']);

    await this.connect();
    //this.router.navigate(['enrolledCourse']);
    //  this.router.navigate(['course']).then(() => {
    //    window.location.reload();
    //  });
  }

  async connect(): Promise<Observable<EnrolledCourseItem[]>> {
    await this.itemService.getItems(localStorage.getItem('user')).subscribe((items) => {
   ////   console.log(items);
      this.data = items;
    });
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
    //  this.router.navigate(['/enrolledCourse']).then(() => {
    //   window.location.reload();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EnrolledCourseItem[]): EnrolledCourseItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EnrolledCourseItem[]): EnrolledCourseItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.courseName, b.courseName, isAsc);
        case 'author':
          return compare(a.author, b.author, isAsc);
        case 'language':
          return compare(a.language, b.language, isAsc);
        case 'duration':
          return compare(a.duration, b.duration, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
