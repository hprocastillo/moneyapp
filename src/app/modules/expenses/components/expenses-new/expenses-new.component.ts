import {Component, ElementRef, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpensesService} from '../../services/expenses.service';

@Component({
  selector: 'app-expenses-new',
  standalone: false,
  templateUrl: './expenses-new.component.html',
  styleUrl: './expenses-new.component.scss'
})
export class ExpensesNewComponent {
  /** io **/
  @Output() template = new EventEmitter<string>();

  /** injects **/
  private expenseService = inject(ExpensesService);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  /** child **/
  @ViewChild('imageInput') imageInput?: ElementRef<HTMLInputElement>;

  /** variables **/
  public loading: boolean = false;
  public uploadProgress: number = 0;
  public imagePreviewUrl: string | null = null;
  private selectedImageFile: File | null = null;

  /** form **/
  public expenseForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    paymentMethod: ['EFECTIVO', Validators.required],
    comment: ['', Validators.required]
  });


  /** select image file **/
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;

        /** Opcional: resetea el input después de cargar para permitir re-selección de la misma imagen **/
        if (this.imageInput?.nativeElement) {
          this.imageInput.nativeElement.value = '';
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;

    if (this.imageInput?.nativeElement) {
      this.imageInput.nativeElement.value = '';
    }
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

  cancelForm() {
    this.template.emit("LIST");
  }
}
