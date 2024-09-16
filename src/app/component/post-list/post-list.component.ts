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
  isModalOpen = false;
  isConfirmDeleteModalOpen = false;
  isEditMode = false;
  posts: any[] = [];
  displayedPosts: any[] = [];
  error: string | null = null;
  pageSize: number = 8;
  totalPosts: number = 0;
  pageIndex: number = 0;
  postToDelete: any;
  taskToEdit: any;

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

  openModal(post?: any) {
    if (post) {
      // Set taskToEdit if editing
      this.taskToEdit = post;
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
      this.taskToEdit = null;
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.taskToEdit = null;
  }

  openConfirmDeleteModal(post: any) {
    this.postToDelete = post;
    this.isConfirmDeleteModalOpen = true;
  }

  closeConfirmDeleteModal() {
    this.isConfirmDeleteModalOpen = false;
    this.postToDelete = null;
  }

  deletePost() {
    if (this.postToDelete) {
      this.apiClientService.deletePost(this.postToDelete.id).subscribe(
        () => {
          this.posts = this.posts.filter(
            (post) => post.id !== this.postToDelete.id
          );
          this.totalPosts = this.posts.length;
          this.displayedPosts = this.posts.slice(
            this.pageIndex * this.pageSize,
            (this.pageIndex + 1) * this.pageSize
          );
          this.closeConfirmDeleteModal();
        },
        (error) => {
          this.error = error;
          this.closeConfirmDeleteModal();
        }
      );
    }
  }
}
