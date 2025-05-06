import {inject, Injectable} from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  docData, where, orderBy, query
} from '@angular/fire/firestore';
import {Auth} from '@angular/fire/auth';
import {Storage, ref, uploadBytesResumable, getDownloadURL} from '@angular/fire/storage';
import {Observable, switchMap} from 'rxjs';
import {Expense} from '../interfaces/expense';
import {v4 as uuidv4} from 'uuid';
import {Timestamp} from 'firebase/firestore';
import {AuthService} from './auth.service';
import {startOfMonth, endOfMonth} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  /** injects **/
  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);
  private authService = inject(AuthService);


  private readonly DEFAULT_RECEIPT_URL = 'https://firebasestorage.googleapis.com/v0/b/erp-freeforall.firebasestorage.app/o/receipts%2Fdefault-receipt.png?alt=media&token=6f8993a3-a1b7-4570-9e60-a34ea34f86d8';
  private readonly collectionRef = collection(this.firestore, 'expenses');



  /** upload image to firebase storage **/
  private uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `receipts/${uuidv4()}`;
      const fileRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        null,
        reject,
        async () => {
          const url = await getDownloadURL(fileRef);
          resolve(url);
        }
      );
    });
  }

  /** get expenses of the current month **/
  getExpensesOfCurrentMonth(): Observable<Expense[]> {
    const now = new Date();
    const start = Timestamp.fromDate(startOfMonth(now));
    const end = Timestamp.fromDate(endOfMonth(now));

    const expensesRef = collection(this.firestore, 'expenses');
    const q = query(expensesRef, where('createdAt', '>=', start), where('createdAt', '<=', end));

    return collectionData(q, { idField: 'id' }) as Observable<Expense[]>;
  }

  getAll(): Observable<Expense[]> {
    return collectionData(this.collectionRef, {idField: 'id'}) as Observable<Expense[]>;
  }

  getById(id: string): Observable<Expense> {
    const docRef = doc(this.collectionRef, id);
    return docData(docRef, {idField: 'id'}) as Observable<Expense>;
  }

  async addExpense(data: any, imageFile?: File): Promise<void> {
    let receiptUrl: string | null = null;
    const currentUser = this.authService.currentUser;
    if (!currentUser) return;

    // Si hay imagen, subirla
    if (imageFile) {
      receiptUrl = await this.uploadImage(imageFile);
    } else {
      // Si no hay imagen, usar URL por defecto
      receiptUrl = this.DEFAULT_RECEIPT_URL;
    }

    // Crear el objeto expense
    const now: Timestamp = Timestamp.now();
    const expense: any = {
      ...data,
      receiptUrl,
      createdAt: now,
      updatedAt: now,
      createdBy: currentUser.uid,
      updatedBy: currentUser.uid,
    };

    // Guardar en Firestore
    const expensesRef = collection(this.firestore, 'expenses');
    await addDoc(expensesRef, expense);
  }

  async update(id: string, data: Partial<Expense>): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, data);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }
}
