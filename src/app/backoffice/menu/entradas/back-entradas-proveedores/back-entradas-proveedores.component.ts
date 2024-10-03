import { Component } from '@angular/core';
import { CATEGORIASTABLE } from '../../productos/data/categorias';
import { PROVEEDORES } from 'src/app/data/proveedores';

@Component({
  selector: 'app-back-entradas-proveedores',
  templateUrl: './back-entradas-proveedores.component.html',
  styleUrls: ['./back-entradas-proveedores.component.css']
})
export class BackEntradasProveedoresComponent {
  bottomBarSize = "48px";
  isMaximized = false;
  proveedores = PROVEEDORES;
  categorias = CATEGORIASTABLE[0];
  categoria: any = {nombre: '', folder: false };

  onCategory(id: number){
    console.log(id,CATEGORIASTABLE[id])
    this.categorias = CATEGORIASTABLE[id];
    this.categoria= {nombre: '', folder: false };
  }
  onEdit(cat: any){
    this.categoria = cat;
  }

  maximize(){
    this.bottomBarSize="200px";
    this.isMaximized = true;

  }
  minimize(){
    this.bottomBarSize="48px";
    this.isMaximized = false;

  }
}
