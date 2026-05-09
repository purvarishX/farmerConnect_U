import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-master',
  imports: [CommonModule],
  templateUrl: './master.html',
  styleUrl: './master.css',
})
export class Master {

  activeTab:string = 'products'

  handleRoleSubmit(event: Event) {}

  handleProductSubmit(event: Event) {}

  editCategory(id: number) {}

  deleteCategory(id: number) {}

  editRole(id: number) {}

  deleteRole(id: number) {}

  deleteProduct(id: number) {}

  editProduct(id: number) {}
  
  openCreateModal() {}

  closeModal(modal: string) {}

  handleCategorySubmit(event: Event) {}

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
