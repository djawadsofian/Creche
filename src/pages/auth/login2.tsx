import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock, FaUsers, FaUtensils, FaChalkboardTeacher, FaUserShield, FaChevronRight } from "react-icons/fa";
import logo from "@/assets/istockphoto-1165158707-612x612-removebg-preview.png";
import { login } from "@/api/login";

const userRoles = [
  { id: "parent", label: "Parent", icon: <FaUsers className="mr-2" /> },
  { id: "educator", label: "Éducateur", icon: <FaChalkboardTeacher className="mr-2" /> },
  { id: "kitchen", label: "Personnel de cuisine", icon: <FaUtensils className="mr-2" /> },
  { id: "admin", label: "Administrateur", icon: <FaUserShield className="mr-2" /> }
];

interface LoginFormValues {
  email: string;
  password: string;
  role: string;
}

const Login2: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("parent");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) => login({ ...values }),
    onError: (error: any) => {
      setError(error === "No active account found with the given credentials" 
        ? "Identifiants invalides. Veuillez réessayer." 
        : error?.toString() || "Une erreur est survenue");
    },
    onSuccess: (data: any) => {
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("role", selectedRole);
      navigate("/");
    },
  });

  const initialValues = {
    email: "",
    password: "",
    role: "parent"
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Mot de passe requis"),
  });

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setSubmitting(true);
      await loginMutation.mutateAsync(values);
    } catch (error) {
      console.error("Erreur de connexion:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Panel - Branding */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center">
            <img src={logo} alt="Crèche Logo" className="w-16 h-16 mr-4" />
            <h1 className="text-2xl font-bold">Little Stars Crèche</h1>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bienvenue sur CrècheConnect
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-lg">
            Une plateforme complète pour faciliter la gestion de votre crèche et 
            améliorer la communication entre le personnel et les parents.
          </p>

          <div className="hidden md:block space-y-4">
            {userRoles.map((role) => (
              <div key={role.id} className="flex items-center p-4 rounded-lg bg-white/10 hover:bg-white/15 transition-colors">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  {React.cloneElement(role.icon, { className: "text-xl" })}
                </div>
                <div>
                  <h3 className="font-medium">{role.label}</h3>
                  <p className="text-sm opacity-80">
                    {role.id === "parent" && "Suivi du développement de votre enfant"}
                    {role.id === "educator" && "Gestion des activités et présences"}
                    {role.id === "kitchen" && "Planification des repas quotidiens"}
                    {role.id === "admin" && "Administration complète du système"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
            <p className="text-gray-600 mt-2">
              Veuillez vous connecter pour accéder à votre espace
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Je me connecte en tant que :
            </label>
            <div className="grid grid-cols-2 gap-3">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    selectedRole === role.id
                      ? "bg-[#00b4d8] text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {role.icon}
                  <span className="ml-1">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    username
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8]"
                      placeholder="username"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8]"
                      placeholder="••••••••"
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                      className="h-4 w-4 text-[#00b4d8] focus:ring-[#00b4d8] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-[#00b4d8] hover:text-[#0096c7]"
                  >
                    Mot de passe oublié?
                  </button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 mt-4 bg-[#00b4d8] hover:bg-[#0096c7] text-white font-medium rounded-lg shadow transition-colors flex items-center justify-center ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connexion...
                    </>
                  ) : (
                    <>
                      Se connecter
                      <FaChevronRight className="ml-2" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Pas encore de compte?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="font-medium text-[#00b4d8] hover:text-[#0096c7]"
              >
                Créer un compte
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;