import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Output() loadMore = new EventEmitter<void>();

  onLoadMore(): void {
    this.loadMore.emit();
  }
}
