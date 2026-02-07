import { useState } from "react";
import {
  ArrowRight,
  Check,
  User,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Calendar as CalendarIcon,
  CreditCard,
  Edit2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function Membership() {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    fechaNacimiento: "",
    localidad: "Mar del Plata",
    direccion: "",
    telefono: "",
    email: "",
    instagram: "",
    categoria: "",
    prenda: "",
    talle: "",
    foto: null as File | null,
  });

  const [step, setStep] = useState<
    "form" | "summary" | "processing" | "success"
  >("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files && e.target.files[0]) {
  //       setFormData((prev) => ({ ...prev, foto: e.target.files![0] }));
  //     }
  //   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular validación
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("summary");
    }, 1000);
  };

  const handlePayment = () => {
    setStep("processing");
    // Simular proceso de pago
    setTimeout(() => {
      setStep("success");
    }, 3000);
  };

  const benefits = [
    "Descuentos en inscripciones a torneos",
    "Remera oficial de regalo",
    "Acceso a los torneo provinciales",
    "Acceso exclusivo a merchandising",
    "Participación en eventos sociales",
    "Descuentos en comercios adheridos",
  ];

  return (
    <section
      id="membership"
      className="py-24 bg-slate-950 relative scroll-mt-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-lg bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Súmate a la <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Comunidad Oficial
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Ser socio es ser parte del crecimiento del pádel en Mar del Plata.
              Tu aporte nos ayuda a mejorar los torneos, apoyar a los jugadores
              y mantener viva la pasión.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 p-6 rounded-2xl bg-slate-900/50 border border-blue-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-indigo-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <p className="text-blue-400 font-medium text-sm mb-1.5 uppercase tracking-wider">
                  Valor Cuota Anual
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white tracking-tight">
                    $50.000
                  </span>
                  <span className="text-slate-500 text-sm font-medium">
                    / año
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Un único pago para acceder a todos los beneficios y ser parte
                  de la comunidad.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 backdrop-blur-sm">
              <h4 className="text-white font-semibold mb-2">
                ¿Dudas sobre la inscripción?
              </h4>
              <p className="text-slate-400 text-sm mb-4">
                Escribinos por WhatsApp y te ayudamos con el proceso de alta.
              </p>
              <Button
                variant="outline"
                className="w-full border-white/10 text-slate-800 hover:text-white hover:bg-white/5"
                onClick={() => (window.location.hash = "#contact")}
              >
                Contactarse
              </Button>
            </div>
          </div>

          <div className="w-full">
            <Card className="bg-slate-800 border-slate-700 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none" />

              {step === "form" ? (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">
                      Solicitud de Alta
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Completá tus datos para unirte a la comunidad y disfrutar
                      de los beneficios.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre" className="text-slate-300">
                              Nombre y Apellido
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                              <Input
                                id="nombre"
                                name="nombre"
                                placeholder="Juan Pérez"
                                required
                                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dni" className="text-slate-300">
                              DNI
                            </Label>
                            <Input
                              id="dni"
                              name="dni"
                              type="number"
                              placeholder="12345678"
                              required
                              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="fechaNacimiento"
                              className="text-slate-300"
                            >
                              Fecha de Nacimiento
                            </Label>
                            <div className="relative">
                              <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                              <Input
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                type="date"
                                required
                                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-600 focus-visible:ring-blue-500 block"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="categoria"
                              className="text-slate-300"
                            >
                              Categoría
                            </Label>
                            <Select
                              required
                              onValueChange={(val) =>
                                handleSelectChange("categoria", val)
                              }
                            >
                              <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-slate-300 focus:ring-blue-500">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="1ra">
                                  1ra Categoría
                                </SelectItem>
                                <SelectItem value="2da">
                                  2da Categoría
                                </SelectItem>
                                <SelectItem value="3ra">
                                  3ra Categoría
                                </SelectItem>
                                <SelectItem value="4ta">
                                  4ta Categoría
                                </SelectItem>
                                <SelectItem value="5ta">
                                  5ta Categoría
                                </SelectItem>
                                <SelectItem value="6ta">
                                  6ta Categoría
                                </SelectItem>
                                <SelectItem value="7ma">
                                  7ma Categoría
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="telefono"
                              className="text-slate-300"
                            >
                              Teléfono
                            </Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                              <Input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                placeholder="223 123 4567"
                                required
                                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="hola@ejemplo.com"
                                required
                                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="direccion"
                              className="text-slate-300"
                            >
                              Dirección
                            </Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                              <Input
                                id="direccion"
                                name="direccion"
                                placeholder="Calle 123"
                                required
                                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="localidad"
                              className="text-slate-300"
                            >
                              Localidad
                            </Label>
                            <Input
                              id="localidad"
                              name="localidad"
                              defaultValue="Mar del Plata"
                              required
                              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instagram" className="text-slate-300">
                            Instagram
                          </Label>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                              id="instagram"
                              name="instagram"
                              placeholder="@usuario"
                              className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-600 focus-visible:ring-blue-500"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="prenda" className="text-slate-300">
                              Prenda de Regalo
                            </Label>
                            <Select
                              required
                              onValueChange={(val) =>
                                handleSelectChange("prenda", val)
                              }
                            >
                              <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-slate-300 focus:ring-blue-500">
                                <SelectValue placeholder="Elegir Prenda" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="remera">Remera</SelectItem>
                                <SelectItem value="musculosa">
                                  Musculosa
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="talle" className="text-slate-300">
                              Talle
                            </Label>
                            <Select
                              required
                              onValueChange={(val) =>
                                handleSelectChange("talle", val)
                              }
                            >
                              <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-slate-300 focus:ring-blue-500">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="s">S</SelectItem>
                                <SelectItem value="m">M</SelectItem>
                                <SelectItem value="l">L</SelectItem>
                                <SelectItem value="xl">XL</SelectItem>
                                <SelectItem value="xxl">XXL</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* <div className="space-y-2">
                          <Label htmlFor="foto" className="text-slate-300">
                            Foto para Credencial
                          </Label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="foto"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-800 transition-colors"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-slate-400" />
                                <p className="mb-2 text-sm text-slate-400">
                                  <span className="font-semibold">
                                    Click para subir
                                  </span>{" "}
                                  o arrastrar foto
                                </p>
                                <p className="text-xs text-slate-500">
                                  SVG, PNG, JPG (MAX. 1GB?)
                                </p>
                              </div>
                              <input
                                id="foto"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                          {formData.foto && (
                            <p className="text-sm text-green-400 flex items-center gap-2">
                              <Check className="w-3 h-3" /> Archivo
                              seleccionado: {formData.foto.name}
                            </p>
                          )}
                        </div> */}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg font-semibold shadow-lg shadow-blue-600/25 group-hover:shadow-blue-600/40 transition-all cursor-pointer mt-6"
                      >
                        {isSubmitting ? "Validando..." : "Continuar"}
                        {!isSubmitting && (
                          <ArrowRight className="ml-2 h-5 w-5" />
                        )}
                      </Button>

                      <p className="text-xs text-slate-500 text-center">
                        Al enviar este formulario aceptas ser contactado para
                        finalizar tu inscripción.
                      </p>
                    </form>
                  </CardContent>
                </>
              ) : step === "summary" ? (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">
                      Resumen de Suscripción
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Revisá tus datos y procedé al pago para finalizar el alta.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-slate-400 text-sm">
                        <span>Nombre</span>
                        <span className="text-white font-medium">
                          {formData.nombre}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400 text-sm">
                        <span>DNI</span>
                        <span className="text-white font-medium">
                          {formData.dni}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400 text-sm">
                        <span>Categoría</span>
                        <span className="text-white font-medium">
                          {formData.categoria} Categoría
                        </span>
                      </div>
                      <div className="h-px bg-white/5 my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-white">
                          Total Anual
                        </span>
                        <span className="text-2xl font-bold text-blue-400">
                          $50.000
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handlePayment}
                        className="w-full h-14 bg-[#009EE3] hover:bg-[#0089C7] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#009EE3]/20"
                      >
                        <CreditCard className="w-5 h-5" />
                        Pagar con Mercado Pago
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setStep("form")}
                        className="w-full text-slate-400 hover:text-white hover:bg-white/5"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Editar datos
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : step === "processing" ? (
                <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[500px]">
                  <div className="relative mb-6">
                    <Loader2 className="w-16 h-16 text-[#009EE3] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#009EE3] rounded-full" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Procesando pago
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Te estamos redirigiendo a Mercado Pago...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[500px]">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    ¡Bienvenido Socio!
                  </h3>
                  <p className="text-slate-400 mb-8 max-w-xs">
                    El pago se realizó con éxito. Nos pondremos en contacto a la
                    brevedad.
                  </p>
                  <Button
                    onClick={() => {
                      setStep("form");
                      setFormData({
                        nombre: "",
                        dni: "",
                        fechaNacimiento: "",
                        localidad: "Mar del Plata",
                        direccion: "",
                        telefono: "",
                        email: "",
                        instagram: "",
                        categoria: "",
                        prenda: "",
                        talle: "",
                        foto: null,
                      });
                    }}
                    variant="outline"
                    className="mt-4 bg-transparent text-white"
                  >
                    Volver al inicio
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
