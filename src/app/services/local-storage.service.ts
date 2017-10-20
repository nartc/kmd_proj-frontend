import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public saveValueWithKey(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  public saveObjectValueWithKey(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public fetchValueFromKey(key: string): any {
      return localStorage.getItem(key);
  }

  public fetchObjectValueFromKey(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public deleteValueWithKey(key: string): void {
      localStorage.removeItem(key);
  }

  public clearAll(): void {
      localStorage.clear();
  }
}