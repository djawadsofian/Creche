import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock, FaUser, FaUsers, FaUtensils, FaChalkboardTeacher, FaUserShield, FaIdCard, FaChevronRight } from "react-icons/fa";
import logo from "@/assets/istockphoto-1165158707-612x612-removebg-preview.png";
import { signup } from "@/api/login";

const userRoles = [
  { id: "parent", label: "Parent", icon: <FaUsers className="mr-2" />, description: "Accédez aux informations de votre enfant" },
  { id: "educator", label: "Éducateur", icon: <FaChalkboardTeacher className="mr-2" />, description: "Gérez les activités et présences" },
  { id: "kitchen", label: "Personnel de cuisine", icon: <FaUtensils className="mr-2" />, description: "Planifiez les repas" },
  { id: "admin", label: "Administrateur", icon: <FaUserShield className="mr-2" />, description: "Gérez l'ensemble du système" }
];

interface SignupFormValues {
  name: string;
  userName: string;
  email: string;
  password: string;
  re_password: string;
  role: string;
}

interface SignupFormValuesPost {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}

const SignUp2 = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("parent");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nonFieldError, setNonFieldError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (values: SignupFormValuesPost) => signup({ ...values, role: selectedRole }),
    onError: (error: any) => {
      setEmailError("");
      setPasswordError("");
      setNonFieldError("");

      if (error?.response?.data) {
        const errorData = error.response.data;

        if (errorData?.password) {
          setPasswordError(errorData.password.join(" "));
        }

        if (errorData?.email) {
          setEmailError(errorData.email.map((msg: string) => 
            msg === "User Account with this Email Address already exists." 
              ? "Un compte avec cette adresse email existe déjà." 
              : msg
          ).join(" "));
        }

        if (errorData?.non_field_errors || errorData?.detail) {
          setNonFieldError(errorData.non_field_errors?.join(" ") || errorData.detail);
        }
      } else {
        setNonFieldError(error?.toString() || "Une erreur est survenue");
      }
    },
    onSuccess: (data) => {
      localStorage.setItem(data?.role.toLowerCase(), JSON.stringify(data));
      if (data?.token) localStorage.setItem('access_token', data.token);
      navigate('/signin');
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Le nom est requis"),
    userName: Yup.string().required("Le nom d'utilisateur est requis"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'email est requis"),
    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
      .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .required("Le mot de passe est requis"),
    re_password: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
      .required("La confirmation du mot de passe est requise"),
  });

  const initialValues: SignupFormValues = {
    name: "",
    userName: "",
    email: "",
    password: "",
    re_password: "",
    role: "parent"
  };

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
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
            Rejoignez notre communauté
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-lg">
            Créez votre compte pour accéder à tous nos services et participer à notre communauté éducative.
          </p>

          <div className="hidden md:block space-y-4">
            {userRoles.map((role) => (
              <div 
                key={role.id}
                className={`p-4 rounded-lg transition-all cursor-pointer ${
                  selectedRole === role.id 
                    ? "bg-[#00b4d8] text-white shadow-lg" 
                    : "bg-white/10 hover:bg-white/15 text-white"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center">
                  <div className="text-xl mr-4">
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{role.label}</h3>
                    <p className="text-sm opacity-80">{role.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Créer un compte</h2>
            <p className="text-gray-600 mt-2">
              {selectedRole === "parent" ? "En tant que parent" : 
              selectedRole === "educator" ? "En tant qu'éducateur" : 
              selectedRole === "kitchen" ? "En tant que personnel de cuisine" : 
              "En tant qu'administrateur"}
            </p>
          </div>

          {/* Mobile Role Selector */}
          <div className="md:hidden mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Je m'inscris en tant que :
            </label>
            <div className="grid grid-cols-2 gap-3">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8]"
                        placeholder="Votre nom"
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom d'utilisateur
                    </label>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Field
                        type="text"
                        name="userName"
                        id="userName"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8]"
                        placeholder="Nom d'utilisateur"
                      />
                    </div>
                    <ErrorMessage name="userName" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        emailError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8]`}
                      placeholder="email@example.com"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                  {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
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
                      className={`w-full pl-10 pr-3 py-2 border ${
                        passwordError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8]`}
                      placeholder="••••••••"
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                  {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
                </div>

                <div>
                  <label htmlFor="re_password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Field
                      type="password"
                      name="re_password"
                      id="re_password"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b4d8] focus:border-[#00b4d8]"
                      placeholder="••••••••"
                    />
                  </div>
                  <ErrorMessage name="re_password" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                {selectedRole === "parent" && (
                  <div className="p-4 bg-[#00b4d8]/10 rounded-lg border border-[#00b4d8]/20">
                    <p className="text-sm text-[#1a1a2e]">
                      Vous pourrez ajouter les informations de votre enfant après la création de votre compte.
                    </p>
                  </div>
                )}

                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      name="terms"
                      id="terms"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-[#00b4d8]"
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    J'accepte les <a href="#" className="text-[#00b4d8] hover:underline font-medium">Conditions</a> et la <a href="#" className="text-[#00b4d8] hover:underline font-medium">Politique de confidentialité</a>
                  </label>
                </div>

                {nonFieldError && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                    {nonFieldError}
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
                      Inscription...
                    </>
                  ) : (
                    <>
                      S'inscrire
                      <FaChevronRight className="ml-2" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Vous avez déjà un compte?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="font-medium text-[#00b4d8] hover:text-[#0096c7]"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;