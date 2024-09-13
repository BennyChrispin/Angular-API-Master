import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  displayedPosts: any[] = [];
  error: string | null = null;
  pageSize: number = 8;
  totalPosts: number = 0;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit(): void {
    this.apiClientService.getPosts().subscribe(
      (data) => {
        this.posts = data;
        this.totalPosts = this.posts.length;
        this.displayedPosts = this.posts.slice(0, this.pageSize);
      },
      (error) => (this.error = error)
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPosts = this.posts.slice(startIndex, endIndex);
  }
}
