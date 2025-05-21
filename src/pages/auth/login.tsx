import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
import { login } from "../../api/login";
// import { loginSuccess } from "@/redux/reducers/AuthReducer";
import { FaEnvelope, FaLock, FaUsers, FaUtensils, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";

// Define user roles
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

const Login: React.FC = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("parent");

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) => {
      return login({ ...values, role: selectedRole });
    },
    onError: (error: any) => {
      if (error === "No active account found with the given credentials") {
        setError("Identifiants invalides. Veuillez réessayer.");
      } else {
        setError(error?.toString() || "Une erreur est survenue");
      }
    },
    onSuccess: (data: any) => {
    //   dispatch(loginSuccess({ token: data.access, role: selectedRole }));
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_role", selectedRole);
      navigate("/dashboard");
    },
  });

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    role: "parent"
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email invalide").required("Email requis"),
    password: Yup.string().required("Mot de passe requis"),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
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
    <div className="flex flex-row w-full h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="relative w-1/2 bg-blue-600 flex flex-col items-start justify-center pl-16 text-white font-poppins">
        <div className="absolute top-6 left-6 flex items-center">
          <img
            src="/api/placeholder/50/50"
            alt="Crèche Logo"
            className="w-12 h-12 mr-2"
          />
          <h2 className="text-2xl font-bold">CrècheConnect</h2>
        </div>

        <h1 className="text-4xl font-bold mb-4">
          Bienvenue sur CrècheConnect
        </h1>
        
        <p className="text-xl mb-8 pr-16 opacity-90">
          Une plateforme complète pour faciliter la gestion de votre crèche et améliorer 
          la communication entre le personnel et les parents.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <FaUserShield className="mr-3 text-xl" />
            <p className="text-lg">Pour les administrateurs: Gestion complète du système</p>
          </div>
          <div className="flex items-center">
            <FaChalkboardTeacher className="mr-3 text-xl" />
            <p className="text-lg">Pour les éducateurs: Suivi des activités et présences</p>
          </div>
          <div className="flex items-center">
            <FaUtensils className="mr-3 text-xl" />
            <p className="text-lg">Pour le personnel de cuisine: Planification des repas</p>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-3 text-xl" />
            <p className="text-lg">Pour les parents: Suivi du développement de votre enfant</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-4/5 max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Connexion
          </h2>
          <p className="text-gray-600 mb-6">
            Veuillez vous connecter pour accéder à votre espace personnel
          </p>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Je me connecte en tant que :</p>
            <div className="grid grid-cols-2 gap-2">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    selectedRole === role.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {role.icon} {role.label}
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
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Adresse email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="password"
                      className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mot de passe"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>
                  <div>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Mot de passe oublié?
                    </a>
                  </div>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  {isSubmitting ? "Connexion en cours..." : "Se connecter"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Vous n'avez pas encore de compte?{" "}
              <button 
                onClick={() => navigate("/register")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                S'inscrire
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Pour toute assistance, contactez l'administrateur de votre crèche.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;