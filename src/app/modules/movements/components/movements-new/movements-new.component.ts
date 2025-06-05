import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MovementsService} from '../../movements.service';
import {Location, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Movement} from '../../interfaces/movement';
import {Timestamp} from '@angular/fire/firestore';

@Component({
  selector: 'app-movements-new',
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './movements-new.component.html',
  styleUrl: './movements-new.component.scss'
})
export class MovementsNewComponent {
  @ViewChild('cameraInput') cameraInput!: ElementRef<HTMLInputElement>;
  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;

  /** injects **/
  public router = inject(Router);
  public location = inject(Location);
  private fb = inject(FormBuilder);
  private service = inject(MovementsService);

  form: FormGroup;
  public loading = false;
  public error: string | null = null;
  private selectedFile: File | null = null;
  public imagePreviewUrl: string | null = null;
  public selectedDate: string | null = null;

  constructor() {
    this.form = this.fb.group({
      type: ['INGRESO', Validators.required],
      paymentMethod: ['EFECTIVO', Validators.required],
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      comments: ['']
    });
  }
  public selectedImageFile: File | null = null;


  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      // Limpiar ambos inputs por si quieres tomar otra foto luego
      this.cameraInput.nativeElement.value = '';
      this.uploadInput.nativeElement.value = '';
    }
  }
  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.selectedFile = file;
  //
  //     // Preview de la imagen
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreviewUrl = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  removeSelectedImage() {
    this.selectedFile = null;
    this.imagePreviewUrl = null;
    // También puedes limpiar el input file si lo necesitas
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) input.value = '';
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.error = null;
      this.loading = true;
      let movement: Movement = this.form.value;
      let dateMovement: Date;

      if (this.selectedDate) {
        dateMovement = new Date(this.selectedDate + 'T12:00:00');
      } else {
        dateMovement = new Date();
      }

      try {
        movement.createdAt = Timestamp.fromDate(dateMovement);
        movement.updatedAt = Timestamp.fromDate(dateMovement);
        await this.service.createMovement(movement, this.selectedFile!);
        await this.router.navigate(['/movements']);
      } catch (e: any) {
        this.error = e.message || 'Error al guardar';
      }
      this.loading = false;
    }
  }
}
