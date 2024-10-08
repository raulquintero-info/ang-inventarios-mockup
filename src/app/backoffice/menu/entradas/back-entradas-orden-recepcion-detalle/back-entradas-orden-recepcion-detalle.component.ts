import { Component, OnInit, inject } from '@angular/core';
import { ModalAgregarItemComponent } from '../modal-agregar-item/modal-agregar-item.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PROVEEDORES } from 'src/app/data/proveedores';
import { PRODUCTOSORDEN } from '../data/productosorden';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ORDENES } from '../data/ordenes';

@Component({
  selector: 'app-back-entradas-orden-recepcion-detalle',
  templateUrl: './back-entradas-orden-recepcion-detalle.component.html',
  styleUrls: ['./back-entradas-orden-recepcion-detalle.component.css']
})
export class BackEntradasOrdenRecepcionDetalleComponent implements OnInit {
  bottomBarSize = "48px";
  isMaximized = false;
  proveedores = PROVEEDORES;
  proveedorSelected: any = PROVEEDORES[0];
  //{"id": "1", "proveedor": {id:1, nombre: "Office Depot"}, "domicilio": "Av Lazaro Cardena 1190", "ciudad": "Mexicali", "estado": " Baja California", "cp":"21110"};
  modalAgergarItem: any;
  carrito = PRODUCTOSORDEN;
  // items = ITEMS;
  total= 2500
  isReceived:boolean =  true;
  isEditing: boolean = false;
  ordenes = ORDENES;
  orden: any;

  private modalService= inject(NgbModal);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    this.activatedRoute.params.subscribe(({id}) => {
      this.orden = this.ordenes[id-1];
    });
  }

  onSave() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Swal.fire({
      title: "Desea Continuar?",
      text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, continuar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Toast.fire({
          icon: "success",
          title: "Orden Grabada!"
        });
        this.grabarOrden();
      }
    });

  }



  onEditar(){
    this.isEditing = true;
  }
  grabarOrden(){
    this.isEditing = false;
  }

  maximize(){
    this.bottomBarSize="35%";
    this.isMaximized = true;

  }
  minimize(){
    this.bottomBarSize="48px";
    this.isMaximized = false;

  }

  onAddProduct(){
    if (!this.isEditing) return;

    this.modalAgergarItem = this.modalService.open(ModalAgregarItemComponent, {windowClass:  "my-modal "});
    this.modalAgergarItem.componentInstance.name = 'Agregar';
    this.modalAgergarItem.componentInstance.btnText = 'Agregar';
  }
  onEditProduct(id: number){
    if (!this.isEditing) return;
    const modalRef = this.modalService.open(ModalAgregarItemComponent, {windowClass:  "my-modal "});
    modalRef.componentInstance.name = 'Recibir/Actualizar';
    modalRef.componentInstance.btnText = 'Grabar';
    modalRef.componentInstance.item = this.orden.items[id-1];
  }


}
