import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable, of as observableOf, merge } from 'rxjs';
import { UserCoursesService } from '../SERVICES/user-courses.service';
import { Component, Directive, Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface EnrolledCourseItem {
  author: string;
  courseId: string;
  courseName: string;
  duration: string;
  language: string;
  price: string;
  mail: string;
}

// TODO: replace this with real data from your application
//const EXAMPLE_DATA: EnrolledCourseItem[] = [];

/**
 * Data source for the EnrolledCourse view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class EnrolledCourseDataSource extends DataSource<EnrolledCourseItem> {
  constructor(public itemService: UserCoursesService) {
    super();
    this.itemService.getItems(localStorage.getItem('user')).subscribe((items) => {
    ////  console.log(items);
      this.data = items;
    });
  }
  // ngOnInit(): void {

  // }

  data: EnrolledCourseItem[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EnrolledCourseItem[]> {
    if (this.paginator && this.sort) {
      this.data.length;
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
