import { Link } from "react-router-dom";

function NotFoundPage() {
    return(
         <main className="flex min-h-screen flex-col items-center justify-center bg-rose-50 px-6 text-center">
      <h1 className="text-5xl font-bold text-rose-900">
        404
      </h1>

      <p className="mt-4 text-rose-500">
        La página que buscas no existe.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-full bg-red px-6 py-3 font-semibold text-white"
      >
        Volver al catálogo
      </Link>
    </main>
    );
}

export default NotFoundPage;