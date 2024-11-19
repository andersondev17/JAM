"use client";

import RegisterForm from "@/components/forms/RegisterForm";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentView, setCurrentView] = useState("welcome");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView("register");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case "welcome":
        return <WelcomeView />;
      case "register":
        return <RegisterForm onSubmit={handleRegisterSubmit} />;
      case "search":
        return <BarberSearch />;
      case "profile":
        return <UserProfile />;
      default:
        return <WelcomeView />;
    }
  };

  const handleRegisterSubmit = (values: any) => {
    console.log(values);
    // Aquí iría la lógica para procesar el registro
    // y navegar a la siguiente vista
    setCurrentView("search");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-dark-300 to-dark-400">
      <motion.section 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16"
      >
        <Image
          src="/assets/icons/logo.svg"
          width={100}
          height={40}
          alt="Barbería Inteligente"
          className="mb-12"
        />
        <div className="flex-grow flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
        <nav className="mt-8 flex justify-between items-center text-sm text-dark-600">
          <NavLink href="/" onClick={() => setCurrentView("register")}>Inicio</NavLink>
          <NavLink href="/search" onClick={() => setCurrentView("search")}>Buscar Barberos</NavLink>
          <NavLink href="/profile" onClick={() => setCurrentView("profile")}>Mi Perfil</NavLink>
        </nav>
      </motion.section>
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block w-1/2 relative overflow-hidden"
      >
        <Image
          src="/assets/images/barber-background.jpg"
          alt="Barbería"
          fill
          style={{ objectFit: 'cover' }}
          sizes="50vw"
          className="rounded-l-3xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-l-3xl">
          <div className="text-white text-center">
            <h2 className="text-5xl font-bold mb-4">Barbería Inteligente</h2>
            <p className="text-xl">Transformando la experiencia de belleza</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

const WelcomeView = () => (
  <div className="text-center">
    <h1 className="text-6xl font-bold text-white mb-6">Bienvenido</h1>
    <p className="text-xl text-gray-300">Prepárate para una experiencia de barbería única</p>
  </div>
);

const NavLink = ({ href, children, onClick }) => (
  <Link 
    href={href} 
    onClick={onClick} 
    className={cn(
      "hover:text-green-500 transition-colors duration-200",
      "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
      "after:bg-green-500 after:transform after:scale-x-0 after:transition-transform",
      "hover:after:scale-x-100"
    )}
  >
    {children}
  </Link>
);

// Placeholder components for other views
const BarberSearch = () => (
  <div className="text-white">
    <h2 className="text-3xl font-bold mb-4">Buscar Barberos</h2>
    <p>Función en desarrollo. Pronto podrás encontrar los mejores barberos cerca de ti.</p>
  </div>
);

const UserProfile = () => (
  <div className="text-white">
    <h2 className="text-3xl font-bold mb-4">Mi Perfil</h2>
    <p>Función en desarrollo. Aquí podrás gestionar tu información y preferencias.</p>
  </div>
);