import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-creat',
  templateUrl: './post-creat.component.html',
  styleUrl: './post-creat.component.css',
})
export class PostCreatComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.apiClientService.createPost(newTask).subscribe({
        next: (response) => {
          console.log('Task added:', response);
          this.closeModal.emit();
        },
        error: (error) => {
          console.error('Error adding task:', error);
        },
      });
    }
  }
  onCancel() {
    this.taskForm.reset();
  }
  onClose() {
    this.closeModal.emit();
  }
}
