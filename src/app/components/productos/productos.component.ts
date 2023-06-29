import { Component, OnInit } from '@angular/core';
import { ProductInput } from '../../interfaces/producto.interface';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {

  txtBuscador: String = '';
  loading: boolean | undefined;
  result: any;
  productos: ProductInput[] | undefined;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    let GET_PRODUCTS = gql`
      query products {
        products {
          info {
            page
            total
            itemsPage
            pages
          }
          status
          message
          products {
            codigoBarras
            descripcion
            categoria
            cantidad
            precio
          }
        }
      }
    `;

    this.apollo
      .watchQuery<any>({
        query: GET_PRODUCTS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.result = data.products;
        this.productos = data.products.products;
      });
  }

  buscador(){

    let GET_PRODUCTS = gql`
      query searchproducts($text: String!){
        searchproducts (text: $text){
          info {
            page
            total
            itemsPage
            pages
          }
          status
          message
          products {
            codigoBarras
            descripcion
            categoria
            cantidad
            precio
          }
        }
      }
    `;

    this.apollo
      .watchQuery<any>({
        query: GET_PRODUCTS,
        variables: {
          text: this.txtBuscador
        },
      })
      .valueChanges.subscribe(({ data }) => {
        this.txtBuscador = '';
        this.result = data.searchproducts;
        this.productos = this.result.products;
      });
  }

}
