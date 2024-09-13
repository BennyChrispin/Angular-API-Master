import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  displayedPosts: any[] = [];
  error: string | null = null;
  itemsToShow: number = 5;

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit(): void {
    this.apiClientService.getPosts().subscribe(
      (data) => {
        this.posts = data;
        this.displayedPosts = this.posts.slice(0, this.itemsToShow);
      },
      (error) => (this.error = error)
    );
  }

  loadMore(): void {
    this.itemsToShow += 10;
    this.displayedPosts = this.posts.slice(0, this.itemsToShow);
  }
}
