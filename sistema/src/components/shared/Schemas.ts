import * as Yup from 'yup'

export const SchemaBrief = Yup.object().shape({
  nombres: Yup.string().required('Este campo es requerido').min(1),
  email: Yup.string()
    .email('Email invalido')
    .required('Este campo es requerido'),
  celular: Yup.string()
    .required('Este campo es requerido')
    .min(9, 'El numero debe tener 9 digitos')
    .max(9, 'El numero debe tener 9 digitos')
})
// CATEGORIAS
export const SchemaCategorias = Yup.object().shape({
  nombre: Yup.string().required('Este campo es requerido').min(1)
})

export const SchemaNosotros = Yup.object().shape({
  titulo1: Yup.string().required('Este campo es requerido').min(1),
  titulo2: Yup.string().required('Este campo es requerido').min(1),
  titulo3: Yup.string().required('Este campo es requerido').min(1),
  certificadoActivo: Yup.string().required('El campo es requerido')
})

export const SchemaProyectos = Yup.object().shape({
  nombre: Yup.string().required('Este campo es requerido').min(1)
})

export const SchemaServicios = Yup.object().shape({
  titulo: Yup.string()
    .required('El titulo es requerido')
    .min(1, 'El titulo debe tener al menos 1 carácter')
})

export const SchemaCoberturas = Yup.object().shape({
  id_departamento: Yup.string().required('El campo es requerido'),
  id_provincia: Yup.string().required('El campo es requerido'),
  id_distrito: Yup.string().required('El campo es requerido')
})

// SUBCATEGORIAS
export const SchemaSubcategorias = Yup.object().shape({
  nombre: Yup.string().required('Este campo es requerido').min(1),
  idCategoria: Yup.number().required('El campo es requerido')
})

export const SchemaMostrar = Yup.object().shape({
  enlace: Yup.string().required('Este campo es requerido').min(1)
})

export const SchemaMarcas = Yup.object().shape({
  nombre: Yup.string().required('Este campo es requerido').min(1)
})

// SHOWCATEGORIAS
export const SchemaShowcategory = Yup.object().shape({
  id_producto: Yup.number().required('El campo es requerido')
})

// DISTRITOS
export const SchemaDistrito = Yup.object().shape({
  nombre: Yup.string().required('Este campo es requerido').min(1),
  id_provincia: Yup.string().required('Este campo es requerido').min(1)
})

// PRODUCTOS
export const ScheamaProductos = Yup.object().shape({
  nombre: Yup.string().required('El campo es requerido'),
  idCategoria: Yup.number().required('El campo es requerido'),
  idSubcategoria: Yup.number().nullable(),
  id_marca: Yup.number().required('El campo es requerido'),
  precio1: Yup.number().required('El campo es requerido'),
  precio2: Yup.number()
    .required('El campo es requerido')
    .positive('El valor no puede ser negativo'),
  favoritos: Yup.string().required('El campo es requerido')
})

export const SchemaNoticias = Yup.object().shape({
  nombre: Yup.object().shape({
    es: Yup.string()
      .required('El nombre en español es requerido')
      .min(1, 'El nombre en español debe tener al menos 1 carácter'),
    en: Yup.string()
      .required('El nombre en inglés es requerido')
      .min(1, 'El nombre en inglés debe tener al menos 1 carácter')
  }),
  descripcion: Yup.object().shape({
    es: Yup.string()
      .required('La descripción en español es requerido')
      .min(1, 'La descripción en español debe tener al menos 1 carácter')
      .max(450, 'La descripción en español debe tener menos de 450 caracteres'),
    en: Yup.string()
      .required('La descripción en inglés es requerido')
      .min(1, 'La descripción en inglés debe tener al menos 1 carácter')
      .max(450, 'La descripción en inglés debe tener menos de 450 caracteres')
  }),
  id_categoria: Yup.number().required('El campo es requerido')
})

// BLOG
export const SchemaBlog = Yup.object().shape({
  titulo: Yup.string().required('El campo es requerido'),
  resumen: Yup.string()
    .required('El campo es requerido')
    .max(150, 'Máximo de caracteres alcanzados')
})

// PRIMERASECCION
export const ScheamaPrimeraSeccion = Yup.object().shape({
  nombre: Yup.string().required('El campo es requerido'),
  descripcion: Yup.string().required('El campo es requerido')
})

// SEGUNDA SECCION
export const ScheamaSegundaSeccion = Yup.object().shape({
  titulo: Yup.string().required('El campo es requerido'),
  descripcion: Yup.string().required('El campo es requerido')
})

// VALORES
export const ScheamaValores = Yup.object().shape({
  titulo: Yup.string().required('El campo es requerido')
})

// VALORES
export const SchemaValores = Yup.object().shape({
  mapa: Yup.string().required('El campo es requerido'),
  mapa2: Yup.string().required('El campo es requerido')
})

// CONFIGURACION
export const SchemaConfiguracion = Yup.object().shape({
  direccion1: Yup.string().required('El campo es requerido'),
  direccion2: Yup.string().required('El campo es requerido'),
  direccion3: Yup.string().required('El campo es requerido'),
  horario: Yup.string().required('El campo es requerido'),
  facebook: Yup.string().nullable(),
  instagram: Yup.string().nullable(),
  twiter: Yup.string().nullable(),
  linkedin: Yup.string().nullable(),
  youtube: Yup.string().nullable(),
  whatsapp: Yup.string().nullable()
})

// VALORES
export const ScheamaBanner = Yup.object().shape({
  titulo1: Yup.string().required('El campo es requerido'),
  titulo2: Yup.string().required('El campo es requerido')
})

// TRANSACCIONES
export const SchemaTransacciones = Yup.object().shape({
  id_transaccion: Yup.number().required('El campo es requerido'),
  nombres: Yup.string().required('El campo es requerido'),
  apellidos: Yup.string().required('El campo es requerido'),
  status: Yup.string().required('El campo es requerido'),
  tipo: Yup.string().required('El campo es requerido'),
  order_id: Yup.string().required('El campo es requerido'),
  email: Yup.string().required('El campo es requerido'),
  celular: Yup.string().required('El campo es requerido'),
  comentario: Yup.string().nullable(),
  delivery: Yup.string().required('El campo es requerido'),
  total_pago: Yup.string().required('El campo es requerido'),
  array_productos: Yup.string().required('El campo es requerido'),
  estado: Yup.number().required('El campo es requerido')
})
