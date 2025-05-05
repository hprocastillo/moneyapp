import {Component} from '@angular/core';
import {Timestamp} from 'firebase/firestore';
import {Storage, ref, uploadBytes, getDownloadURL} from '@angular/fire/storage';
import {v4 as uuidv4} from 'uuid';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpensesService} from '../../../services/expenses.service';
import {ButtonsService} from '../../../services/buttons.service';

@Component({
  selector: 'app-expenses-new',
  standalone: false,
  templateUrl: './expenses-new.component.html',
  styleUrl: './expenses-new.component.scss'
})
export class ExpensesNewComponent {
  public expenseForm: FormGroup;
  public loading = false;
  private selectedImageFile: File | null = null;
  public imagePreviewUrl: string | null = null;

  constructor(private fb: FormBuilder, private buttonService: ButtonsService, private expenseService: ExpensesService, private storage: Storage) {
    this.expenseForm = this.fb.group({
      description: [''],
      amount: [0, Validators.required],
      receiptUrl: [''],
      paymentMethod: ['EFECTIVO', Validators.required],
    });
  }

  cancel(): void {
    this.buttonService.emitButtonPress("LIST");
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
      this.imagePreviewUrl = URL.createObjectURL(this.selectedImageFile);
    }
  }

  async submit() {
    if (this.expenseForm.invalid) return;

    this.loading = true;

    try {
      let receiptUrl = '';

      // 1. Subir imagen si hay
      if (this.selectedImageFile) {
        const path = `receipts/${uuidv4()}`;
        const fileRef = ref(this.storage, path);
        await uploadBytes(fileRef, this.selectedImageFile);
        receiptUrl = await getDownloadURL(fileRef);
      }

      // 2. Crear gasto
      const userId = 'USER_ID'; // reemplazar con auth real
      const data = {
        ...this.expenseForm.value,
        receiptUrl,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        createdBy: userId,
        updatedBy: userId,
      };

      await this.expenseService.create(data);
      this.expenseForm.reset();
      this.imagePreviewUrl = null;
      this.selectedImageFile = null;
    } catch (err) {
      console.error('Error al guardar el gasto:', err);
      // puedes agregar un toast o alerta aquí
    } finally {
      this.loading = false;
    }
  }
}
