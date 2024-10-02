export default function Page() {
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <div className="px-4">
          <h1 className="text-xl font-bold">Regístra tu empresa.</h1>
          <p className="text-gray-500 mt-4">
            Regístra tu empresa y comienza a vender tus productos en nuestra
            plataforma. ¿Cómo funciona? Regístra tu empresa, sube tus productos
            y comienza a vender. Recibe un 90% de comisión por cada venta que
            realices.
          </p>
          <div className="flex justify-center mt-8">
            <form>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="phone"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo
                    -500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
