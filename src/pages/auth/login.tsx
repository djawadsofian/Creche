import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
import { login } from "../../api/login";
// import { loginSuccess } from "@/redux/reducers/AuthReducer";
import { FaEnvelope, FaLock, FaUsers, FaUtensils, FaChalkboardTeacher, FaUserShield, FaChevronRight } from "react-icons/fa";
import logo from "@/assets/istockphoto-1165158707-612x612-removebg-preview.png"

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
      return login({ ...values });
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
      // localStorage.setItem("refresh_token", data.refresh);
      // localStorage.setItem("user_role", selectedRole);
      navigate("/");
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
    <div className="h-screen flex flex-row w-full overflow-hidden ">
      {/* Left Panel with enhanced design */}
      <div className="relative w-1/2 bg-gradient-to-br from-[#FCF259] to-[#c9c046]  flex flex-col items-start justify-center pl-16 text-white font-poppins overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 bg-blue-600 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PGNpcmNsZSBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMDUiIGN4PSIzMiIgY3k9IjM0IiByPSIxIi8+PC9nPjwvc3ZnPg==')] bg-repeat" />
        </div>

        <div className="absolute top-6 left-6 flex items-center z-10">
          
            <img
              src={logo}
              alt="Crèche Logo"
              className="w-20 h-20"
            />
          
          <h2 className="text-2xl font-bold">BDS Creche</h2>
        </div>

        <div className="relative z-10 pr-8">
          <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-sm">
            Bienvenue sur CrècheConnect
          </h1>
          
          <p className="text-xl mb-10 pr-12 text-white opacity-90">
            Une plateforme complète pour faciliter la gestion de votre crèche et améliorer 
            la communication entre le personnel et les parents.
          </p>

          {/* <div className="space-y-6 mb-8">
            {[
              { icon: <FaUserShield />, text: "Pour les administrateurs: Gestion complète du système" },
              { icon: <FaChalkboardTeacher />, text: "Pour les éducateurs: Suivi des activités et présences" },
              { icon: <FaUtensils />, text: "Pour le personnel de cuisine: Planification des repas" },
              { icon: <FaUsers />, text: "Pour les parents: Suivi du développement de votre enfant" }
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-white bg-opacity-10 p-4 rounded-xl hover:bg-opacity-15 transition-all duration-300">
                <div className="mr-4 bg-white bg-opacity-20 p-3 rounded-lg text-xl">
                  {item.icon}
                </div>
                <p className="text-lg">{item.text}</p>
              </div>
            ))}
          </div> */}
        </div>

        
      </div>

      {/* Right Panel - Enhanced Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full h-full px-10 pt-12 bg-white shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Connexion
            </h2>
            <p className="text-gray-600">
              Veuillez vous connecter pour accéder à votre espace personnel
            </p>
          </div>

          {/* Role Selection - Enhanced */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Je me connecte en tant que :</p>
            <div className="grid grid-cols-2 gap-3">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedRole === role.id
                      ? "bg-[#e8db29] text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
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
              <Form className="space-y-5">
                <div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      className="w-full pl-11 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e8db29] focus:border-[#e8db29] text-gray-700"
                      placeholder="Adresse email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1 ml-1"
                  />
                </div>

                <div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="password"
                      className="w-full pl-11 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e8db29] focus:border-[#e8db29] text-gray-700"
                      placeholder="Mot de passe"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1 ml-1"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-5 w-5 text-[#e8db29] focus:ring-[#e8db29] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>
                  <div>
                    <a href="#" className="text-sm font-medium text-[#e8db29] hover:text-[#e8db29] transition-colors">
                      Mot de passe oublié?
                    </a>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg mt-4">
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 mt-4 bg-gradient-to-r from-[#e8db29] to-[#e8db29] hover:from-[#e8db29] hover:to-[#e8db29] text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connexion en cours...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Se connecter 
                      <FaChevronRight className="ml-2" />
                    </span>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Vous n'avez pas encore de compte?{" "}
              <button 
                onClick={() => navigate("/signUp")}
                className="font-medium text-[#e8db29] hover:text-[#e8db29] transition-colors"
              >
                S'inscrire
              </button>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Login;