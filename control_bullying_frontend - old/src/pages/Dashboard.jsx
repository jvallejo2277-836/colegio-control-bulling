import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="content-area">
          <h2>Bienvenido al Panel Principal</h2>
          <p>Selecciona una opción del menú para continuar.</p>
        </div>

      </div>
    </div>
  );
}
