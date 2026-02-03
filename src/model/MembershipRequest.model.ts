export interface MembershipRequest {
  id: string;
  nombre: string;
  dni: string;
  fechaNacimiento: string;
  localidad: string;
  direccion: string;
  telefono: string;
  email: string;
  instagram: string;
  categoria: string;
  prenda: string;
  talle: string;
  fechaSolicitud: string;
  estado: "pendiente" | "aprobado" | "rechazado";
  fotoUrl?: string; // Mocked
}
