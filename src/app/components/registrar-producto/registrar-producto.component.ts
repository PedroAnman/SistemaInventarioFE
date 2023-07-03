import { Component } from '@angular/core';
import { ProductInput, AddProductoInput } from '../../interfaces/producto.interface';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular'
import { Router } from '@angular/router';

const ADD_PRODUCTO = gql`
  mutation addProducto($product: ProductInput!) {
    addProducto(product: $product) {
      status
      message
    }
  }
`;

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})

export class RegistrarProductoComponent {
  err: Boolean = false;
  mensaje: String = '';
  producto: ProductInput = {
    codigoBarras: '',
    descripcion: '',
    categoria: '',
    cantidad: '',
    precio: '',
  };
  
  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void { }

  addProducto() {
    this.apollo
      .mutate({
        mutation: ADD_PRODUCTO,
        variables: {
          product: this.producto,
        },
      })
      .subscribe(
        ({ data }) => {
          if(data){
            const result: AddProductoInput = Object(data);
            this.mensaje = result?.addProducto.message;
            if(result?.addProducto.status){
              this.err = true;
              this.router.navigate(['/productos']).then(() => {
                window.location.reload();
              });
            }
          }
          this.err = true;
        },
        error => {
          console.log('Error GraphQL: ', error);
        },
      );
  }
}
