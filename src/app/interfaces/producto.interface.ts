export interface ProductInput {
    codigoBarras: string;
    descripcion: string;
    categoria: string;
    cantidad: string;
    precio: string;
}

export interface AddProductoInput {
    addProducto: ResultBasicInput;
}

export interface ResultBasicInput {
    status: boolean;
    message: string;
}