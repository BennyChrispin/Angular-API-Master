import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-post-creat',
  templateUrl: './post-creat.component.html',
  styleUrls: ['./post-creat.component.css'],
})
export class PostCreatComponent implements OnInit {
  @Input() taskToEdit: any;
  @Output() closeModal = new EventEmitter<void>();
  taskForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    if (this.taskToEdit) {
      this.isEditMode = true;
      this.taskForm.patchValue({
        title: this.taskToEdit.title,
        description: this.taskToEdit.body,
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;

      if (this.isEditMode) {
        // Update existing task
        this.apiClientService
          .updatePost(this.taskToEdit.id, taskData)
          .subscribe({
            next: (response) => {
              console.log('Task updated:', response);
              this.closeModal.emit();
            },
            error: (error) => {
              console.error('Error updating task:', error);
            },
          });
      } else {
        // Create new task
        this.apiClientService.createPost(taskData).subscribe({
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
  }

  onCancel() {
    this.taskForm.reset();
  }

  onClose() {
    this.closeModal.emit();
  }
}
