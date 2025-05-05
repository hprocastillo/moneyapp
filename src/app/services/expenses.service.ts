import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Expense} from '../interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private readonly collectionRef;

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'expenses');
  }

  getAll(): Observable<Expense[]> {
    return collectionData(this.collectionRef, { idField: 'id' }) as Observable<Expense[]>;
  }

  getById(id: string): Observable<Expense> {
    const docRef = doc(this.collectionRef, id);
    return docData(docRef, { idField: 'id' }) as Observable<Expense>;
  }

  async create(expense: Omit<Expense, 'id'>): Promise<void> {
    await addDoc(this.collectionRef, expense);
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
