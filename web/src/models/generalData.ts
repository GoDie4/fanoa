// 🧱 Banner principal o secundario
export interface Banner {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  enlace: string;
  textoBoton: string;
  createdAt: string;
  updatedAt: string;
}

// 🧩 Servicios adicionales dentro de una categoría
export interface ServicioAdicional {
  id: string;
  titulo: string;
  imagen: string;
  categoriaId: string;
  createdAt: string;
  updatedAt: string;
}

// 🛠️ Trabajos (proceso de trabajo)
export interface Trabajo {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoriaId: string;
  createdAt: string;
  updatedAt: string;
}

// 🚧 Proyectos (no tienen descripción en el endpoint actual)
export interface Proyecto {
  id: string;
  titulo: string;
  imagen: string;
  categoriaId: string;
  createdAt: string;
  updatedAt: string;
}

// 🗂️ Categorías de servicios
export interface Categoria {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  miniTitulo: string;
  miniDescripcion: string;
  serviciosAdicionales: ServicioAdicional[];
  trabajos: Trabajo[];
  proyectos: Proyecto[];
  createdAt: string;
  updatedAt: string;
}

// 📞 Información de contacto
export interface Contacto {
  id: string;
  titulo: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

// 👤 Usuario sin contraseña
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  createdAt: string;
}

// 📦 Datos generales que devuelve /api/v1/general
export interface GeneralData {
  banners: Banner[];
  bannersSecundarios: Banner[];
  servicioEditables: any[];
  categorias: Categoria[];
  proyectos: Proyecto[];
  trabajos: Trabajo[];
  ferias: any[];
  contacto: Contacto[];
  usuarios: Usuario[];
}

// 🌍 Respuesta completa del endpoint
export interface ConfigResponse {
  data: GeneralData;
}
