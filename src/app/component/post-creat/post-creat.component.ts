import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-creat',
  templateUrl: './post-creat.component.html',
  styleUrl: './post-creat.component.css',
})
export class PostCreatComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      console.log('New Task:', newTask);
    }
  }
  onCancel() {
    this.taskForm.reset();
  }
  onClose() {
    this.closeModal.emit();
  }
}
