import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../../services/api-client.service';
import { Location } from '@angular/common'; // Import Location

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit {
  postId!: number;
  postDetails: any;
  comments: any[] = [];
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch the post details
    this.apiClient.getPost(this.postId).subscribe(
      (data) => (this.postDetails = data),
      (error) => (this.error = error)
    );

    // Fetch the post comments
    this.apiClient.getComments(this.postId).subscribe(
      (data) => (this.comments = data),
      (error) => (this.error = error)
    );
  }

  goBack(): void {
    this.location.back();
  }
}
