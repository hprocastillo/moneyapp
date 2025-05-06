import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {Timestamp} from 'firebase/firestore';
import {Storage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from '@angular/fire/storage';
import {v4 as uuidv4} from 'uuid';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpensesService} from '../../../services/expenses.service';
import {ButtonsService} from '../../../services/buttons.service';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-expenses-new',
  standalone: false,
  templateUrl: './expenses-new.component.html',
  styleUrl: './expenses-new.component.scss'
})
export class ExpensesNewComponent {
  private buttonService = inject(ButtonsService);
  private expenseService = inject(ExpensesService);

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  public expenseForm: FormGroup;
  public loading: boolean = false;
  public uploadProgress: number = 0;
  private selectedImageFile: File | null = null;
  public imagePreviewUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      paymentMethod: ['EFECTIVO', Validators.required],
      comment: ['', Validators.required]
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;
    this.imageInput.nativeElement.value = ''; // limpiar input
  }


  async onSubmit() {
    if (this.expenseForm.invalid || this.loading) return;
    this.loading = true;
    try {
      await this.expenseService.addExpense(this.expenseForm.value, this.selectedImageFile || undefined);

      this.expenseForm.reset();
      this.selectedImageFile = null;
      this.imagePreviewUrl = null;
      alert('✅ Gasto guardado con éxito');
    } catch (error) {
      console.error(error);
      alert('❌ Error al guardar el gasto');
    } finally {
      this.loading = false;
    }
  }

  cancel(): void {
    this.buttonService.emitButtonPress("LIST");
  }
}
